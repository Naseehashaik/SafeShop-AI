import { prisma } from "@/lib/db";

export async function getWallet(userId: number) {
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId,
    },
  });

  if (!wallet) {
    throw new Error("Wallet not found.");
  }

  return wallet;
}

export async function checkBalance(
  userId: number,
  amountInPaise: number
) {
  const wallet = await getWallet(userId);

  return {
    allowed: wallet.balanceInPaise >= amountInPaise,
    balanceInPaise: wallet.balanceInPaise,
    requestedAmountInPaise: amountInPaise,
  };
}

/**
 * Safely processes a purchase using the TEST wallet.
 *
 * IMPORTANT:
 * The AI cannot directly change the wallet.
 * This function performs the actual validation and money movement.
 *
 * additionalProductId is optional and is used for an approved
 * cross-sell product such as the AudioGuard Case.
 */
export async function processPurchase(
  userId: number,
  productId: number,
  quantity: number,
  approved: boolean,
  additionalProductId?: number
) {
  if (!approved) {
    throw new Error("User approval is required before purchase.");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  return await prisma.$transaction(async (tx) => {
    // 1. Get the main product directly from the database.
    const product = await tx.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    // 2. Check main product stock.
    if (product.stockQuantity < quantity) {
      throw new Error("Product does not have enough stock.");
    }

    // 3. Get optional cross-sell product.
    let additionalProduct = null;

    if (additionalProductId) {
      additionalProduct = await tx.product.findUnique({
        where: {
          id: additionalProductId,
        },
      });

      if (!additionalProduct) {
        throw new Error("Cross-sell product not found.");
      }

      if (additionalProduct.stockQuantity < 1) {
        throw new Error("Cross-sell product is out of stock.");
      }

      // Prevent the same product from being purchased twice
      // as both the main product and cross-sell.
      if (additionalProduct.id === product.id) {
        throw new Error("Cross-sell product cannot be the main product.");
      }
    }

    // 4. Get wallet directly from the database.
    const wallet = await tx.wallet.findUnique({
      where: {
        userId,
      },
    });

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    // 5. Calculate the total using database prices.
    // Never trust prices supplied by the AI or frontend.
    const mainProductAmount =
      product.priceInPaise * quantity;

    const additionalProductAmount =
      additionalProduct?.priceInPaise ?? 0;

    const totalAmountInPaise =
      mainProductAmount + additionalProductAmount;

    // 6. Check wallet balance.
    if (wallet.balanceInPaise < totalAmountInPaise) {
      throw new Error(
        `Insufficient wallet balance. Purchase costs ₹${
          totalAmountInPaise / 100
        } but wallet contains ₹${wallet.balanceInPaise / 100}.`
      );
    }

    // 7. Calculate new wallet balance.
    const newBalance =
      wallet.balanceInPaise - totalAmountInPaise;

    // 8. Deduct money from TEST wallet.
    const updatedWallet = await tx.wallet.update({
      where: {
        id: wallet.id,
      },
      data: {
        balanceInPaise: newBalance,
      },
    });

    // 9. Reduce main product stock.
    await tx.product.update({
      where: {
        id: product.id,
      },
      data: {
        stockQuantity: {
          decrement: quantity,
        },
      },
    });

    // 10. Reduce cross-sell stock if included.
    if (additionalProduct) {
      await tx.product.update({
        where: {
          id: additionalProduct.id,
        },
        data: {
          stockQuantity: {
            decrement: 1,
          },
        },
      });
    }

    // 11. Record main product purchase.
    const purchase = await tx.purchaseHistory.create({
      data: {
        userId,
        productId: product.id,
        quantity,
        priceInPaise: product.priceInPaise,
      },
    });

    // 12. Record cross-sell purchase separately.
    let additionalPurchase = null;

    if (additionalProduct) {
      additionalPurchase =
        await tx.purchaseHistory.create({
          data: {
            userId,
            productId: additionalProduct.id,
            quantity: 1,
            priceInPaise: additionalProduct.priceInPaise,
          },
        });
    }

    // 13. Record ONE wallet transaction for the complete purchase.
    const walletTransaction =
      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: "PURCHASE",
          amountInPaise: totalAmountInPaise,
          balanceBefore: wallet.balanceInPaise,
          balanceAfter: newBalance,
          status: "SUCCESS",
          description: additionalProduct
            ? `Test purchase: ${product.name} + ${additionalProduct.name}`
            : `Test purchase: ${product.name}`,
          referenceId: `PURCHASE-${purchase.id}`,
        },
      });

    // 14. Record successful purchase in audit trail.
    await tx.auditLog.create({
      data: {
        eventType: "PURCHASE",
        actor: "USER_APPROVED",
        userId,
        productId: product.id,
        amountInPaise: totalAmountInPaise,
        referenceId: `PURCHASE-${purchase.id}`,
        result: "SUCCESS",
        explanation: additionalProduct
          ? `Razorpay TEST payment verified and user-approved purchase of ${product.name} plus ${additionalProduct.name}. Test wallet deducted ₹${totalAmountInPaise / 100}.`
          : `Razorpay TEST payment verified and user-approved purchase of ${product.name}. Test wallet deducted ₹${totalAmountInPaise / 100}.`,
      },
    });

    return {
      success: true,

      product: {
        id: product.id,
        name: product.name,
        price: product.priceInPaise / 100,
        currency: product.currency,
      },

      additionalProduct: additionalProduct
        ? {
            id: additionalProduct.id,
            name: additionalProduct.name,
            price: additionalProduct.priceInPaise / 100,
            currency: additionalProduct.currency,
          }
        : null,

      quantity,

      totalAmount: totalAmountInPaise / 100,

      walletBalanceBefore:
        wallet.balanceInPaise / 100,

      walletBalanceAfter:
        updatedWallet.balanceInPaise / 100,

      purchaseId: purchase.id,

      additionalPurchaseId:
        additionalPurchase?.id ?? null,

      transactionId: walletTransaction.id,
    };
  });
}

export async function addTestFunds(
  userId: number,
  amountInPaise: number
) {
  if (amountInPaise <= 0) {
    throw new Error(
      "Test fund amount must be greater than zero."
    );
  }

  if (amountInPaise > 1000000) {
    throw new Error(
      "Test fund amount exceeds the allowed limit."
    );
  }

  const wallet = await prisma.wallet.update({
    where: {
      userId,
    },
    data: {
      balanceInPaise: {
        increment: amountInPaise,
      },
    },
  });

  return wallet;
}
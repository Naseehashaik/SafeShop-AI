import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createRazorpayOrder } from "@/lib/razorpay";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userId = Number(body.userId || 1);
    const productId = Number(body.productId);
    const quantity = Number(body.quantity || 1);
    const includeCase = body.includeCase === true;
    const caseProductId = Number(body.caseProductId || 0);

    if (!productId || productId <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid product ID is required.",
        },
        { status: 400 }
      );
    }

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid quantity is required.",
        },
        { status: 400 }
      );
    }

    // Get the real product from the database.
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found.",
        },
        { status: 404 }
      );
    }
    if (includeCase) {
        if (!caseProductId || caseProductId <= 0) {
          return NextResponse.json(
            {
              success: false,
              error: "A valid case product ID is required.",
            },
            { status: 400 }
          );
        }
      
        const caseProduct = await prisma.product.findUnique({
          where: {
            id: caseProductId,
          },
        });
      
        if (!caseProduct) {
          return NextResponse.json(
            {
              success: false,
              error: "Selected case product not found.",
            },
            { status: 404 }
          );
        }
      
        if (caseProduct.stockQuantity < 1) {
          return NextResponse.json(
            {
              success: false,
              error: "Selected case is out of stock.",
            },
            { status: 400 }
          );
        }
      }

    // Check stock before creating the payment order.
    if (product.stockQuantity < quantity) {
      return NextResponse.json(
        {
          success: false,
          error: "Not enough product stock available.",
        },
        { status: 400 }
      );
    }

    // Get the SafeShop TEST Wallet.
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId,
      },
    });

    if (!wallet) {
      return NextResponse.json(
        {
          success: false,
          error: "SafeShop AI Wallet not found.",
        },
        { status: 404 }
      );
    }

    // IMPORTANT:
    // The server calculates the amount from the database.
    // The frontend/AI cannot decide the payment amount.
    let caseProduct = null;

let totalAmountInPaise =
  product.priceInPaise * quantity;

if (includeCase) {
  caseProduct = await prisma.product.findUnique({
    where: {
      id: caseProductId,
    },
  });

  if (!caseProduct) {
    return NextResponse.json(
      {
        success: false,
        error: "Selected case product not found.",
      },
      { status: 404 }
    );
  }

  if (caseProduct.stockQuantity < 1) {
    return NextResponse.json(
      {
        success: false,
        error: "Selected case is out of stock.",
      },
      { status: 400 }
    );
  }

  totalAmountInPaise += caseProduct.priceInPaise;
}

    // Check the TEST wallet before creating payment.
    if (wallet.balanceInPaise < totalAmountInPaise) {
        const explanation = `Purchase blocked. Product costs ₹${
          totalAmountInPaise / 100
        } but your SafeShop AI Wallet contains ₹${
          wallet.balanceInPaise / 100
        }.`;
      
        await createAuditLog({
          eventType: "WALLET_CHECK",
          actor: "WALLET_ENGINE",
          userId,
          productId: product.id,
          amountInPaise: totalAmountInPaise,
          referenceId: `BLOCKED-${Date.now()}`,
          result: "BLOCKED",
          explanation,
        });
      
        return NextResponse.json(
          {
            success: false,
            error: explanation,
          },
          { status: 400 }
        );
      }

    const receipt = `SAFE-${Date.now()}`;

    // Create Razorpay TEST Mode order using the
    // database-controlled amount.
    const order = await createRazorpayOrder(
      totalAmountInPaise,
      receipt
    );

    return NextResponse.json({
      success: true,
      testMode: true,

      product: {
        id: product.id,
        name: product.name,
        price: product.priceInPaise / 100,
        currency: product.currency,
      },
      case: includeCase && caseProduct
        ? {
            id: caseProduct.id,
            name: caseProduct.name,
            price: caseProduct.priceInPaise / 100,
            currency: caseProduct.currency,
            }
        : null,
      quantity,
      totalAmount: totalAmountInPaise / 100,

      wallet: {
        balance: wallet.balanceInPaise / 100,
        remainingAfterPurchase:
          (wallet.balanceInPaise - totalAmountInPaise) / 100,
      },

      order,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to create Razorpay test order.",
      },
      { status: 500 }
    );
  }
}
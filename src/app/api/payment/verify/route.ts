import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpayPayment, getRazorpayOrder } from "@/lib/razorpay";
import { processPurchase } from "@/lib/wallet";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userId = Number(body.userId || 1);
    const productId = Number(body.productId);
    const quantity = Number(body.quantity || 1);
    const includeCase = body.includeCase === true;
    const caseProductId = Number(body.caseProductId || 0);

    const orderId = String(body.orderId || "");
    const paymentId = String(body.paymentId || "");
    const signature = String(body.signature || "");

    if (!productId || productId <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid product ID is required.",
        },
        { status: 400 }
      );
    }

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification details are required.",
        },
        { status: 400 }
      );
    }

    // 1. Verify Razorpay payment signature on the server.
    const verified = verifyRazorpayPayment(
      orderId,
      paymentId,
      signature
    );

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Payment signature verification failed.",
        },
        { status: 400 }
      );
    }
    const razorpayOrder = await getRazorpayOrder(orderId);

const expectedProduct = await prisma.product.findUnique({
  where: { id: productId },
});

if (!expectedProduct) {
  return NextResponse.json(
    {
      success: false,
      verified: false,
      error: "Product not found.",
    },
    { status: 404 }
  );
}

let expectedAmount = expectedProduct.priceInPaise * quantity;

if (includeCase) {
  const caseProduct = await prisma.product.findUnique({
    where: { id: caseProductId },
  });

  if (!caseProduct) {
    return NextResponse.json(
      {
        success: false,
        verified: false,
        error: "Selected case product not found.",
      },
      { status: 404 }
    );
  }

  expectedAmount += caseProduct.priceInPaise;
}

if (
  razorpayOrder.amount !== expectedAmount ||
  razorpayOrder.currency !== "INR"
) {
  return NextResponse.json(
    {
      success: false,
      verified: false,
      error: "Payment amount does not match the verified order.",
    },
    { status: 400 }
  );
}

    // 2. Only after successful Razorpay verification,
    // process the SafeShop TEST Wallet purchase.
    const purchase = await processPurchase(
        userId,
        productId,
        quantity,
        true,
        includeCase ? caseProductId : undefined
      );
    return NextResponse.json({
      success: true,
      verified: true,
      testMode: true,
      paymentId,
      orderId,
      purchase,
      message:
        "Razorpay TEST payment verified and SafeShop TEST Wallet purchase completed.",
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      {
        success: false,
        verified: false,
        error:
          error instanceof Error
            ? error.message
            : "Payment verification failed.",
      },
      { status: 500 }
    );
  }
}
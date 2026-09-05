import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function createRazorpayOrder(
  amountInPaise: number,
  receipt: string
) {
  if (!process.env.RAZORPAY_KEY_ID) {
    throw new Error("Razorpay Test Mode key ID is not configured.");
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay Test Mode key secret is not configured.");
  }

  if (amountInPaise <= 0) {
    throw new Error("Payment amount must be greater than zero.");
  }

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt,
    notes: {
      environment: "TEST",
      application: "SafeShop AI",
    },
  });

  return {
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    status: order.status,
    receipt: order.receipt,
  };
}

export function verifyRazorpayPayment(
    orderId: string,
    paymentId: string,
    signature: string
  ) {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay Test Mode key secret is not configured.");
    }
  
    const crypto = require("crypto");
  
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");
  
    return generatedSignature === signature;
  }
  export async function getRazorpayOrder(orderId: string) {
    if (!process.env.RAZORPAY_KEY_ID) {
      throw new Error("Razorpay Test Mode key ID is not configured.");
    }
  
    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay Test Mode key secret is not configured.");
    }
  
    if (!orderId) {
      throw new Error("Razorpay order ID is required.");
    }
  
    const order = await razorpay.orders.fetch(orderId);
  
    return {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
    };
  }
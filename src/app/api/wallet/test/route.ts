import { NextRequest, NextResponse } from "next/server";
import { checkBalance, addTestFunds } from "@/lib/wallet";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId") || 1);

    const result = await checkBalance(userId, 0);

    return NextResponse.json({
      success: true,
      testMode: true,
      walletBalance: result.balanceInPaise / 100,
    });
  } catch (error) {
    console.error("Wallet balance error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load wallet balance.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userId = Number(body.userId || 1);
    const amount = Number(body.amount || 0);

    if (amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Test fund amount must be greater than zero.",
        },
        { status: 400 }
      );
    }

    if (amount > 10000) {
      return NextResponse.json(
        {
          success: false,
          error: "Test fund limit is ₹10000 per request.",
        },
        { status: 400 }
      );
    }

    const wallet = await addTestFunds(
      userId,
      Math.round(amount * 100)
    );

    return NextResponse.json({
      success: true,
      testMode: true,
      message: `₹${amount} test funds added to the SafeShop AI Wallet.`,
      walletBalance: wallet.balanceInPaise / 100,
    });
  } catch (error) {
    console.error("Add test funds error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to add test funds.",
      },
      { status: 500 }
    );
  }
}
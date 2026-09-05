import { NextRequest, NextResponse } from "next/server";
import { processPurchase } from "@/lib/wallet";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userId = Number(body.userId || 1);
    const productId = Number(body.productId);
    const quantity = Number(body.quantity || 1);
    const approved = body.approved === true;

    if (!productId || productId <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid product ID is required.",
        },
        { status: 400 }
      );
    }

    const result = await processPurchase(
      userId,
      productId,
      quantity,
      approved
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Purchase error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Purchase could not be completed.",
      },
      { status: 400 }
    );
  }
}
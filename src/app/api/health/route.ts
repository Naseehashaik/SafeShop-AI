import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const checks = await prisma.setupCheck.count();
    return NextResponse.json({
      ok: true,
      database: "connected",
      setupCheckRows: checks,
      razorpayMode: process.env.RAZORPAY_MODE ?? "unset",
      simulation: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { ok: false, database: "error", message },
      { status: 500 },
    );
  }
}

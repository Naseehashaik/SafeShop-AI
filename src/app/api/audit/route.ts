import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      count: logs.length,
      logs: logs.map((log) => ({
        id: log.id,
        timestamp: log.timestamp,
        eventType: log.eventType,
        actor: log.actor,
        userId: log.userId,
        productId: log.productId,
        amountInPaise: log.amountInPaise,
        referenceId: log.referenceId,
        result: log.result,
        explanation: log.explanation,
      })),
    });
  } catch (error) {
    console.error("Audit log error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load audit trail.",
      },
      { status: 500 }
    );
  }
}
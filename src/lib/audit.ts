import { prisma } from "@/lib/db";

type AuditLogInput = {
  eventType: string;
  actor: string;
  userId?: number;
  productId?: number;
  amountInPaise?: number;
  referenceId?: string;
  result: string;
  explanation: string;
};

export async function createAuditLog(data: AuditLogInput) {
  return prisma.auditLog.create({
    data: {
      eventType: data.eventType,
      actor: data.actor,
      userId: data.userId,
      productId: data.productId,
      amountInPaise: data.amountInPaise,
      referenceId: data.referenceId,
      result: data.result,
      explanation: data.explanation,
    },
  });
}
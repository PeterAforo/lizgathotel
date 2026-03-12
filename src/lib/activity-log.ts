import prisma from "./prisma";

export async function logActivity({
  userId,
  action,
  target,
  details,
  ipAddress,
}: {
  userId: string;
  action: string;
  target: string;
  details?: string;
  ipAddress?: string;
}) {
  try {
    await prisma.activityLog.create({
      data: { userId, action, target, details, ipAddress },
    });
  } catch (error) {
    console.error("[ActivityLog] Failed to log:", error);
  }
}

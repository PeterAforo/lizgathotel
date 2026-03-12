import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["query", "error", "warn"],
  });

// Cache the client globally in ALL environments to prevent
// multiple PrismaClient instances and connection pool exhaustion
globalForPrisma.prisma = prisma;

export default prisma;

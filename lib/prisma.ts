// prisma.ts
import { PrismaClient } from "@/app/generated/prisma";

declare global {
  // this avoids redeclaring in hot reloads
  var prisma: PrismaClient | undefined;
}

// use the existing global client if it exists
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [], // optional logging in dev
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

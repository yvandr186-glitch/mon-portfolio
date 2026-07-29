import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

// Singleton Prisma (évite les connexions multiples en dev)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ["error"] });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite", // remplacez par "postgresql" en production
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: false,
    },
  },
});

export type Session = typeof auth.$Infer.Session;

// Helper pour récupérer la session côté serveur
export async function getSession() {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch {
    return null;
  }
}

// Helper pour vérifier si l'utilisateur est admin
export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  if (session.user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
  return session;
}

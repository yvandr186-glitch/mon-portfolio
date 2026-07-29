import { PrismaClient } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed...");

  const adminEmail = "yvandr186@gmail.com";
  const adminPassword = "admin12345";

  // Vérifier si l'utilisateur existe déjà
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    // Mettre à jour le rôle en ADMIN
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: "ADMIN" },
    });
    console.log("✅ Utilisateur déjà existant, rôle mis à ADMIN");
  } else {
    // Créer l'utilisateur admin
    const hashedPassword = await hashPassword(adminPassword);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Dognon Franck",
        emailVerified: true,
        role: "ADMIN",
        accounts: {
          create: {
            accountId: adminEmail,
            providerId: "credential",
            password: hashedPassword,
          },
        },
      },
    });
    console.log("✅ Utilisateur admin créé");
  }

  console.log("\n📋 Identifiants de connexion :");
  console.log("   Email : " + adminEmail);
  console.log("   Mot de passe : " + adminPassword);
  console.log("\n⚠️  Changez ce mot de passe après la première connexion !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

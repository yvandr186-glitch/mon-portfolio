# Portfolio — Dognon Franck

Portfolio professionnel avec blog intégré, espace d'administration sécurisé, et authentification Better Auth.

## Stack technique

- **Framework** : Next.js 16.2+ (App Router)
- **Langage** : TypeScript 5
- **Base de données** : PostgreSQL (Neon)
- **ORM** : Prisma 6
- **Authentification** : Better Auth
- **Styling** : Tailwind CSS 4 + shadcn/ui
- **Animations** : Framer Motion
- **Package manager** : pnpm

## Installation

### 1. Installer les dépendances

```bash
pnpm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Remplissez le fichier `.env` :

```env
# Base de données Neon (PostgreSQL)
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

# Better Auth
BETTER_AUTH_SECRET=openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000
```

### 3. Configurer la base de données Neon

1. Créez un compte sur [neon.tech](https://neon.tech)
2. Créez un nouveau projet
3. Copiez la chaîne de connexion dans `DATABASE_URL`

### 4. Activer Better Auth (authentification)

Le projet est livré en mode "preview" (sans authentification active).
Pour activer Better Auth :

```bash
# 1. Remplacez les fichiers de preview par les versions production
cp prod-config/auth.ts src/lib/auth.ts
cp prod-config/middleware.ts src/middleware.ts

# 2. Décommentez le bloc d'auth dans src/app/admin/layout.tsx

# 3. Décommentez la version production dans src/app/api/auth/[...all]/route.ts

# 4. Poussez le schéma vers Neon
pnpm db:push

# 5. Créez l'utilisateur admin
pnpm db:seed
```

L'admin sera accessible avec :
- **Email** : `yvandr186@gmail.com`
- **Mot de passe** : `admin12345`

⚠️ Changez ce mot de passe après la première connexion !

### 5. Lancer le serveur de développement

```bash
pnpm dev
```

Le site est accessible sur `http://localhost:3000`

## Routes

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil du portfolio |
| `/admin` | Espace d'administration (protégé par Better Auth) |
| `/login` | Page de connexion |
| `/api/auth/[...all]` | API Better Auth |

## Espace d'administration

### Sections disponibles

- **Tableau de bord** : statistiques, graphiques, activité récente
- **Articles** : CRUD complet, brouillons, publication
- **Projets** : CRUD complet, mise en avant, liens GitHub/Démo
- **Catégories** : gestion des catégories d'articles
- **Tags** : gestion des étiquettes
- **Médias** : bibliothèque avec upload Cloudinary
- **Commentaires** : modération (approuver, spam, supprimer)
- **Newsletter** : gestion des abonnés, export CSV
- **Messages** : boîte de réception avec réponse
- **Utilisateurs** : gestion des rôles (USER / ADMIN)
- **Paramètres** : profil, SEO, réseaux sociaux, contact, intégrations

## Scripts disponibles

```bash
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm start        # Serveur de production
pnpm lint         # Vérification ESLint
pnpm db:push      # Pousser le schéma vers la BDD
pnpm db:generate  # Générer le client Prisma
pnpm db:studio    # Ouvrir Prisma Studio
pnpm db:seed      # Initialiser la BDD avec l'admin
```

## Déploiement sur Vercel

1. Poussez le code sur GitHub
2. Connectez le dépôt à Vercel
3. Ajoutez les variables d'environnement
4. Déployez

## Licence

© 2025 Dognon Franck. Tous droits réservés.

import type {
  Project,
  Article,
  Testimonial,
  Service,
  Skill,
  Stat,
  Experience,
  Certification,
  NewsletterSubscriber,
  AdminUser,
  ContactMessage,
} from "./types";

/**
 * Mock data — would be replaced by Prisma queries in production.
 * All data reflects a young developer portfolio (student / self-taught).
 */

export const profile = {
  name: "Dognon Franck",
  firstName: "Dognon",
  lastName: "Franck",
  initials: "DF",
  title: "Développeur",
  subtitle: "Créateur • Entrepreneur",
  tagline: "Crafting world-class digital experiences.",
  bio: "Salut tout le monde ! 👋 Je suis Dognon Franck — un jeune développeur passionné basé à Cotonou. Je me forme chaque jour aux technologies web modernes et je construis des projets concrets pour apprendre en pratiquant. J'aime créer des interfaces propres et performantes, et je suis toujours partant pour de nouveaux défis. N'hésitez pas à me contacter ! 😊",
  location: "Cotonou, Bénin",
  email: "yvandr186@gmail.com",
  phone: "+2290154800074",
  phoneDisplay: "01 54 80 00 74",
  whatsapp: "2290154800074",
  availability: "Disponible pour des stages et projets freelance",
  resumeUrl: "#",
  avatar: "/franck-photo.jpg",
  logo: "/franck-logo.png",
  socials: {
    github: "https://github.com/dognonfranck",
    twitter: "https://twitter.com/dognonfranck",
    linkedin: "https://linkedin.com/in/dognonfranck",
    dribbble: "https://dribbble.com/dognonfranck",
  },
};

export const stats: Stat[] = [
  { label: "Projets réalisés", value: 4, suffix: "", description: "Projets web personnels déployés en ligne" },
  { label: "Technologies maîtrisées", value: 12, suffix: "+", description: "Langages et frameworks" },
  { label: "Certifications", value: 4, suffix: "", description: "Formations en ligne complétées" },
  { label: "Contribution Open Source", value: 8, suffix: "", description: "Pull requests et projets partagés" },
];

export const skills: Skill[] = [
  { name: "HTML", level: 95, category: "Langages" },
  { name: "CSS", level: 92, category: "Langages" },
  { name: "JavaScript", level: 94, category: "Langages" },
  { name: "PHP", level: 85, category: "Backend" },
  { name: "TypeScript", level: 90, category: "Langages" },
  { name: "React JS", level: 93, category: "Frameworks" },
  { name: "Next.js", level: 91, category: "Frameworks" },
  { name: "Prisma", level: 88, category: "Database" },
  { name: "PostgreSQL", level: 86, category: "Database" },
  { name: "Tailwind CSS", level: 92, category: "Styling" },
  { name: "Node.js", level: 84, category: "Backend" },
  { name: "Figma", level: 80, category: "Design" },
];

export const techStack = [
  "HTML", "CSS", "JavaScript", "TypeScript", "PHP",
  "React JS", "Next.js", "Prisma", "PostgreSQL", "Node.js",
  "Tailwind CSS", "shadcn/ui", "Framer Motion", "Vercel",
  "Figma", "Git", "GitHub", "Linux", "Docker", "REST API",
  "GraphQL", "Vite", "et plus encore...",
];

export const services: Service[] = [
  {
    id: "s1",
    title: "Développeur",
    description:
      "Je conçois et développe des applications web modernes, performantes et évolutives avec React, Next.js et TypeScript. Du front-end au back-end, je livre des produits prêts pour la production.",
    features: [
      "Architecture & conception",
      "Server Components & Actions",
      "APIs & bases de données",
      "Déploiement & CI/CD",
    ],
    icon: "Code2",
  },
  {
    id: "s2",
    title: "Créateur",
    description:
      "Je crée des interfaces élégantes et intuitives avec un focus sur la clarté, le motion design et l'accessibilité. Des wireframes aux maquettes pixel-perfect, je livre des design systems qui scalent.",
    features: [
      "Design system",
      "Bibliothèque de composants",
      "Motion & interaction",
      "Audit d'accessibilité",
    ],
    icon: "Sparkles",
  },
  {
    id: "s3",
    title: "Entrepreneur",
    description:
      "J'accompagne les startups et entrepreneurs dans la construction de leur produit digital, de l'idée au lancement. Stratégie technique, MVP, et croissance — je suis partenaire de votre vision.",
    features: [
      "Stratégie produit",
      "MVP & time-to-market",
      "Mentorat technique",
      "Scaling & croissance",
    ],
    icon: "Rocket",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "Pringles — Site officiel",
    slug: "pringles-site-officiel",
    excerpt:
      "Refonte du site officiel Pringles avec un design énergique mettant en avant les produits et l'identité de la marque.",
    description:
      "Un projet de site vitrine pour la marque de chips Pringles. Design moderne et responsive avec une hero section impactante, un menu de navigation et une mise en avant des nouvelles saveurs 2025. Construit avec React et un focus sur l'identité visuelle de la marque (rouge vif, typographie moderne).",
    category: "Application Web",
    technologies: ["React", "CSS Modules", "HTML5", "Responsive Design"],
    featured: true,
    year: 2025,
    thumbnail:
      "/projects/pringles.png",
    gallery: [
      "/projects/pringles.png",
    ],
    demo: "https://pringles-st.vercel.app/",
    metrics: [
      { label: "Framework", value: "React" },
      { label: "Type", value: "Vitrine" },
      { label: "Année", value: "2025" },
    ],
  },
  {
    id: "p2",
    title: "Weather App — Application météo",
    slug: "weather-app",
    excerpt:
      "Application météo simple et fiable pour consulter la météo d'une ville ou de sa position actuelle.",
    description:
      "Une application météo qui permet à l'utilisateur de rechercher la météo d'une ville ou d'utiliser sa position géographique. Interface centrée avec un design en gradient bleu-violet, carte semi-transparente et interactions intuitives. Utilise une API météo publique et l'API de géolocalisation du navigateur.",
    category: "Application Web",
    technologies: ["React", "API REST", "Géolocalisation", "CSS"],
    featured: true,
    year: 2025,
    thumbnail:
      "/projects/weather.png",
    gallery: [
      "/projects/weather.png",
    ],
    demo: "https://melodic-pithivier-7af099.netlify.app/",
    metrics: [
      { label: "API", value: "Météo" },
      { label: "Géoloc", value: "Active" },
      { label: "Année", value: "2025" },
    ],
  },
  {
    id: "p3",
    title: "Saint-Valentin — Site interactif",
    slug: "saint-valentin-interactif",
    excerpt:
      "Site web romantique générant des messages d'amour personnalisés avec un design doux et des animations fluides.",
    description:
      "Un site web interactif pour la Saint-Valentin. L'utilisateur entre le prénom de son partenaire pour recevoir un message personnalisé. Design romantique avec palette rose/rouge, fond dégradé doux, cœurs animés et bouton call-to-action. Inclut une icône musique pour l'ambiance sonore.",
    category: "Application Web",
    technologies: ["React", "CSS Animations", "HTML5", "JavaScript"],
    featured: false,
    year: 2025,
    thumbnail:
      "/projects/saint-valentin.png",
    gallery: [
      "/projects/saint-valentin.png",
    ],
    demo: "https://radiant-entremet-f593f8.netlify.app/",
    metrics: [
      { label: "Type", value: "Interactif" },
      { label: "Thème", value: "Romantique" },
      { label: "Année", value: "2025" },
    ],
  },
  {
    id: "p4",
    title: "Compo de Franck — E-commerce",
    slug: "compo-de-franck-ecommerce",
    excerpt:
      "Site e-commerce minimaliste et vibrant avec navigation intuitive et gestion de panier, axé sur la conversion.",
    description:
      "Un site e-commerce avec un design minimaliste et énergique (fond jaune vif, texte noir). Navigation par ancres vers les sections (Benefits, How It Works, Quality, Ingredients, Reviews) et bouton 'Add to Cart' avec gestion d'état. Construit avec React/Next.js pour des performances optimales et une expérience utilisateur fluide.",
    category: "Application Web",
    technologies: ["Next.js", "React", "Tailwind CSS", "E-commerce"],
    featured: false,
    year: 2025,
    thumbnail:
      "/projects/compo.png",
    gallery: [
      "/projects/compo.png",
    ],
    demo: "https://compo-de-franck.netlify.app/",
    metrics: [
      { label: "Type", value: "E-commerce" },
      { label: "Panier", value: "Fonctionnel" },
      { label: "Année", value: "2025" },
    ],
  },
];

export const articles: Article[] = [
  {
    id: "a1",
    title: "L'architecture d'une application Next.js moderne",
    slug: "architecture-modern-nextjs",
    excerpt:
      "Plongée dans les patrons d'architecture qui alimentent les applications Next.js en production : Server Components, Server Actions, streaming et la couche de données.",
    category: "Architecture",
    tags: ["Next.js", "Architecture", "React 19", "Server Components"],
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&fit=crop&q=80",
    publishedAt: "2025-09-12",
    readingTime: 14,
    featured: true,
    views: 42180,
    author: {
      name: "Dognon Franck",
      avatar:
        "/franck-photo.jpg",
      role: "Développeur",
    },
    content: [
      {
        type: "paragraph",
        text: "Next.js 16 a fondamentalement changé notre façon de penser l'architecture des applications web. L'introduction des Server Components et des Server Actions a créé un nouveau modèle mental — un modèle où la frontière entre client et serveur se trace au niveau du composant, pas au niveau de la route. Dans cet article, je passe en revue les patrons que j'ai utilisés pour livrer plusieurs applications en production sur cette stack.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Cet article suppose une familiarité avec React 19 et l'App Router. Si ces concepts sont nouveaux pour vous, je vous recommande de lire d'abord la documentation officielle de React.",
      },
      { type: "heading", level: 2, text: "Le changement de modèle mental" },
      {
        type: "paragraph",
        text: "Avant les Server Components, chaque composant de votre arbre s'exécutait côté client. La récupération des données se faisait dans useEffect, ce qui provoquait des cascades. L'état était dupliqué entre client et serveur. Avec les Server Components, le comportement par défaut est le rendu côté serveur avec zéro JavaScript envoyé pour le contenu statique. La frontière client est explicite — on l'active avec la directive 'use client'.",
      },
      {
        type: "paragraph",
        text: "Ce changement a des implications profondes. La taille des bundles diminue considérablement. Le chargement initial des pages devient plus rapide. Le SEO s'améliore parce que le contenu est dans le HTML. Mais cela signifie aussi repenser la façon dont nous structurons les applications. Les composants qui nécessitent de l'interactivité doivent être isolés. La gestion d'état se rapproche de la couche de données.",
      },
      { type: "heading", level: 2, text: "Server Actions : la nouvelle API" },
      {
        type: "paragraph",
        text: "Les Server Actions remplacent les routes API traditionnelles pour la plupart des mutations. Elles sont type-safe, éliminent le boilerplate de fetch + sérialisation JSON, et s'intègrent nativement avec useFormStatus et useActionState. Voici un patron typique :",
      },
      {
        type: "code",
        language: "typescript",
        code: "'use server'\n\nimport { z } from 'zod'\nimport { db } from '@/lib/db'\nimport { revalidatePath } from 'next/cache'\n\nconst schema = z.object({\n  title: z.string().min(1).max(120),\n  content: z.string().min(1),\n})\n\nexport async function createPost(input: z.input<typeof schema>) {\n  const data = schema.parse(input)\n  const post = await db.post.create({ data })\n  revalidatePath('/blog')\n  return post\n}",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Validez toujours les entrées avec Zod côté serveur. La directive 'use server' n'est pas une barrière de sécurité — n'importe qui peut appeler votre Server Action avec des données arbitraires.",
      },
      { type: "heading", level: 2, text: "Streaming et Suspense" },
      {
        type: "paragraph",
        text: "Le streaming avec Suspense est l'une des fonctionnalités les plus puissantes de l'App Router. Au lieu d'attendre que toutes les données soient chargées avant d'envoyer le HTML, vous pouvez streamer des morceaux au fur et à mesure. Cela améliore considérablement la performance perçue, surtout sur les réseaux lents.",
      },
      {
        type: "paragraph",
        text: "L'astuce clé est d'identifier le chemin critique — que doit voir l'utilisateur en premier ? Enveloppez les sections non critiques dans des limites Suspense avec des fallbacks pertinents. Le shell se charge instantanément, et le contenu arrive en flux au fur et à mesure.",
      },
      { type: "heading", level: 3, text: "Patron pratique" },
      {
        type: "code",
        language: "tsx",
        code: "export default function Page() {\n  return (\n    <>\n      <Hero /> {/* Critical — loads immediately */}\n      <Suspense fallback={<CommentsSkeleton />}>\n        <Comments /> {/* Streams in later */}\n      </Suspense>\n    </>\n  )\n}",
      },
      { type: "heading", level: 2, text: "The Data Layer" },
      {
        type: "paragraph",
        text: "Avec les Server Components, votre couche de données vit à la lisière de la requête. Prisma fonctionne à merveille ici — vous interrogez la base de données directement depuis un composant serveur, et le résultat est sérialisé au format de flux de React. Pas de boilerplate d'API, pas de couches de cache à gérer manuellement.",
      },
      {
        type: "paragraph",
        text: "Pour les mutations, les Server Actions vous offrent la même sécurité de typage. L'astuce consiste à revalider les chemins stratégiquement. revalidatePath est peu coûteux, mais revalidateTag permet d'invalider par tag, ce qui est plus chirurgical.",
      },
      {
        type: "quote",
        text: "Le meilleur code est celui qu'on n'écrit pas. Les Server Components nous permettent de supprimer des couches entières de boilerplate qui n'existaient que pour déplacer des données entre le client et la base.",
        cite: "Dognon Franck",
      },
      { type: "heading", level: 2, text: "Conclusion" },
      {
        type: "paragraph",
        text: "L'architecture que j'ai décrite ici n'est pas théorique — c'est celle que j'utilise en production tous les jours. Le changement de mentalité prend du temps, mais une fois qu'on l'a intégré, on se met à écrire moins de code qui fait plus. Le framework gère les parties difficiles : streaming, cache, sérialisation. Vous vous concentrez sur le produit.",
      },
    ],
  },
  {
    id: "a2",
    title: "Construire un design system qui passe à l'échelle",
    slug: "design-system-that-scales",
    excerpt:
      "Leçons tirées de la livraison d'un design system utilisé par plus de 8 000 développeurs. Ce qui a fonctionné, ce qui n'a pas fonctionné, et ce que je ferais différemment.",
    category: "Design",
    tags: ["Design System", "React", "Accessibilité", "DX"],
    cover:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=900&fit=crop&q=80",
    publishedAt: "2025-08-04",
    readingTime: 11,
    featured: true,
    views: 28940,
    author: {
      name: "Dognon Franck",
      avatar:
        "/franck-photo.jpg",
      role: "Développeur",
    },
    content: [
      {
        type: "paragraph",
        text: "Un design system n'est pas une bibliothèque de composants. C'est un langage partagé entre designers et ingénieurs, un contrat qui passe à l'échelle across les équipes et le temps. J'ai passé les deux dernières années à construire Lumen, un design system open source désormais utilisé par plus de 8 000 développeurs. Voici ce que j'ai appris.",
      },
      { type: "heading", level: 2, text: "Commencer par les primitives" },
      {
        type: "paragraph",
        text: "La plus grande erreur des équipes est de commencer par des composants de haut niveau — boutons, cartes, modales. Ce sont les mauvaises abstractions. Commencez par des primitives : des blocs sans style, accessibles, qui gèrent le comportement mais pas l'apparence. Radix UI est le standard de référence ici.",
      },
      {
        type: "paragraph",
        text: "Par-dessus les primitives, construisez vos composants stylés. Cette séparation des responsabilités signifie que vous pouvez remplacer la couche de style sans réécrire le comportement. Cela signifie aussi que l'accessibilité est intégrée dès le premier jour.",
      },
      { type: "heading", level: 2, text: "Les tokens sont la source de vérité" },
      {
        type: "paragraph",
        text: "Les tokens de design — couleurs, espacement, typographie — devraient vivre dans une source de vérité unique. J'utilise un fichier JSON qui est transformé en variables CSS, configuration Tailwind et styles Figma. Changez un token une fois, et il se propage partout.",
      },
      {
        type: "code",
        language: "json",
        code: '{\n  "color": {\n    "background": {\n      "primary": "#000000",\n      "secondary": "#0F0F0F",\n      "card": "#111111"\n    }\n  },\n  "spacing": {\n    "unit": 4,\n    "scale": "major-third"\n  }\n}',
      },
      { type: "heading", level: 2, text: "La composition plutôt que la configuration" },
      {
        type: "paragraph",
        text: "Résistez à l'envie d'ajouter des props pour chaque variation possible. Un Button avec 30 props est un cauchemar de maintenance. Au lieu de cela, composez de petits composants ciblés. Les composants composés — comme Select avec SelectTrigger, SelectContent, SelectItem — donnent aux utilisateurs de la flexibilité sans gonfler un seul composant.",
      },
      {
        type: "quote",
        text: "La surface d'API est une dette. Chaque prop que vous ajoutez est une prop que vous maintenez pour toujours.",
      },
      { type: "heading", level: 2, text: "La documentation est le produit" },
      {
        type: "paragraph",
        text: "Si un composant n'est pas documenté, il n'existe pas. J'ai construit un site de documentation avec des exemples en direct et éditables utilisant MDX et Sandpack. Chaque composant a des tables de props, des notes d'accessibilité et des exemples concrets. L'adoption a grimpé le jour où nous avons publié la documentation.",
      },
      {
        type: "paragraph",
        text: "La leçon à retenir : un design system réussit ou échoue selon son expérience développeur. Les composants sont le minimum vital. Les tokens, la documentation et une philosophie d'API claire sont ce qui permet de passer à l'échelle.",
      },
    ],
  },
  {
    id: "a3",
    title: "Budgets de performance : un guide pratique",
    slug: "performance-budgets",
    excerpt:
      "Comment définir, appliquer et maintenir des budgets de performance dans une base de code réelle. Avec des exemples de code et une intégration CI.",
    category: "Performance",
    tags: ["Performance", "Web Vitals", "Lighthouse", "CI"],
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80",
    publishedAt: "2025-07-18",
    readingTime: 9,
    featured: false,
    views: 18720,
    author: {
      name: "Dognon Franck",
      avatar:
        "/franck-photo.jpg",
      role: "Développeur",
    },
    content: [
      {
        type: "paragraph",
        text: "La performance est une fonctionnalité. Mais sans budgets, c'est une fonctionnalité qui se dégrade lentement. Chaque PR ajoute quelques kilo-octets, quelques millisecondes, et avec le temps, votre application rapide devient lente. Les budgets de performance inversent cette tendance en rendant les régressions visibles — et bloquantes.",
      },
      { type: "heading", level: 2, text: "Définir le budget" },
      {
        type: "paragraph",
        text: "Commencez par l'utilisateur. Sur quel appareil est-il ? Quel réseau ? Un budget pour un utilisateur mobile en 3G est très différent d'un utilisateur desktop sur fibre. Je recommande de définir deux budgets : une référence pour l'utilisateur mobile du 75e percentile, et un objectif ambitieux pour le 90e percentile.",
      },
      {
        type: "paragraph",
        text: "Points de départ courants : 170 Ko JS compressé, 50 Ko CSS, LCP sous 2,5 s, CLS sous 0,1, INP sous 200 ms. Ajustez selon vos mesures réelles.",
      },
      { type: "heading", level: 2, text: "Application dans la CI" },
      {
        type: "paragraph",
        text: "Lighthouse CI rend cela concret. Ajoutez-le à votre workflow GitHub Actions, et les PR qui dépassent le budget sont bloquées. Voici une configuration fonctionnelle :",
      },
      {
        type: "code",
        language: "yaml",
        code: "name: Performance\non: [pull_request]\njobs:\n  lighthouse:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Lighthouse CI\n        uses: treosh/lighthouse-ci-action@v11\n        with:\n          urls: |\n            http://localhost:3000\n          budgetPath: ./lighthouse-budget.json",
      },
      { type: "heading", level: 2, text: "Analyse des bundles" },
      {
        type: "paragraph",
        text: "Les budgets de bundle interceptent les régressions avant qu'elles n'atteignent les utilisateurs. Utilisez @next/bundle-analyzer pour visualiser ce qui se trouve dans votre bundle, et définissez des limites strictes sur le JS au premier chargement par route. Quand une route dépasse la limite, la CI échoue.",
      },
      {
        type: "paragraph",
        text: "La discipline clé est de revoir chaque ajout. Nouvelle dépendance ? Vérifiez l'impact sur le bundle. Nouvelle fonctionnalité ? Mesurez le coût en JS. Les budgets de performance rendent ces conversations basées sur les données plutôt que sur les opinions.",
      },
    ],
  },
  {
    id: "a4",
    title: "Pourquoi j'ai arrêté d'utiliser Redux",
    slug: "why-i-stopped-using-redux",
    excerpt:
      "Une rétrospective sur la gestion d'état dans React moderne. Ce qui a remplacé Redux, et pourquoi votre équipe n'en a probablement pas besoin.",
    category: "Ingénierie",
    tags: ["React", "Redux", "Zustand", "Gestion d'état"],
    cover:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&h=900&fit=crop&q=80",
    publishedAt: "2025-06-22",
    readingTime: 7,
    featured: false,
    views: 35200,
    author: {
      name: "Dognon Franck",
      avatar:
        "/franck-photo.jpg",
      role: "Développeur",
    },
    content: [
      {
        type: "paragraph",
        text: "J'ai utilisé Redux pendant cinq ans. J'ai écrit le boilerplate, les reducers, les action creators, les thunks, les sagas. Je l'ai enseigné aux nouvelles recrues. Puis, quelque part en 2023, j'ai arrêté. Non pas parce que Redux s'est dégradé — il s'est amélioré — mais parce que les problèmes qu'il résolvait ont en grande partie disparu.",
      },
      { type: "heading", level: 2, text: "Le problème que Redux résolvait" },
      {
        type: "paragraph",
        text: "En 2017, React n'avait pas de moyen intégré de partager l'état entre les composants. Le Context existait mais était déconseillé pour les mises à jour à haute fréquence. Redux a comblé cette lacune avec une source de vérité unique et prévisible. C'était le bon outil à l'époque.",
      },
      {
        type: "paragraph",
        text: "Mais le coût était réel : types d'actions, action creators, reducers, selectors, middleware. Une fonctionnalité simple pouvait toucher dix fichiers. La charge cognitive était énorme.",
      },
      { type: "heading", level: 2, text: "Ce qui a changé" },
      {
        type: "paragraph",
        text: "Trois choses : les Server Components ont déplacé la plupart de l'état vers le serveur. React Query (désormais TanStack Query) gère l'état serveur avec élégance. Et pour l'état client restant, Zustand vous donne 90 % de la puissance de Redux avec 10 % du code.",
      },
      {
        type: "code",
        language: "typescript",
        code: "import { create } from 'zustand'\n\ninterface UIStore {\n  theme: 'light' | 'dark'\n  toggleTheme: () => void\n}\n\nexport const useUI = create<UIStore>((set) => ({\n  theme: 'dark',\n  toggleTheme: () =>\n    set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),\n}))",
      },
      {
        type: "paragraph",
        text: "C'est tout. Pas de providers, pas de types d'actions, pas de boilerplate. Le store est un hook. Les composants s'abonnent à des tranches. Les mises à jour sont automatiquement groupées. Pour la plupart des applications, c'est tout ce dont vous avez besoin.",
      },
      { type: "heading", level: 2, text: "Quand vous avez encore besoin de Redux" },
      {
        type: "paragraph",
        text: "Redux Toolkit est excellent pour les applications avec un état client complexe : débogage avec voyage dans le temps, mises à jour optimistes avec retour arrière, annuler/refaire. Si vous construisez Figma, vous voulez probablement Redux. Si vous construisez une application SaaS classique, non.",
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Dognon Franck a développé pour nous un site vitrine moderne et performant. Malgré son jeune âge, il fait preuve d'une grande rigueur et d'une vraie attention aux détails. Le projet a été livré dans les délais et le résultat dépasse nos attentes.",
    author: "Sarah Chen",
    role: "Gérante",
    company: "Boutique Cotonou",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&q=80",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "J'ai encadré Dognon Franck lors de son apprentissage du développement web. Il est extrêmement motivé, curieux et apprend vite. Il n'hésite pas à poser les bonnes questions et à se challenger sur des projets complexes. Un jeune talent à suivre.",
    author: "Marcus Reeves",
    role: "Formateur",
    company: "École du Web",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&q=80",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Franck a réalisé l'interface de notre application dans le cadre d'un projet étudiant. Le rendu était si professionnel que nous l' avons conservé pour la version finale. Son sens du design et la qualité de son code sont impressionnants pour un jeune développeur.",
    author: "Priya Nair",
    role: "Chef de Projet",
    company: "Startup locale",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces&q=80",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "Dognon Franck a contribué à notre projet open source avec un sérieux remarquable. Ses pull requests étaient propres, bien documentées et il a su s'intégrer dans notre workflow. C'est un développeur avec qui il fait bon collaborer.",
    author: "David Kowalski",
    role: "Mainteneur Open Source",
    company: "Projet communautaire",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces&q=80",
    rating: 5,
  },
];

export const experiences: Experience[] = [
  {
    role: "Développeur Web — Apprentissage actif",
    company: "Auto-formation",
    period: "2025 — Présent",
    description:
      "Apprentissage autodidacte des technologies web modernes via la documentation officielle, les cours en ligne et la pratique sur des projets concrets. Focus sur React, Next.js et TypeScript.",
    achievements: [
      "Maîtrise progressive de HTML, CSS, JavaScript et TypeScript",
      "Construction de plusieurs projets personnels pour mettre en pratique les concepts",
      "Étude des bonnes pratiques d'architecture et d'accessibilité",
    ],
  },
  {
    role: "Développeur Frontend",
    company: "Projets personnels",
    period: "2025 — Présent",
    description:
      "Réalisation d'interfaces web modernes avec React et Tailwind CSS. Création de sites vitrines, dashboards et applications web pour consolider mes compétences.",
    achievements: [
      "Développement d'un portfolio personnel avec Next.js 16",
      "Création d'une landing page responsive pour une marque locale",
      "Implémentation de composants réutilisables avec shadcn/ui",
    ],
  },
  {
    role: "Étudiant en Développement Web",
    company: "Formation en ligne",
    period: "2025 — 2026",
    description:
      "Suivi de formations en ligne sur les technologies web : HTML/CSS, JavaScript, React, Node.js et bases de données. Obtention de certifications attestant des compétences acquises.",
    achievements: [
      "Certifications en développement frontend et backend",
      "Réalisation d'exercices pratiques et de mini-projets",
      "Participation à des communautés de développeurs",
    ],
  },
  {
    role: "Contributeur Open Source",
    company: "Communauté GitHub",
    period: "2025 — Présent",
    description:
      "Contribution à des projets open source et partage de mes propres projets sur GitHub. Apprentissage des bonnes pratiques de collaboration via Git et GitHub.",
    achievements: [
      "Publication de plusieurs dépôts personnels sur GitHub",
      "Premières contributions à des projets open source",
      "Apprentissage des workflows Git (branches, pull requests, reviews)",
    ],
  },
];

export const certifications: Certification[] = [
  { name: "Développeur Frontend Meta", issuer: "Meta / Coursera", year: "2024" },
  { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", year: "2024" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2023" },
  { name: "Introduction à React", issuer: "Scrimba", year: "2023" },
];

export const adminUsers: AdminUser[] = [
  {
    id: "u1",
    name: "Dognon Franck",
    email: "yvandr186@gmail.com",
    role: "ADMIN",
    avatar:
      "/franck-photo.jpg",
    joinedAt: "2023-01-12",
    lastActive: "2025-10-08",
    posts: 87,
    status: "active",
  },
  {
    id: "u2",
    name: "Sarah Chen",
    email: "sarah@helixlabs.io",
    role: "USER",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&q=80",
    joinedAt: "2024-03-04",
    lastActive: "2025-10-07",
    posts: 12,
    status: "active",
  },
  {
    id: "u3",
    name: "Marcus Reeves",
    email: "marcus@atlas.com",
    role: "USER",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&q=80",
    joinedAt: "2024-06-21",
    lastActive: "2025-09-30",
    posts: 4,
    status: "active",
  },
  {
    id: "u4",
    name: "Priya Nair",
    email: "priya@cadence.app",
    role: "USER",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces&q=80",
    joinedAt: "2024-08-14",
    lastActive: "2025-10-06",
    posts: 8,
    status: "active",
  },
  {
    id: "u5",
    name: "Compte Spam",
    email: "spam@bot.xyz",
    role: "USER",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=faces&q=80",
    joinedAt: "2025-09-29",
    lastActive: "2025-09-29",
    posts: 0,
    status: "suspended",
  },
];

export const newsletterSubscribers: NewsletterSubscriber[] = [
  { id: "n1", email: "dev@company.com", subscribedAt: "2025-10-08", status: "active" },
  { id: "n2", email: "sarah@helixlabs.io", subscribedAt: "2025-10-07", status: "active" },
  { id: "n3", email: "marcus@atlas.com", subscribedAt: "2025-10-05", status: "active" },
  { id: "n4", email: "priya@cadence.app", subscribedAt: "2025-10-03", status: "active" },
  { id: "n5", email: "david@veritas.com", subscribedAt: "2025-10-01", status: "active" },
  { id: "n6", email: "unsub@example.com", subscribedAt: "2025-09-15", status: "unsubscribed" },
  { id: "n7", email: "pending@example.com", subscribedAt: "2025-10-08", status: "pending" },
];

export const contactMessages: ContactMessage[] = [
  {
    id: "m1",
    name: "Aïcha Bello",
    email: "aicha@boutique-cotonou.bj",
    subject: "Site vitrine pour ma boutique",
    message:
      "Bonjour, je cherche un développeur pour créer le site vitrine de ma boutique en ligne. Avez-vous des disponibilités pour en discuter la semaine prochaine ?",
    receivedAt: "2025-10-08 14:32",
    status: "new",
  },
  {
    id: "m2",
    name: "Koffi Adjoua",
    email: "koffi@ecole-web.edu",
    subject: "Projet étudiant en collaboration",
    message:
      "Bonjour, nous recherchons un développeur pour encadrer un projet étudiant cette année. Seriez-vous intéressé par une intervention ponctuelle ?",
    receivedAt: "2025-10-07 09:14",
    status: "read",
  },
  {
    id: "m3",
    name: "Marc Doe",
    email: "marc@startup-locale.com",
    subject: "Stage en développement web",
    message:
      "Salut Franck, ta candidature nous intéresse pour un stage en développement frontend. Peut-on organiser un entretien la semaine prochaine ?",
    receivedAt: "2025-10-06 16:48",
    status: "replied",
  },
];

export interface Category {
  id: ID;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
  color: string;
}

export interface Tag {
  id: ID;
  name: string;
  slug: string;
  articleCount: number;
}

export interface Comment {
  id: ID;
  articleTitle: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  status: "pending" | "approved" | "spam";
}

export const categories: Category[] = [
  { id: "c1", name: "Architecture", slug: "architecture", description: "Articles sur l'architecture logicielle et les patrons de conception", articleCount: 2, color: "#2563EB" },
  { id: "c2", name: "Design", slug: "design", description: "Design systems, UI/UX et accessibilité", articleCount: 1, color: "#737373" },
  { id: "c3", name: "Performance", slug: "performance", description: "Optimisation des performances web", articleCount: 1, color: "#404040" },
  { id: "c4", name: "Ingénierie", slug: "ingenierie", description: "Bonnes pratiques et retours d'expérience", articleCount: 1, color: "#a3a3a3" },
];

export const tags: Tag[] = [
  { id: "t1", name: "Next.js", slug: "nextjs", articleCount: 2 },
  { id: "t2", name: "React", slug: "react", articleCount: 3 },
  { id: "t3", name: "TypeScript", slug: "typescript", articleCount: 2 },
  { id: "t4", name: "Architecture", slug: "architecture", articleCount: 2 },
  { id: "t5", name: "Server Components", slug: "server-components", articleCount: 1 },
  { id: "t6", name: "React 19", slug: "react-19", articleCount: 1 },
  { id: "t7", name: "Design System", slug: "design-system", articleCount: 1 },
  { id: "t8", name: "Accessibilité", slug: "accessibilite", articleCount: 1 },
  { id: "t9", name: "DX", slug: "dx", articleCount: 1 },
  { id: "t10", name: "Performance", slug: "performance", articleCount: 1 },
  { id: "t11", name: "Web Vitals", slug: "web-vitals", articleCount: 1 },
  { id: "t12", name: "Lighthouse", slug: "lighthouse", articleCount: 1 },
  { id: "t13", name: "CI", slug: "ci", articleCount: 1 },
  { id: "t14", name: "Redux", slug: "redux", articleCount: 1 },
  { id: "t15", name: "Zustand", slug: "zustand", articleCount: 1 },
  { id: "t16", name: "Gestion d'état", slug: "gestion-etat", articleCount: 1 },
];

export const comments: Comment[] = [
  {
    id: "cm1",
    articleTitle: "L'architecture d'une application Next.js moderne",
    author: "Aïcha Bello",
    email: "aicha@example.com",
    content: "Excellent article ! Les Server Components ont vraiment changé ma façon de penser l'architecture. Merci pour le partage.",
    createdAt: "2025-10-08 10:23",
    status: "approved",
  },
  {
    id: "cm2",
    articleTitle: "L'architecture d'une application Next.js moderne",
    author: "Koffi M.",
    email: "koffi@example.com",
    content: "Très clair, j'ai enfin compris la différence entre Server et Client Components. Un article à bookmarquer !",
    createdAt: "2025-10-07 16:45",
    status: "approved",
  },
  {
    id: "cm3",
    articleTitle: "Construire un design system qui passe à l'échelle",
    author: "Anonyme",
    email: "spam@bot.xyz",
    content: "Cliquez ici pour gagner un iPhone gratuit !!! http://suspicious-link.com",
    createdAt: "2025-10-07 08:12",
    status: "spam",
  },
  {
    id: "cm4",
    articleTitle: "Pourquoi j'ai arrêté d'utiliser Redux",
    author: "Marc Doe",
    email: "marc@example.com",
    content: "Intéressant. Je n'avais jamais considéré Zustand, je vais tester sur mon prochain projet.",
    createdAt: "2025-10-06 14:30",
    status: "pending",
  },
  {
    id: "cm5",
    articleTitle: "Budgets de performance : un guide pratique",
    author: "Sarah L.",
    email: "sarah@example.com",
    content: "Le config Lighthouse CI est super utile, merci ! Est-ce que tu as un template pour les budgets bundle ?",
    createdAt: "2025-10-05 19:15",
    status: "pending",
  },
];

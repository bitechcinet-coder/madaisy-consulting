# 🔍 Revue de Code — Madaisy Consulting Agency

**Date :** 13 juin 2026  
**Fichiers analysés :** 35 fichiers (pages, composants, API, middleware, config)  
**Stack :** Next.js 14 + TypeScript + Prisma + Tailwind + next-auth

---

## 🔴 CRITIQUE (à corriger immédiatement)

### 1. API routes sans authentification — exposition de données

**Fichiers :** `api/blog/route.ts`, `api/temoignages/route.ts`, `api/contacts/route.ts`

Les routes `POST`, `PATCH` et `DELETE` de ces API **ne vérifient pas l'authentification**. N'importe qui peut :
- Créer/modifier/supprimer des articles de blog
- Créer/modifier/supprimer des témoignages  
- Modifier/supprimer des contacts

```ts
// ❌ Actuel — aucune protection
export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
```

**Correction :** Ajouter `getServerSession` sur toutes les routes `POST/PATCH/DELETE`.

```ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  // ...
}
```

### 2. Injection possible dans l'upload de fichiers

**Fichier :** `api/upload/route.ts`

- Pas de limite de taille de fichier → attaque DoS possible
- Pas de vérification de type MIME → on peut uploader un `.php`, `.exe`, `.html`
- Le nom de fichier est assaini mais l'extension est conservée

```ts
// ❌ Actuel — tout type de fichier accepté
const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
```

**Correction :** Limiter aux images uniquement (JPEG, PNG, WebP, SVG) et ajouter une limite de 5 Mo.

```ts
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
if (!ALLOWED.includes(file.type)) {
  return NextResponse.json({ error: 'Type non autorisé' }, { status: 400 });
}
if (file.size > 5 * 1024 * 1024) {
  return NextResponse.json({ error: 'Fichier trop volumineux' }, { status: 400 });
}
```

### 3. Middleware bypass possible sur /admin

**Fichier :** `middleware.ts`

Le middleware ne protège que les sous-routes, pas `/admin` lui-même (qui redirige vers `/admin/dashboard`). Mais surtout, **le middleware ne protège pas les API routes admin** (`/api/blog`, `/api/contacts`, etc.).

```ts
// ❌ Actuel — seules les pages admin sont protégées
export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/pages/:path*', ...],
};
```

**Correction :** Protéger aussi les API routes non-GET.

**Alternative :** Utiliser `getServerSession` directement dans chaque API route (recommandé).

---

## 🟠 MAJEUR (impact fonctionnel ou UX)

### 4. Newsletter : pas de validation d'email

**Fichier :** `api/newsletter/route.ts`

```ts
// ❌ Accepte n'importe quelle chaîne comme email
const { email } = await request.json();
await prisma.newsletter.create({ data: { email } });
```

**Correction :** Valider le format email avec une regex ou Zod.

```ts
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
}
```

### 5. Formulaire contact : aucune validation côté serveur

**Fichier :** `api/contacts/route.ts`

Aucune validation des champs (taille minimale, format, champs obligatoires). On peut envoyer un JSON vide.

**Correction :** Valider `name`, `email`, `subject`, `message` avec des contraintes de longueur.

### 6. Blog public : faille de révélation de données

**Fichier :** `api/blog/route.ts`

La route `GET /api/blog` **retourne tous les posts, y compris les brouillons** (`published: false`). La page publique filtre côté client, mais l'API est accessible directement.

**Correction :** Filtrer côté serveur.

```ts
export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(posts);
}
```

### 7. Blog détail accessible même si non publié

**Fichiers :** `api/blog/[slug]/route.ts`, `blog/[slug]/page.tsx`

La route API `/api/blog/[slug]` retourne l'article sans vérifier `published`. La page de détail n'a pas de vérification non plus.

**Correction :** Ajouter `where: { slug, published: true }` dans la route API.

### 8. Upload d'images : pas de suppression des fichiers orphelins

**Fichier :** `api/upload/route.ts`

Les images uploadées ne sont jamais supprimées. Le dossier `public/uploads/` va grossir indéfiniment.

### 9. Admin : pas de pagination sur les listes

**Fichiers :** `api/blog/route.ts`, `api/contacts/route.ts`, `api/temoignages/route.ts`

Les `GET` retournent tous les enregistrements sans limite. Avec 1000 articles, la page admin va crasher.

**Correction :** Ajouter `take` et `skip` avec des paramètres de pagination.

### 10. Bouton WhatsApp masqué en dur

**Fichier :** `components/WhatsAppButton.tsx`

```ts
const phone = '+225****9275'; // Numéro masqué en dur
```

Le numéro complet est bien présent dans le footer et la page contact, mais le bouton flottant envoie vers un numéro tronqué.

**Correction :** Utiliser le vrai numéro.

---

## 🟡 MINEUR (qualité de code et UX)

### 11. Pas d'états de chargement sur les formulaires

Les formulaires (contact, newsletter, admin) n'affichent pas de spinner ou de feedback pendant l'envoi. L'utilisateur peut cliquer plusieurs fois.

**Correction :** Ajouter `disabled` pendant l'envoi et un état `loading`.

### 12. Pas de gestion d'erreur utilisateur

Quand une API échoue (réseau, timeout), l'utilisateur voit juste `alert('Une erreur est survenue')`. Pas de message contextuel, pas de retry.

### 13. Pas de `next/image` sur les images de la page blog

**Fichier :** `blog/page.tsx`

Les images des articles utilisent des `<div>` avec `background-image` au lieu de `<Image>` (optimisation, lazy loading, placeholder).

### 14. Pas d'ARIA labels significatifs

Très peu d'attributs `aria-label` dans les composants interactifs (cartes cliquables, boutons d'action).

### 15. VideoPlayer : pas de `prefers-reduced-motion`

Pas d'arrêt automatique pour les utilisateurs avec motion réduite.

### 16. Footer : liens des réseaux sociaux vides

```tsx
<a href="#" className="..." aria-label="Facebook"> // href="#"
```

Les liens ne pointent vers aucune page réelle.

### 17. Contact page : hero en rouge pur

Le dégradé rouge `rgba(230,5,12,0.9)` est agressif visuellement comparé au reste du site.

### 18. Pas de page `/mentions-legales` ni `/confidentialite`

Le footer pointe vers ces URLs mais les pages n'existent pas → 404.

### 19. Admin : pas de confirmation de succès après création

Quand on crée un article ou témoignage, la modal se ferme sans feedback. L'utilisateur doit scroller pour voir si ça a marché.

### 20. Blog admin : slug non unique peut causer des collisions

Deux articles avec le même slug provoquent une erreur Prisma (contrainte `@unique`). Pas de validation côté client.

---

## ✅ POINTS FORTS

- **Architecture propre** : séparation Server/Client Components respectée
- **TypeScript partout** : typage correct des API et composants
- **Prisma bien utilisé** : modélisation DB cohérente
- **Design system unifié** : Tailwind config propre, couleurs et ombres cohérents
- **Pas de tokens exposés** : `.gitignore` correct, pas de secrets dans le code source
- **Seed complet** : 6 articles, 4 témoignages, données réelles
- **Middleware next-auth** : protection des routes admin
- **VideoPlayer** : composant riche avec contrôles complets
- **Blog admin** : CRUD complet avec upload d'images et éditeur structuré
- **SEO** : metadata par page, Open Graph configuré

---

## 📊 RÉSUMÉ

| Gravité | Nombre | Thèmes |
|---------|--------|--------|
| 🔴 Critique | 3 | API sans auth, upload non sécurisé, middleware bypass |
| 🟠 Majeur | 7 | Validation, filtrage, données exposées, pagination |
| 🟡 Mineur | 10 | UX (loading, erreurs, a11y), liens vides, pages manquantes |

**Note globale :** 7/10 — Bonne base technique, mais les API routes sont le maillon faible. Les corrections critiques prennent ~30 minutes à implémenter.

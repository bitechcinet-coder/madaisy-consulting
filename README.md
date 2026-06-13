# Madaisy Consulting Agency

Site web dynamique Next.js avec base de données Prisma et interface d'administration.

## Installation

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Accès Admin
- URL : `/admin/login`
- Email : `admin@madaisy-consulting.com`
- Mot de passe : `admin123`

## Déploiement Vercel
N'oubliez pas de changer `DATABASE_URL` pour PostgreSQL en production.
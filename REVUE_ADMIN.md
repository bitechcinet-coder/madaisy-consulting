# 🔍 Revue Admin — UX/UI, Sécurité, Fonctionnel

## 🔴 CRITIQUE

### 1. Login — Credentials en clair visibles
**Fichier:** `admin/login/page.tsx:29-31`
```tsx
<div className="mt-6 p-4 bg-blue-50 rounded text-sm text-blue-700">
  <strong>Démo :</strong> admin@madaisy-consulting.com / admin123
</div>
```
❌ En production, les identifiants sont affichés publiquement.
✅ **Correction:** Masquer si `NODE_ENV === 'production'`

### 2. Login — Pas de rate limiting
❌ Aucune protection contre le brute-force. 1000 tentatives = 1000 appels DB.
✅ Ajouter `rate-limiting` ou au minimum un délai après 5 échecs.

### 3. Dashboard — Stats faussées par la pagination
**Fichier:** `admin/dashboard/page.tsx:10-12`
```tsx
fetch('/api/contacts')  // retourne 20 résultats max maintenant
```
❌ Depuis l'ajout de la pagination, les API ne retournent plus tous les résultats.
✅ Utiliser `fetch('/api/contacts?take=1000')` ou créer un endpoint `/api/stats`.

---

## 🟠 MAJEUR

### 4. Sidebar — Non responsive
**Fichier:** `admin/layout.tsx`
❌ Le sidebar de 256px est fixe. Sur mobile, il prend tout l'écran.
✅ Ajouter un toggle hamburger + overlay mobile.

### 5. Logo admin — Mauvais fichier
```tsx
<Image src="/logo.webp" alt="Madaisy" ... />
```
❌ Le site utilise `/logo-icon.png` dans le header public.
✅ Remplacer par `/logo-icon.png` pour la cohérence.

### 6. Blog — Pas de preview avant publication
❌ Aucun moyen de voir le rendu final avant de publier.
✅ Ajouter un bouton "Prévisualiser" qui ouvre `/blog/[slug]` dans un nouvel onglet.

### 7. Blog — Éditeur texte brut
❌ Le contenu est saisi en texte brut dans des `<textarea>`.
✅ Solution légère : markdown. Solution pro : intégrer TipTap ou similaire.

### 8. Blog — Modal trop complexe
❌ 70vh de scroll avec introduction, sections multiples, conclusion, upload.
✅ Simplifier : onglets (Métadonnées / Contenu / Média).

### 9. Témoignages — Pas de photos
❌ Les témoignages n'ont pas de champ photo (avatar).
✅ Ajouter un upload d'avatar.

---

## 🟡 MINEUR

### 10. Contacts — Pas de filtre lu/non lu
### 11. Contacts — Pas de "Tout marquer comme lu"
### 12. Dashboard — Pas de graphique/évolution
### 13. Blog — Pas de tri par colonne
### 14. Témoignages — Pas de recherche
### 15. Admin — Pas de breadcrumbs
### 16. Admin — Pas de notification toast après action
### 17. Blog — Slug non validé (doublons silencieux jusqu'à l'erreur DB)
### 18. Login — Pas d'état "loading" pendant la connexion
### 19. Pages admin — Non fonctionnel (cards décoratives)
### 20. Admin — Pas de lien "Retour au site" dans le header

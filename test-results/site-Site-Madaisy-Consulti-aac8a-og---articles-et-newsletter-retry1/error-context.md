# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> Site Madaisy Consulting >> Page blog - articles et newsletter
- Location: tests\site.spec.ts:47:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/blog", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE = 'http://localhost:3000';
  4   | 
  5   | test.describe('Site Madaisy Consulting', () => {
  6   | 
  7   |   test('Page accueil - titre et sections clés', async ({ page }) => {
  8   |     await page.goto(BASE);
  9   |     await expect(page).toHaveTitle(/Madaisy Consulting/);
  10  |     await expect(page.locator('h1')).toContainText('Étudiez en France avec sérénité');
  11  |     await expect(page.getByText('100%')).toBeVisible();
  12  |     await expect(page.getByText('Taux de réussite')).toBeVisible();
  13  |     await expect(page.getByText('Éthique')).toBeVisible();
  14  |     await expect(page.getByText('Excellence')).toBeVisible();
  15  |     await expect(page.getByText('Engagement')).toBeVisible();
  16  |     await expect(page.getByText('Un accompagnement de A à Z')).toBeVisible();
  17  |   });
  18  | 
  19  |   test('Page qui-sommes-nous - photo fondatrice', async ({ page }) => {
  20  |     await page.goto(`${BASE}/qui-sommes-nous`);
  21  |     await expect(page).toHaveTitle(/Qui sommes-nous/);
  22  |     await expect(page.locator('h1')).toContainText('Une agence à taille humaine');
  23  |     await expect(page.getByText('Marie-Désirée TANOH').first()).toBeVisible();
  24  |     await expect(page.getByText('Fondatrice & Experte').first()).toBeVisible();
  25  |     const imgs = page.locator('img[alt*="Marie-Désirée"]');
  26  |     await expect(imgs.first()).toBeVisible();
  27  |   });
  28  | 
  29  |   test('Page services - 3 étapes', async ({ page }) => {
  30  |     await page.goto(`${BASE}/services`);
  31  |     await expect(page).toHaveTitle(/Services/);
  32  |     await expect(page.locator('h1')).toContainText('Nos Services');
  33  |     await expect(page.getByText('Orientation stratégique')).toBeVisible();
  34  |     await expect(page.getByText('Recherche et Admission')).toBeVisible();
  35  |     await expect(page.getByText("Accompagnement à l'installation")).toBeVisible();
  36  |   });
  37  | 
  38  |   test('Page témoignages - stats et citations', async ({ page }) => {
  39  |     await page.goto(`${BASE}/temoignages`);
  40  |     await expect(page).toHaveTitle(/Témoignages/);
  41  |     await expect(page.getByText('Ils nous ont fait confiance')).toBeVisible();
  42  |     await expect(page.getByText('Sarah M.')).toBeVisible();
  43  |     await expect(page.getByText('Kévin L.')).toBeVisible();
  44  |     await expect(page.getByText('Amélie R.')).toBeVisible();
  45  |   });
  46  | 
  47  |   test('Page blog - articles et newsletter', async ({ page }) => {
> 48  |     await page.goto(`${BASE}/blog`);
      |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  49  |     await expect(page).toHaveTitle(/Blog/);
  50  |     await expect(page.getByText('Le Blog Officiel')).toBeVisible();
  51  |     // Vérifie qu'il y a des articles (fallback ou DB)
  52  |     await expect(page.locator('article').first()).toBeVisible({ timeout: 10000 });
  53  |   });
  54  | 
  55  |   test('Page contact - formulaire et infos', async ({ page }) => {
  56  |     await page.goto(`${BASE}/contact`);
  57  |     await expect(page).toHaveTitle(/Contact/);
  58  |     await expect(page.getByRole('heading', { name: 'Contactez-nous' })).toBeVisible();
  59  |     await expect(page.locator('#name')).toBeVisible();
  60  |     await expect(page.locator('#email')).toBeVisible();
  61  |     await expect(page.locator('#subject')).toBeVisible();
  62  |     await expect(page.locator('#message')).toBeVisible();
  63  |     await expect(page.getByText('+225 05 64 48 92 75').first()).toBeVisible();
  64  |   });
  65  | 
  66  |   test('Page login admin accessible', async ({ page }) => {
  67  |     await page.goto(`${BASE}/admin/login`);
  68  |     await expect(page.getByText('Administration Madaisy')).toBeVisible();
  69  |     await expect(page.locator('input[type="email"]')).toBeVisible();
  70  |     await expect(page.locator('input[type="password"]')).toBeVisible();
  71  |     await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
  72  |   });
  73  | 
  74  |   test('Connexion admin et dashboard', async ({ page }) => {
  75  |     await page.goto(`${BASE}/admin/login`);
  76  |     await page.fill('input[type="email"]', 'admin@madaisy-consulting.com');
  77  |     await page.fill('input[type="password"]', 'admin123');
  78  |     await page.getByRole('button', { name: 'Se connecter' }).click();
  79  |     await page.waitForURL('**/admin/dashboard', { timeout: 10000 });
  80  |     await expect(page.getByRole('heading', { name: 'Tableau de bord' })).toBeVisible();
  81  |     await expect(page.getByText('Madaisy Admin')).toBeVisible();
  82  |   });
  83  | 
  84  |   test('Admin blog - création et suppression d\'article', async ({ page }) => {
  85  |     // Login
  86  |     await page.goto(`${BASE}/admin/login`);
  87  |     await page.fill('input[type="email"]', 'admin@madaisy-consulting.com');
  88  |     await page.fill('input[type="password"]', 'admin123');
  89  |     await page.getByRole('button', { name: 'Se connecter' }).click();
  90  |     await page.waitForURL('**/admin/dashboard', { timeout: 10000 });
  91  | 
  92  |     // Aller au blog via sidebar
  93  |     await page.click('a[href="/admin/blog"]');
  94  |     await page.waitForURL('**/admin/blog', { timeout: 5000 });
  95  | 
  96  |     // Ouvrir le formulaire de création
  97  |     await page.getByText('Nouvel article').click();
  98  |     await page.waitForTimeout(500);
  99  | 
  100 |     // Remplir le formulaire
  101 |     const slug = 'test-playwright-' + Date.now();
  102 |     await page.fill('input[name="title"]', 'Test Playwright - Article de test');
  103 |     await page.fill('input[name="slug"]', slug);
  104 |     await page.locator('textarea[name="excerpt"]').fill('Ceci est un article créé automatiquement par les tests Playwright.');
  105 |     await page.selectOption('select[name="category"]', 'Guide');
  106 |     await page.fill('input[name="author"]', 'Test Bot');
  107 |     await page.check('input[name="published"]');
  108 | 
  109 |     // Sauvegarder
  110 |     await page.getByRole('button', { name: "Créer l'article" }).click();
  111 |     await page.waitForTimeout(1000);
  112 | 
  113 |     // Vérifier que l'article apparaît
  114 |     await expect(page.getByText('Test Playwright - Article de test')).toBeVisible({ timeout: 5000 });
  115 | 
  116 |     // Supprimer l'article de test
  117 |     page.on('dialog', dialog => dialog.accept());
  118 |     const row = page.locator('tr', { hasText: 'Test Playwright - Article de test' });
  119 |     await row.locator('button[title="Supprimer"]').click();
  120 |     await page.waitForTimeout(800);
  121 | 
  122 |     // Vérifier que l'article a disparu
  123 |     await expect(page.getByText('Test Playwright - Article de test')).not.toBeVisible({ timeout: 3000 });
  124 |   });
  125 | 
  126 |   test('Navigation mobile - menu burger', async ({ page }) => {
  127 |     await page.setViewportSize({ width: 375, height: 812 });
  128 |     await page.goto(BASE);
  129 |     await expect(page.locator('button[aria-label="Menu"]')).toBeVisible();
  130 |     await page.locator('button[aria-label="Menu"]').click();
  131 |     await page.waitForTimeout(300);
  132 |     await expect(page.getByText('Qui sommes-nous ?').last()).toBeVisible();
  133 |     await expect(page.getByText('Blog').last()).toBeVisible();
  134 |   });
  135 | 
  136 |   test('Responsive - toutes les pages en mobile', async ({ page }) => {
  137 |     await page.setViewportSize({ width: 375, height: 812 });
  138 |     const pages = ['/', '/qui-sommes-nous', '/services', '/temoignages', '/blog', '/contact'];
  139 |     for (const path of pages) {
  140 |       const res = await page.goto(`${BASE}${path}`);
  141 |       expect(res?.status()).toBe(200);
  142 |       await expect(page.locator('header')).toBeVisible();
  143 |       await expect(page.locator('footer')).toBeVisible();
  144 |     }
  145 |   });
  146 | 
  147 |   test('Logo présent dans le header', async ({ page }) => {
  148 |     await page.goto(BASE);
```
import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, server: { middlewareMode: true } });
after(() => server.close());
const { products } = await server.ssrLoadModule('/src/data/menu.ts');
const { selectionLine, whatsappOrder } = await server.ssrLoadModule('/src/data/contact.ts');
const catalog = JSON.parse(readFileSync('src/data/uber.json', 'utf8'));
const references = JSON.parse(readFileSync('src/data/restaurant-prices.json', 'utf8'));
const bySlug = slug => products.find(p => p.slug === slug);
const photoPrices = {
  'picanha-acompanhamentos-bebida': '9,00',
  'grelhada-r5-acompanhamentos-bebida': '10,00',
  'salsicha-toscana-acompanhamentos-bebida': '7,00',
  'bife-de-frango-acompanhamentos-bebida': '8,00',
  'entremeada-acompanhamentos-bebida': '7,50',
  'secreto-acompanhamentos-bebida': '9,00',
  'picanha-gold-acompanhamentos-bebida': '13,00',
  'maminha-ao-alho-acompanhamentos-bebida': '8,00',
  'salada-mista': '8,00',
  'maminha-acompanhamentos-bebida': '8,00',
  'picanha-ao-alho-acompanhamentos-bebida': '9,00',
  'doce-da-casa': '2,00',
  'serra-dura': '2,00',
  'gelatina': '2,00',
  'agua-sem-gas-33cl': '1,00',
};

test('preserves the exact Uber snapshot and all 57 existing products', () => {
  assert.equal(createHash('sha256').update(readFileSync('src/data/uber.json')).digest('hex'), 'a67f97895559e5640cf92a24ec83e9aa8ac3fe126cea27326877a7e64598abd4');
  assert.equal(catalog.length, 55);
  assert.equal(products.length, 57);
  assert.equal(new Set(products.map(p => p.slug)).size, 57);
  assert.equal(new Set(products.map(p => p.name)).size, 57);
  for (const original of catalog) {
    const current = bySlug(original.slug);
    for (const field of ['name', 'category', 'image', 'imageKind', 'imageNote', 'url']) {
      assert.equal(current[field], original[field], `${original.slug}: ${field}`);
    }
  }
});

test('applies only the 15 clear matches in the photo provided on 22 October', () => {
  assert.equal(products.filter(p => p.priceDate === '22/10/2026').length, 15);
  for (const [slug, price] of Object.entries(photoPrices)) {
    const p = bySlug(slug);
    assert.equal(p.price, price, slug);
    assert.equal(p.priceKind, 'restaurant', slug);
    assert.equal(p.priceDate, '22/10/2026', slug);
    assert.equal(p.restaurantPriceImage, '');
    assert.match(p.restaurantPriceSource, /fornecido e conferido em 22\/10\/2026; data de vigência não indicada/);
    assert.doesNotMatch(p.description + p.restaurantMenuNote, /café/);
  }
});

test('keeps steak with sauce distinct from the earlier grilled steak reference', () => {
  const p = bySlug('bife-da-vazia-acompanhamentos-bebida');
  assert.equal(p.price, '10,50');
  assert.equal(p.priceDate, '21/10/2026');
  assert.equal(p.restaurantPriceImage, '/images/ementa.jpeg');
  assert.equal(bySlug('bife-de-frango-acompanhamentos-bebida').price, '8,00');
});

test('does not infer bottle/can volumes, beer menus, bacon skewers or specific fish', () => {
  for (const original of catalog.filter(p => !references.some(r => r.slug === p.slug))) {
    const p = bySlug(original.slug);
    assert.equal(p.priceKind, 'uber', p.slug);
    assert.equal(p.price, original.price, p.slug);
    assert.equal(p.priceDate, '21/10/2026', p.slug);
    assert.equal(p.description, original.description, p.slug);
  }
  assert.equal(bySlug('peixe-do-dia').price, '');
  assert.equal(bySlug('peixe-do-dia').priceKind, 'unknown');
  assert.equal(products.filter(p => p.priceKind === 'restaurant').length, 16);
  assert.equal(products.filter(p => p.priceKind === 'uber').length, 40);
});

test('desserts and standalone water do not inherit meal inclusions', () => {
  for (const slug of ['doce-da-casa', 'serra-dura', 'gelatina', 'agua-sem-gas-33cl']) {
    const p = bySlug(slug);
    assert.equal(p.restaurantMenuNote, '');
    assert.doesNotMatch(p.description, /bebida em copo|café|acompanhamentos|Menu com/i);
  }
});

test('every restaurant reference has an exact existing name and source without publishing the private photo', () => {
  for (const reference of references) {
    const p = bySlug(reference.slug);
    assert.equal(reference.name, p.name, reference.slug);
    assert.ok(reference.source && reference.date && reference.description);
    if (reference.referenceImage) assert.ok(existsSync(`public${reference.referenceImage}`));
  }
});

test('the new private price-sheet image and links are not published', () => {
  assert.equal(existsSync('public/images/precario-2026-10-22.png'), false);
  for (const path of ['src/pages/index.astro', 'src/pages/fontes.astro']) {
    assert.ok(!readFileSync(path, 'utf8').includes('/images/precario-2026-10-22.png'));
  }
});

test('selection and WhatsApp drafts use the same prices and origins as every product', () => {
  for (const p of products) {
    const line = selectionLine(p.name, 2);
    assert.ok(line.startsWith(`2 × ${p.name} (`));
    if (p.priceKind === 'restaurant') {
      assert.ok(line.includes(`referência restaurante: ${p.price} € por unidade`), p.slug);
      assert.ok(!line.includes('referência Uber Eats'), p.slug);
    } else if (p.priceKind === 'uber') {
      assert.ok(line.includes(`referência Uber Eats: ${p.price} € por unidade; preço direto a confirmar`), p.slug);
    } else {
      assert.ok(line.includes('preço sob consulta'), p.slug);
    }
    const url = new URL(whatsappOrder([[p.name, 2]]));
    assert.equal(url.origin + url.pathname, 'https://wa.me/351968299852');
    assert.ok(url.searchParams.get('text').includes(line));
    assert.ok(url.searchParams.get('text').includes('Podem confirmar o preço'));
  }
});

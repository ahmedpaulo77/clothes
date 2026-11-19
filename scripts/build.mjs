import './check-node.mjs';
import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Set this before importing Vite: the desktop terminal can inherit development mode.
process.env.NODE_ENV = 'production';
const { build } = await import('vite');
await build({ mode: 'production' });

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const entry = join(outputDirectory, 'index.html');
const routes = [
  'shop',
  'about',
  'contact',
  'cart',
  'product/everyday-tee',
  'product/monochrome-edit',
  'product/everyday-hoodie',
  'product/denim-layer',
  'product/relaxed-trouser',
  'product/everyday-overshirt',
];

// GitHub Pages needs an HTML entry for direct visits to each client-side route.
for (const route of routes) {
  const directory = join(outputDirectory, route);
  await mkdir(directory, { recursive: true });
  await copyFile(entry, join(directory, 'index.html'));
}
await copyFile(entry, join(outputDirectory, '404.html'));

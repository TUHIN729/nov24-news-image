// nov24-news-image — program for make.fun news-image-20261124 (program/v1).
// Writes the front-page image held in this repository to the output directory
// as /output/entry.png (or $MAKEFUN_OUTPUT_DIR/entry.png outside the grader).
// Node 22, standard library only, no network. The output directory is never
// removed, only created if missing; the copy is byte-for-byte, so two runs
// always produce identical bytes.
//
// Run it:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(join(here, 'entry.png'));
if (bytes.length < 8 || bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) {
  throw new Error('entry.png is not a PNG file');
}
writeFileSync(target, bytes);
console.log(`wrote ${target} (${bytes.length} bytes)`);

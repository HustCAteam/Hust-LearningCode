import { readJSON } from './lib.mjs';
import { validateRelease } from './materials.mjs';

const materials = readJSON('data/materials.json').filter(material => material.storage === 'release');
let failed = false;
for (const material of materials) {
  try {
    validateRelease(material);
    const response = await fetch(material.url, { method: 'HEAD', signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw Error(`HTTP ${response.status}`);
    const length = response.headers.get('content-length');
    if (length === null || Number(length) !== material.bytes) throw Error(`Content-Length ${length}，登记 ${material.bytes}`);
    console.log(`${material.title}: HTTP ${response.status}, ${length} B`);
  } catch (error) {
    failed = true;
    console.error(`${material.title}: ${error.message}`);
  }
}
if (failed) process.exitCode = 1;
else console.log(`${materials.length} Release asset URLs verified using HEAD.`);

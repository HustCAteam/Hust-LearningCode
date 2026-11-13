import { createReadStream, readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, constants, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { ROOT, readJSON, catalog } from './lib.mjs';
import { containedPath, validateMeta, validateRelease, validateBytes } from './materials.mjs';

const [manifest] = process.argv.slice(2);
if (!manifest) throw Error('用法：node scripts/import-material.mjs inbox/资料说明.json');
const meta = JSON.parse(readFileSync(resolve(manifest), 'utf8'));
const path = validateMeta(meta, catalog());
const input = containedPath(resolve(ROOT, 'inbox'), meta.input);
const materials = readJSON('data/materials.json');
const bytes = statSync(input).size;
const hash = createHash('sha256');
for await (const chunk of createReadStream(input)) hash.update(chunk);
const sha256 = hash.digest('hex');
if (materials.some(material => material.sha256 === sha256)) throw Error('已有同内容资料，可在原记录中补充贡献者');
const { input: unused, localPath: unusedLocal, ...publicMeta } = meta;
const record = { ...publicMeta, path, bytes, sha256, source: '学码群群文件' };
if (meta.storage === 'release') {
  validateRelease(record);
} else {
  validateBytes(readFileSync(input), materials.filter(material => material.storage !== 'release').reduce((sum, material) => sum + material.bytes, 0));
}
const target = containedPath(ROOT, meta.storage === 'release' ? `archive/${path}` : path);
if (existsSync(target)) throw Error('该资料路径已有文件，请调整版本字段');
mkdirSync(dirname(target), { recursive: true });
copyFileSync(input, target, constants.COPYFILE_EXCL);
writeFileSync(resolve(ROOT, 'data/materials.json'), JSON.stringify([...materials, record], null, 2) + '\n');
const intake = readJSON('data/group-intake.json');
const candidate = intake.files.find(material => material.sourceFolder === meta.sourceFolder && material.originalName === meta.originalName);
if (candidate) {
  Object.assign(candidate, { status: 'archived', materialPaths: [...new Set([...(candidate.materialPaths ?? []), path])] });
  if (meta.originalSha256) candidate.originalSha256 = meta.originalSha256;
  writeFileSync(resolve(ROOT, 'data/group-intake.json'), JSON.stringify(intake, null, 2) + '\n');
}
console.log(`已归档 ${path} (${bytes} B)，贡献者：${meta.contributor}`);

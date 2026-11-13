import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, constants } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { ROOT, readJSON, catalog } from './lib.mjs';
import { containedPath, validateMeta, validateBytes, sha256 } from './materials.mjs';
const [manifest] = process.argv.slice(2);
if (!manifest) throw Error('用法：node scripts/import-material.mjs inbox/资料说明.json');
const meta=JSON.parse(readFileSync(resolve(manifest),'utf8'));
const courses=catalog();
const path=validateMeta(meta,courses);
const input=containedPath(resolve(ROOT,'inbox'),meta.input);
const bytes=readFileSync(input);
const materials=readJSON('data/materials.json');
validateBytes(bytes,materials.reduce((n,m)=>n+m.bytes,0));
const hash=sha256(bytes);
const same=materials.find(m=>m.sha256===hash);
if (same) throw Error(`已有同内容资料：${same.path}；可在原记录中补充贡献者`);
const target=containedPath(ROOT,path);
if (existsSync(target)) throw Error('该资料路径已有文件，请调整版本字段');
const {input:unused,...publicMeta}=meta;
const record={...publicMeta,path,bytes:bytes.length,sha256:hash,source:'学码群群文件'};
mkdirSync(dirname(target),{recursive:true});
copyFileSync(input,target,constants.COPYFILE_EXCL);
try { writeFileSync(resolve(ROOT,'data/materials.json'),JSON.stringify([...materials,record],null,2)+'\n'); }
catch(e) { console.error(`文件已复制到 ${path}，请将资料记录补入 data/materials.json`); throw e; }
const intake=readJSON('data/group-intake.json');
const candidate=intake.files.find(m=>m.sourceFolder===meta.sourceFolder && m.originalName===meta.originalName);
if (candidate) {
  Object.assign(candidate,{status:'archived',path,sha256:hash});
  writeFileSync(resolve(ROOT,'data/group-intake.json'),JSON.stringify(intake,null,2)+'\n');
}
console.log(`已归档 ${path} (${bytes.length} B)，贡献者：${meta.contributor}`);

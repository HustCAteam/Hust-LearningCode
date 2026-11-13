import { readFileSync, statSync, existsSync } from 'node:fs';
import { relative, resolve, dirname, extname } from 'node:path';
import { ROOT, files, readJSON, catalog, storageRoots, LIMITS } from './lib.mjs';
import { sha256, validateMeta, containedPath } from './materials.mjs';
const errors=[];
const fail=s=>errors.push(s);
const all=files();
let total=0;
for (const path of all) {const bytes=statSync(path).size;total+=bytes;if(bytes>LIMITS.file)fail(`文件超过 10 MiB：${relative(ROOT,path)}`);}
if(total>LIMITS.total)fail('仓库内容超过 80 MiB');
const courses=catalog(), studies=readJSON('data/selfstudy.json'), materials=readJSON('data/materials.json'), categories=readJSON('data/categories.json');
const unique=(items,key,label)=>{const seen=new Set();for(const x of items){if(seen.has(x[key]))fail(`${label}重复：${x[key]}`);seen.add(x[key]);}};
unique(courses,'id','课程');unique(studies,'path','自学入口');unique(materials,'path','资料路径');unique(materials,'sha256','资料内容');
for(const c of courses){
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.id))fail(`课程标识有误：${c.id}`);
 if(!categories[c.category])fail(`课程分类缺失：${c.id}`);
 if(c.localOnly && (c.upstreamPath !== null || !storageRoots[c.storageDirectory] || c.files.length || c.projects.length))fail(`群内专题字段有误：${c.id}`);
 for(const p of c.selfstudy)if(!studies.some(s=>s.path===p))fail(`自学课程不存在：${p}`);
 for(const f of c.files)if(!f.path.startsWith(c.upstreamPath+'/')||!Number.isFinite(f.bytes)||!/^[a-f0-9]{40}$/.test(f.sha))fail(`上游文件字段有误：${f.path}`);
}
for(const m of materials){try{const expected=validateMeta(m,courses);if(expected!==m.path)throw Error('结构化文件名与记录有差异');const bytes=readFileSync(containedPath(ROOT,m.path));if(bytes.subarray(0,80).toString().startsWith('version https://git-lfs.github.com/spec/v1'))throw Error('资料需要使用普通 Git 文件，请先取得实际内容');if(bytes.length!==m.bytes||sha256(bytes)!==m.sha256)throw Error('容量或校验值与记录有差异');}catch(e){fail(`${m.path}: ${e.message}`);}}
const recorded=new Set(materials.map(m=>m.path));
for(const path of all.filter(p=>extname(p)==='.md'&&!recorded.has(relative(ROOT,p)))){
 const text=readFileSync(path,'utf8').replace(/```[\s\S]*?```/g,'');
 for(const match of text.matchAll(/\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)){
  let href=match[1];if(/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href))continue;
  try { href=decodeURIComponent(href.split(/[?#]/)[0]); } catch { fail(`链接编码有误：${relative(ROOT,path)} → ${href}`); continue; }
  const target=href.startsWith('/')?resolve(ROOT,'docs',href.slice(1)):resolve(dirname(path),href);
  if(!existsSync(target)&&!existsSync(target+'.md')&&!existsSync(resolve(target,'index.md')))fail(`链接未找到：${relative(ROOT,path)} → ${href}`);
 }
}
for(const path of all){const rel=relative(ROOT,path);if(/^\d{3}-|^A-/.test(rel)&&!rel.endsWith('/README.md')&&!recorded.has(rel))fail(`资料尚未登记：${rel}`);}
const intake=readJSON('data/group-intake.json');if(Object.values(intake.folderCounts).reduce((a,b)=>a+b,0)!==intake.observedFileCount)fail('群文件清点数量需要核对');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Checked ${all.length} files, ${(total/1024/1024).toFixed(2)} MiB; ${courses.filter(c=>!c.localOnly).length} upstream courses, ${courses.filter(c=>c.localOnly).length} local topics, ${materials.length} archived group files, local links and metadata OK.`);

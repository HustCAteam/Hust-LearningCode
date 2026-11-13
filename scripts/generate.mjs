import { mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { ROOT, readJSON, catalog, encodePath, mdText, size, storageRoots, storageRoot, materialUrl, syncPublicMaterials } from './lib.mjs';
import { kindLabels, materialId, materialRoute, materialTitle, groupBy } from './catalog.mjs';
import { learningPlan } from './plans.mjs';
import { catalogViews } from './catalog-views.mjs';

const courses = catalog(), materials = readJSON('data/materials.json'), studies = readJSON('data/selfstudy.json');
const categories = readJSON('data/categories.json'), sources = readJSON('data/sources.json'), editorial = readJSON('data/editorial.json');
const upstream = `https://github.com/${sources.hust.repository}`, content = 'docs/content/docs';
const groupCourses = courses.filter(c => materials.some(m => m.course === c.id));
const books = materials.filter(m => m.kind === 'book');
const sections = readJSON('data/library-sections.json');
const sectionCourses = section => section.topics.map(id => groupCourses.find(c => c.id === id)).filter(Boolean);
const write = (path, text) => { mkdirSync(dirname(join(ROOT,path)),{recursive:true});writeFileSync(join(ROOT,path),text); };
const link = (from, to, title) => `[${mdText(title)}](${encodePath(relative(dirname(join(ROOT,from)),join(ROOT,to)).split(sep).join('/'))})`;
const pagePath = route => `${content}/${route}.md`;
const front = (title, description = '', extra = {}) => `---\n${Object.entries({title,description,...extra}).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n')}\n---\n\n`;
const table = (headers,rows) => `| ${headers.join(' | ')} |\n| ${headers.map(()=>'---').join(' | ')} |\n${rows.map(r=>`| ${r.join(' | ')} |`).join('\n')}\n\n`;
const title = c => editorial[c.id]?.title || c.title;
const listTable = (list, path) => table(['资料','形式','分享者'],list.map(m=>[link(path,pagePath(materialRoute(m)),materialTitle(m)),`${kindLabels[m.kind]} · ${m.path.split('.').pop().toUpperCase()}`,mdText(m.contributor || '群友分享')]));
const kinds = ['book','slides','notes','lab','exercise','source','talk','guide'];
for(const dir of ['group','books','supplement','formats'])rmSync(join(ROOT,content,dir),{recursive:true,force:true});

// One address per file. The binary metadata and release URLs remain unchanged.
for(const m of materials){
 const path=pagePath(materialRoute(m)), course=groupCourses.find(c=>c.id===m.course);
 const download=materialUrl(m,path), format=m.path.split('.').pop().toUpperCase();
 let text=front(materialTitle(m),m.description,{navHidden:true,materialId:materialId(m),source:'学码群',authors:[m.author,m.contributor || '群友分享'].filter(Boolean)});
 text+=`${mdText(m.description)}\n\n`;
 text+=`## 阅读与下载\n\n[打开 ${format} · ${size(m.bytes)}](${download})\n\n`;
 if(m.storage!=='release' && format==='PDF')text+='这份 PDF 可在浏览器中直接阅读，也可以保存到本地。\n\n';
 if(m.storage==='release')text+=`文件下载后可用${format==='PDF'?' PDF 阅读器':format==='EPUB'?' EPUB 阅读器':'对应的本地工具'}打开。\n\n`;
 if(m.kind==='source'&&m.storage!=='release')text+=`### 程序内容\n\n\`\`\`cpp\n${readFileSync(join(ROOT,m.path),'utf8').trim()}\n\`\`\`\n\n`;
 text+='## 关于这份资料\n\n';
 const details=[['所属主题',link(path,pagePath(`group/${m.course}`),title(course))],['资料类型',kindLabels[m.kind]],['文件格式',format],['文件大小',size(m.bytes)]];
 if(m.author)details.push(['作者',mdText(m.author)]);
 details.push(['群文件上传者',mdText(m.contributor || '群友分享')]);
 if(m.uploadedAt)details.push(['群内分享时间',m.uploadedAt]);
 if(m.sourceFolder)details.push(['群文件目录',mdText(m.sourceFolder)]);
 details.push(['原始文件名',mdText(m.originalName)]);
 text+=table(['信息','内容'],details);
 text+=`感谢${m.contributor?` ${mdText(m.contributor)} `:'群友'}把这份资料带到学码群${m.contributors?.length?`，也感谢 ${m.contributors.map(mdText).join('、')} 参与整理`:''}。\n\n`;
 if(m.readingGuide)text+=link(path,m.readingGuide,'配套阅读与调试手记')+'\n\n';
 text+=`## 继续阅读\n\n${link(path,pagePath(`group/${m.course}`),`返回${title(course)}目录`)} · ${link(path,`${content}/guide/contributing.md`,'补充资料与署名')}\n`;
 write(path,text);
}

const groupIndex=`${content}/group/index.md`;
let overview=front('学码群资料目录','按主题浏览群友分享的教材、讲义、试题与源程序。');
overview+=`这里汇集了 **${materials.length} 份群资料**，分在 **${groupCourses.length} 个主题**下。每个主题先介绍收录内容，再按书籍、讲义、笔记、实验和代码展开；点开资料名称，可以查看具体介绍、上传者与文件入口。\n\n`;
overview+=`${link(groupIndex,`${content}/books/index.md`,'浏览书架')} · ${link(groupIndex,`${content}/formats/index.md`,'按资料形式查找')} · ${link(groupIndex,`${content}/guide/start.md`,'第一次来，从这里开始')}\n\n`;
for(const section of sections){
 const label=section.label, items=sectionCourses(section);if(!items.length)continue;
 overview+=`## ${label}\n\n`+table(['主题','内容','资料'],items.map(c=>[link(groupIndex,pagePath(`group/${c.id}`),title(c)),mdText(c.focus),`${materials.filter(m=>m.course===c.id).length} 份`]));
}
const online=readJSON('data/group-intake.json').files.filter(m=>m.status==='linked');
if(online.length){overview+='## 群友分享的在线读物\n\n';for(const url of new Set(online.map(m=>m.url))){const shares=online.filter(m=>m.url===url);overview+=`### ${mdText(shares[0].originalName.replace(/\.[^.]+$/,''))}\n\n${mdText(shares[0].description)}\n\n[打开原文](${url}) · 分享者：${[...new Set(shares.map(m=>m.contributor))].map(mdText).join('、')}\n\n`;}}
write(groupIndex,overview);
write(`${content}/index.md`,front('学码群 · 共同的计算机书架')+`从群友分享的一份教材、一页笔记或一个程序开始，找到自己感兴趣的方向。\n\n${link(`${content}/index.md`,groupIndex,'进入资料目录')}\n`);

for(const c of groupCourses){
 const path=pagePath(`group/${c.id}`), local=materials.filter(m=>m.course===c.id), ed=editorial[c.id];
 let text=front(title(c),ed?.intro || c.focus)+(ed?.intro || c.focus)+'\n\n';
 if(ed?.reading)text+='## 怎么开始读\n\n'+ed.reading+'\n\n';
 const practicePath=pagePath(`group/${c.id}/practice`);
 const practice=learningPlan(c).replaceAll('本页','主题目录中的').replace(/\/Hust-LearningCode\/([^\)#]+)\/(?=[\)#])/g,(_,route)=>encodePath(relative(dirname(join(ROOT,practicePath)),join(ROOT,pagePath(route))).split(sep).join('/')));
 write(practicePath,front(`${title(c)} · 动手练习`,'配合群资料完成一个具体的小实验，观察结果，再尝试修改。',{navHidden:true})+link(practicePath,path,`配套资料：${title(c)}`)+'\n\n'+practice+'\n'+link(practicePath,path,'返回主题目录')+'\n');
 text+=link(path,practicePath,'配套动手练习：步骤、预期结果与排查提示')+'\n\n';
 text+=`本主题收录 ${local.length} 份资料。\n\n`;
 for(const kind of kinds){const selected=local.filter(m=>m.kind===kind);if(selected.length)text+=`## ${kindLabels[kind]}\n\n`+listTable(selected,path);}
 const people=[...new Set(local.map(m=>m.contributor).filter(Boolean))];
 text+='## 谢谢分享\n\n'+(people.length?people.map(mdText).join('、')+' 等群友在群里留下了这些材料。':'感谢在群里分享这些材料的同学。')+'作者与上传者的署名保留在每份资料中，也欢迎继续补上自己的笔记和阅读经验。\n\n';
 if(c.id==='cpp')text+=link(path,`${content}/guide/cpp-debugging.md`,'配套：C++ 群程序调试手记')+'\n\n';
 if(!c.localOnly&&(c.files.length||c.projects.length))text+='## Hust-opensource-Xuejie 课程补充\n\n'+link(path,pagePath(`supplement/hust/${c.id}`),`Hust-opensource-Xuejie ${c.title}`)+'\n\n';
 text+=link(path,`${content}/guide/contributing.md`,'分享资料与补充介绍')+'\n';write(path,text);
}

let bookPage=front('群友的共同书架',`${books.length} 本群友分享的计算机书籍，按主题分类。`)+`群友分享的 **${books.length} 本书**，从编程入门、数学到系统与硬件。选择一个主题进入书目，点击书名可查看作者、版本和内容介绍。\n\n`;
const bookPath=`${content}/books/index.md`;
for(const section of sections){
 const label=section.label, items=sectionCourses(section).filter(c=>books.some(m=>m.course===c.id));if(!items.length)continue;
 bookPage+=`## ${label}\n\n`+table(['书架','收录','从这里读起'],items.map(c=>[link(bookPath,`${content}/books/${c.id}.md`,title(c)),`${books.filter(m=>m.course===c.id).length} 本`,mdText(books.find(m=>m.course===c.id).title)]));
}
write(bookPath,bookPage);
for(const c of groupCourses){const list=books.filter(m=>m.course===c.id);if(!list.length)continue;const path=`${content}/books/${c.id}.md`;let text=front(`${title(c)} · 书架`,editorial[c.id]?.intro || c.focus)+(editorial[c.id]?.reading || c.focus)+'\n\n';for(const m of list)text+=`## ${link(path,pagePath(materialRoute(m)),materialTitle(m))}\n\n${mdText(m.description)}\n\n${m.author?`作者：${mdText(m.author)} · `:''}分享者：${mdText(m.contributor || '群友分享')}\n\n`;text+=link(path,pagePath(`group/${c.id}`),'查看这个主题的全部资料')+'\n';write(path,text);}
let formats=front('按资料形式查找','从书籍、讲义、试题、代码或分享进入资料库。');
for(const kind of kinds){const list=materials.filter(m=>m.kind===kind);if(!list.length)continue;const path=`${content}/formats/${kind}.md`;formats+=`- ${link(`${content}/formats/index.md`,path,kindLabels[kind])} · ${list.length} 份\n`;let text=front(kindLabels[kind],`学码群分享的${kindLabels[kind]}，按主题排列。`);for(const c of groupCourses){const selected=list.filter(m=>m.course===c.id);if(selected.length)text+=`## ${title(c)}\n\n`+listTable(selected,path);}write(path,text);}
write(`${content}/formats/index.md`,formats);

const extIndex=`${content}/supplement/hust/index.md`;
let external=front('Hust-opensource-Xuejie 华科课程补充','按课程查找 Hust-opensource-Xuejie 贡献者整理的讲义、试题与实践项目。');
external+=`[Hust-opensource-Xuejie](${upstream}) 由 Sukuna 与项目贡献者整理，提供华科课程讲义、往年试题与实验项目。这里按课程建立入口，具体文件保留原项目链接。感谢他们持续积累和分享这些资料。\n\n`;
for(const [cat,label] of Object.entries(categories)){const list=courses.filter(c=>!c.localOnly&&c.category===cat);if(!list.length)continue;external+=`## Hust-opensource-Xuejie ${label}\n\n`+table(['课程','讲义与文件','实践项目'],list.map(c=>[link(extIndex,pagePath(`supplement/hust/${c.id}`),`Hust-opensource-Xuejie ${c.title}`),String(c.files.length),String(c.projects.length)]));}
write(extIndex,external);
for(const c of courses.filter(c=>!c.localOnly)){
 const path=pagePath(`supplement/hust/${c.id}`);
 let text=front(`Hust-opensource-Xuejie ${c.title}`,c.focus,{source:'Hust-opensource-Xuejie'});
 text+=`${mdText(c.focus)}。\n\n来源：[Hust-opensource-Xuejie ${mdText(c.upstreamPath)}](${upstream}/tree/${sources.hust.ref}/${encodePath(c.upstreamPath)})。感谢原项目贡献者整理这些课程材料。\n\n`;
 const byDir=groupBy(c.files,f=>dirname(f.path.slice(c.upstreamPath.length+1)));
 for(const [dir,list] of Object.entries(byDir))text+=`## Hust-opensource-Xuejie ${dir==='.'?'课程文件':mdText(dir)}\n\n`+table(['资料','大小'],list.map(f=>[`[Hust-opensource-Xuejie ${mdText(f.path.split('/').pop())}](${upstream}/blob/${sources.hust.ref}/${encodePath(f.path)})`,size(f.bytes)]));
 if(c.projects.length)text+='## Hust-opensource-Xuejie 实践项目\n\n'+c.projects.map(p=>`- [Hust-opensource-Xuejie ${mdText(p.path.slice(c.upstreamPath.length+1))}](${p.url})`).join('\n')+'\n\n';
 if(c.selfstudy.length)text+='## CSdiy 延伸课程\n\n'+c.selfstudy.map(p=>{const s=studies.find(s=>s.path===p);return `- [CSdiy ${mdText(s.title)}](${s.url})`;}).join('\n')+'\n\n';
 if(groupCourses.some(g=>g.id===c.id))text+=link(path,pagePath(`group/${c.id}`),'回到学码群专题')+'\n';
 write(path,text);
}
let csdiy=front('CSdiy 自学课程补充','按方向查找 CS 自学指南中的课程。')+'[CS 自学指南](https://csdiy.wiki/) 汇集公开课程与学习经验，感谢 PKUFlyingPig 和指南贡献者的整理。按方向进入，再选择一门课程了解内容与作业安排。\n\n';
const studyCats=[...new Set(studies.map(s=>s.category))];
for(const [i,cat] of studyCats.entries()){const path=`${content}/supplement/csdiy/subject-${i+1}.md`;csdiy+=`- ${link(`${content}/supplement/csdiy/index.md`,path,`CSdiy ${cat}`)}\n`;write(path,front(`CSdiy ${cat}`,`CS 自学指南中的${cat}课程。`)+`来源：[CS 自学指南](https://csdiy.wiki/)。\n\n`+studies.filter(s=>s.category===cat).map(s=>`- [CSdiy ${mdText(s.title)}](${s.url})`).join('\n')+'\n');}
write(`${content}/supplement/csdiy/index.md`,csdiy);
write(`${content}/supplement/index.md`,front('延伸阅读','华科课程资料与公开课，作为学码群资料的延伸。')+`学码群的每个主题都可以继续向外读。这里保留两个由同学们共同整理的学习项目，按课程与方向查找。\n\n- ${link(`${content}/supplement/index.md`,extIndex,'Hust-opensource-Xuejie 华科课程补充')}：讲义、往年题和课程实验。\n- ${link(`${content}/supplement/index.md`,`${content}/supplement/csdiy/index.md`,'CSdiy 自学课程补充')}：公开课程、实验与学习经验。\n`);

// Compact repository entry points; the file introductions live on individual pages.
for(const [directory,description] of Object.entries(storageRoots)){
 const path=`${directory}/README.md`, local=materials.filter(m=>m.path.startsWith(directory+'/'));
 let text=`# ${directory.replace(/^\w+-/,'')}\n\n${description}。\n\n`;
 if(local.length){text+='## 学码群资料\n\n'+table(['主题','资料数','内容'],groupCourses.filter(c=>local.some(m=>m.course===c.id)).map(c=>[link(path,pagePath(`group/${c.id}`),title(c)),String(local.filter(m=>m.course===c.id).length),mdText(c.focus)]));}
 else text+=link(path,groupIndex,'浏览学码群资料目录')+'\n\n';
 const extra=courses.filter(c=>!c.localOnly&&storageRoot(c)===directory);if(extra.length)text+='## Hust-opensource-Xuejie 课程补充\n\n'+extra.map(c=>'- '+link(path,pagePath(`supplement/hust/${c.id}`),`Hust-opensource-Xuejie ${c.title}`)).join('\n')+'\n\n';
 text+=link(path,'CONTRIBUTING.md','分享笔记、代码与阅读经验')+'\n';write(path,text);
}

const creditsPath=`${content}/guide/credits.md`, people=groupBy(materials,m=>m.contributor||'群友分享');
let credits=front('让资料留下来的人','感谢学码群里每一次具体的分享。');
credits+='一份讲义、一段代码、一本读过的书，从群文件里被下一位同学找到，学习就这样接续下去。感谢每一位把材料带到学码群的人，也感谢写下这些内容的作者、老师与整理者。\n\n这里保留大家分享时的署名。每份资料页同时展示原作者与群文件上传者；如果希望补上名字、个人主页或一段阅读心得，欢迎直接告诉我们。\n\n';
credits+='## 群友的分享\n\n';
for(const [name,list] of Object.entries(people).sort((a,b)=>b[1].length-a[1].length)){
 credits+=`### ${mdText(name)}\n\n分享了 ${list.length} 份资料，涉及${[...new Set(list.map(m=>title(groupCourses.find(c=>c.id===m.course))))].map(mdText).join('、')}。\n\n`;
 credits+=list.slice(0,3).map(m=>'- '+link(creditsPath,pagePath(materialRoute(m)),materialTitle(m))).join('\n')+'\n\n';
}
credits+='## 一起把书架补齐\n\n欢迎上传自己的笔记、讲义和项目，也欢迎给已有材料补一句真正有用的介绍：你在哪门课用过它、哪一章帮过你、哪道题值得重做。我们会把你的署名随材料一起留下。\n\n'+link(creditsPath,`${content}/guide/contributing.md`,'参与分享')+'\n\n';
credits+='## 延伸阅读与站点\n\n'+`- [Hust-opensource-Xuejie 华科课程资料](${upstream})：感谢 Sukuna 与项目贡献者。\n- [CSdiy CS 自学指南](https://csdiy.wiki/)：感谢 PKUFlyingPig 与指南贡献者。\n- [CelestialDocs](https://github.com/HYP3R00T/CelestialDocs)：感谢 HYP3R00T 与主题贡献者提供的导航、搜索与阅读组件。\n`;
write(creditsPath,credits);

const entry=(slug,label)=>({slug,label});
const nav={docs:{defaultTab:{label:'群资料',icon:'document'},groups:[
 entry('group','资料总览'),entry('books','群友书架'),entry('formats','按形式查找'),
 ...sections.map(section=>({id:`group-${section.id}`,label:section.label,autoGenerated:false,entries:sectionCourses(section).map(c=>entry(`group/${c.id}`,title(c)))})),
 {id:'guide',label:'阅读与分享',tab:true,icon:'document',autoGenerated:false,entries:[entry('guide/start','从这里开始'),entry('guide/tools','动手工具'),entry('guide/cpp-debugging','C++ 调试手记'),entry('guide/roadmap','四周练习'),entry('guide/curriculum','华科培养方案'),entry('guide/contributing','一起补充'),entry('guide/credits','贡献与致谢')]},
 {id:'supplement',label:'延伸阅读',tab:true,icon:'document',autoGenerated:false,entries:[entry('supplement','延伸阅读'),entry('supplement/hust','Hust-opensource-Xuejie 课程总览'),entry('supplement/csdiy','CSdiy 课程总览')],groups:Object.entries(categories).map(([cat,label])=>({id:`hust-${cat}`,label:`Hust-opensource-Xuejie ${label}`,autoGenerated:false,entries:courses.filter(c=>!c.localOnly&&c.category===cat).map(c=>entry(`supplement/hust/${c.id}`,`Hust-opensource-Xuejie ${c.title}`))}))}
]}};
write('data/navigation.json',JSON.stringify(nav,null,2)+'\n');
write('data/site-catalog.json',JSON.stringify({counts:{materials:materials.length,books:books.length,topics:groupCourses.length,contributors:Object.keys(people).length},categories:sections.map(section=>({id:section.id,label:section.label,topics:sectionCourses(section).map(c=>({id:c.id,title:title(c),description:c.focus,count:materials.filter(m=>m.course===c.id).length}))})).filter(c=>c.topics.length),materials:materials.map(m=>({id:materialId(m),route:materialRoute(m),title:materialTitle(m),description:m.description,course:m.course,kind:m.kind,contributor:m.contributor||'群友分享'}))},null,2)+'\n');
syncPublicMaterials(ROOT,materials);
write('data/catalog-views.json',JSON.stringify(catalogViews(),null,2)+'\n');
console.log(`Generated ${materials.length} individual material pages, ${books.length} books, ${groupCourses.length} topics.`);

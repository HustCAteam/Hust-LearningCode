import { dirname } from 'node:path';
import { readJSON, catalog, encodePath, size } from './lib.mjs';
import { kindLabels, materialRoute, materialTitle, groupBy } from './catalog.mjs';

// Presentation data comes from the same catalog as the repository's Markdown pages.
export function catalogViews() {
  const materials = readJSON('data/materials.json'), courses = catalog(), studies = readJSON('data/selfstudy.json');
  const editorial = readJSON('data/editorial.json'), sections = readJSON('data/library-sections.json'), categories = readJSON('data/categories.json');
  const source = readJSON('data/sources.json').hust, upstream = `https://github.com/${source.repository}`;
  const topics = courses.filter(c => materials.some(m => m.course === c.id)), books = materials.filter(m => m.kind === 'book');
  const title = c => editorial[c.id]?.title || c.title;
  const href = route => `/Hust-LearningCode/${route}/`;
  const card = (title, route, description, icon = 'folder', eyebrow) => ({ title, href: href(route), description, icon, eyebrow });
  const materialCard = m => ({ ...card(materialTitle(m), materialRoute(m), m.description, m.kind, `${kindLabels[m.kind]} · ${m.path.split('.').pop().toUpperCase()}`), meta: [m.author ? `作者：${m.author}` : null, `分享者：${m.contributor || '群友分享'}`].filter(Boolean) });
  const topicCard = c => card(title(c), `group/${c.id}`, editorial[c.id]?.intro || c.focus, 'course', `${materials.filter(m => m.course === c.id).length} 份资料`);
  const views = {};
  const view = (route, intro, blocks, note) => { views[route] = { intro, sections: blocks, ...(note ? { note } : {}) }; };
  const grid = (id, title, cards, description) => ({ id, title, cards, ...(description ? { description } : {}) });
  const formatDescriptions = {
    book: '按主题翻阅教材与计算机读物，查看内容、版本和分享者。',
    slides: '跟随课件梳理知识，按原系列顺序阅读课程讲义。',
    notes: '从群友的复习记录和解题笔记中找到具体思路。',
    lab: '对照实验内容动手，记录输入、过程与观察到的结果。',
    exercise: '查找往年试题、模拟题和参考答案，先练习再对照。',
    source: '下载群友的原始程序，从编译、运行和调试开始。',
    talk: '阅读技术报告、论文与项目分享，继续探索感兴趣的方向。',
    guide: '查阅标准、实验板说明、课程要求与社群介绍。',
  };
  view('formats', ['按正在做的事情选择一种资料。每个入口都按学习主题继续分组，资料页保留介绍、作者与上传者。'], [grid('formats', undefined, Object.entries(kindLabels).map(([kind, label]) => card(label, `formats/${kind}`, formatDescriptions[kind], kind, `${materials.filter(m => m.kind === kind).length} 份`)))]);
  for (const [kind, label] of Object.entries(kindLabels)) {
    view(`formats/${kind}`, [formatDescriptions[kind]], topics.flatMap(c => {
      const selected = materials.filter(m => m.kind === kind && m.course === c.id);
      return selected.length ? [grid(c.id, title(c), selected.map(materialCard))] : [];
    }));
  }

  const groupBlocks = [grid('browse', '选择一个入口', [
    card('群友的共同书架', 'books', `${books.length} 本书，按主题查看内容与版本。`, 'library'),
    card('按资料形式查找', 'formats', '直接寻找讲义、试题、笔记或源程序。', 'document'),
  ])];
  for (const s of sections) groupBlocks.push(grid(s.id, s.label, s.topics.map(id => topics.find(c => c.id === id)).filter(Boolean).map(topicCard)));
  const online = readJSON('data/group-intake.json').files.filter(m => m.status === 'linked');
  groupBlocks.push(grid('online', '群友分享的在线读物', Object.values(groupBy(online, m => m.url)).map(shares => ({
    title: shares[0].originalName.replace(/\.[^.]+$/, ''), href: shares[0].url, description: shares[0].description, icon: 'book', meta: [`分享者：${[...new Set(shares.map(m => m.contributor))].join('、')}`],
  }))));
  view('group', [`${materials.length} 份群资料，分在 ${topics.length} 个学习主题下。选择一个方向，先了解收录内容与阅读建议，再进入具体资料。`], groupBlocks);

  for (const c of topics) {
    const local = materials.filter(m => m.course === c.id), ed = editorial[c.id];
    const blocks = [grid('reading', '怎么开始读', [card('配套动手练习', `group/${c.id}/practice`, '跟随具体步骤运行小实验，再对照预期结果和排查提示。', 'lab')], ed?.reading)];
    for (const [kind, label] of Object.entries(kindLabels)) {
      const selected = local.filter(m => m.kind === kind);
      if (selected.length) blocks.push(grid(kind, label, selected.map(materialCard)));
    }
    const more = [card('分享资料与补充介绍', 'guide/contributing', '把阅读心得、学习记录和自己的署名一起留下。', 'people')];
    if (c.id === 'cpp') more.unshift(card('C++ 群程序调试手记', 'guide/cpp-debugging', '逐个检查数组、排序与猜数程序，使用固定输入核对结果。', 'source'));
    if (!c.localOnly && (c.files.length || c.projects.length)) more.push(card(`Hust-opensource-Xuejie ${c.title}`, `supplement/hust/${c.id}`, '继续查找原项目贡献者整理的课程材料。', 'course'));
    blocks.push(grid('more', '继续阅读与分享', more));
    const names = [...new Set(local.map(m => m.contributor).filter(Boolean))];
    view(`group/${c.id}`, [ed?.intro || c.focus, `本主题收录 ${local.length} 份资料。`], blocks, `谢谢 ${names.join('、')} 等群友留下这些材料。每份资料都保留作者与上传者的署名，也欢迎补充自己的阅读经验。`);
  }

  view('books', [`群友分享的 ${books.length} 本书，从编程入门、数学到系统与硬件。选择一个主题，再从书的内容介绍中找到想读的章节。`], sections.flatMap(s => {
    const selected = s.topics.map(id => topics.find(c => c.id === id)).filter(c => c && books.some(m => m.course === c.id));
    return selected.length ? [grid(s.id, s.label, selected.map(c => card(title(c), `books/${c.id}`, editorial[c.id]?.reading || c.focus, 'library', `${books.filter(m => m.course === c.id).length} 本`)))] : [];
  }));
  for (const c of topics) {
    const selected = books.filter(m => m.course === c.id);
    if (selected.length) view(`books/${c.id}`, [editorial[c.id]?.reading || c.focus], [grid('books', undefined, selected.map(materialCard)), grid('related', '继续探索', [topicCard(c)])]);
  }

  const extensions = [
    card('Hust-opensource-Xuejie 华科课程补充', 'supplement/hust', '查找华科课程讲义、往年试题与实验项目。感谢 Sukuna 和项目贡献者持续整理。', 'course', `${courses.filter(c => !c.localOnly).length} 门课程`),
    card('CSdiy 自学课程补充', 'supplement/csdiy', '按学习方向寻找公开课程与实验。感谢 PKUFlyingPig 和指南贡献者积累的学习经验。', 'network', `${studies.length} 个入口`),
  ];
  view('supplement', ['从学码群正在读的一份资料出发，继续探索课程、实验与公开读物。'], [grid('sources', undefined, extensions)]);
  view('supplement/hust', ['Hust-opensource-Xuejie 由 Sukuna 与项目贡献者整理。这里按课程建立入口，保留讲义、往年题和实践项目的原始链接。感谢每一位参与整理和分享的同学。'], Object.entries(categories).flatMap(([cat, label]) => {
    const selected = courses.filter(c => !c.localOnly && c.category === cat);
    return selected.length ? [grid(cat, `Hust-opensource-Xuejie ${label}`, selected.map(c => card(`Hust-opensource-Xuejie ${c.title}`, `supplement/hust/${c.id}`, c.focus, 'course', `${c.files.length} 份文件 · ${c.projects.length} 个项目`)))] : [];
  }));
  for (const c of courses.filter(c => !c.localOnly)) {
    const blocks = [];
    for (const [i, [dir, files]] of Object.entries(groupBy(c.files, f => dirname(f.path.slice(c.upstreamPath.length + 1)))).entries()) {
      blocks.push(grid(`files-${i}`, `Hust-opensource-Xuejie ${dir === '.' ? '课程文件' : dir}`, files.map(f => ({ title: `Hust-opensource-Xuejie ${f.path.split('/').pop()}`, href: `${upstream}/blob/${source.ref}/${encodePath(f.path)}`, icon: 'document', eyebrow: size(f.bytes) }))));
    }
    if (c.projects.length) blocks.push(grid('projects', 'Hust-opensource-Xuejie 实践项目', c.projects.map(p => ({ title: `Hust-opensource-Xuejie ${p.path.slice(c.upstreamPath.length + 1)}`, href: p.url, icon: 'source', eyebrow: '项目仓库' }))));
    if (c.selfstudy.length) blocks.push(grid('courses', 'CSdiy 延伸课程', c.selfstudy.map(path => studies.find(s => s.path === path)).map(s => ({ title: `CSdiy ${s.title}`, href: s.url, icon: 'course', eyebrow: s.category }))));
    blocks.push(grid('source', '来源与相关主题', [{ title: `Hust-opensource-Xuejie ${c.title}原目录`, href: `${upstream}/tree/${source.ref}/${encodePath(c.upstreamPath)}`, description: '感谢原项目贡献者整理这些课程材料。', icon: 'folder' }, ...(topics.some(t => t.id === c.id) ? [topicCard(c)] : [])]));
    view(`supplement/hust/${c.id}`, [c.focus], blocks);
  }
  const studyCats = [...new Set(studies.map(s => s.category))];
  view('supplement/csdiy', ['CS 自学指南汇集公开课程与学习经验。按方向进入，再选择一门课程了解内容与作业安排；感谢 PKUFlyingPig 和指南贡献者的整理。'], [grid('subjects', undefined, studyCats.map((cat, i) => card(`CSdiy ${cat}`, `supplement/csdiy/subject-${i + 1}`, studies.filter(s => s.category === cat).slice(0, 3).map(s => s.title).join(' · '), 'course', `${studies.filter(s => s.category === cat).length} 个入口`)))]);
  for (const [i, cat] of studyCats.entries()) view(`supplement/csdiy/subject-${i + 1}`, [`CS 自学指南中的${cat}内容。打开课程卡片，可以继续阅读原站的介绍、学习经验与实验安排。`], [grid('courses', undefined, studies.filter(s => s.category === cat).map(s => ({ title: `CSdiy ${s.title}`, href: s.url, icon: 'course', eyebrow: cat })))]);

  const people = Object.entries(groupBy(materials, m => m.contributor || '群友分享')).sort((a, b) => b[1].length - a[1].length);
  view('guide/credits', ['一份讲义、一段代码、一本读过的书，从群文件里被下一位同学找到，学习就这样接续下去。感谢每一位把材料带到学码群的人，也感谢写下这些内容的作者、老师与整理者。', '这里保留大家分享时的署名。欢迎补上名字、个人主页或一段阅读心得，我们会把这些贡献随材料一起留下。'], [
    grid('people', '群友的分享', people.map(([name, list]) => ({ title: name, eyebrow: `分享了 ${list.length} 份资料`, icon: 'people', description: [...new Set(list.map(m => title(topics.find(c => c.id === m.course))))].join(' · '), links: list.slice(0, 3).map(m => ({ label: materialTitle(m), href: href(materialRoute(m)) })) }))),
    grid('join', '一起把书架补齐', [card('留下你的收获', 'guide/contributing', '欢迎分享笔记、讲义和项目，也欢迎讲讲哪一章帮过你、哪道题值得重做。', 'notes')]),
    grid('thanks', '延伸阅读与站点', [...extensions, { title: 'CelestialDocs', href: 'https://github.com/HYP3R00T/CelestialDocs', description: '感谢 HYP3R00T 与主题贡献者提供的导航、搜索和阅读组件。', icon: 'source' }]),
  ]);

  view('guide/curriculum', ['按入学年级和专业打开学院的培养方案，查找课程名称、学分与先修关系，再选择相应教材与练习。'], [
    grid('years', '按入学年级查找', [[2026, 6346], [2025, 5608], [2024, 4512], [2023, 3376]].map(([year, id]) => ({ title: `${year} 年培养方案`, href: `https://cs.hust.edu.cn/info/1076/${id}.htm`, description: '查看学院发布的培养方案与课程安排。', icon: 'course', eyebrow: '华中科技大学计算机学院' }))),
    { id: 'path', title: '从培养方案到一次练习', layout: 'path', cards: [
      { title: '找到自己的课程安排', description: '在对应年级的方案中，确认课程开设学期和先修要求。' },
      card('打开相应主题', 'group/operating-systems', '例如准备学习操作系统时，先看看群友分享的教材与例题。'),
      card('完成一个小实验', 'group/operating-systems/practice', '运行银行家算法安全性检查，再改变资源数量观察结果。'),
    ] },
  ]);
  view('guide/start', ['学码群的资料从一次次具体的分享积累而来。你可以带着正在学的课程来找材料，也可以先翻翻书架，看哪一本让你想继续读。'], [
    { id: 'path', title: '从找到资料到动手实践', layout: 'path', cards: [
      card('选择一个学习主题', 'group', '从课程、兴趣或眼前的问题出发，读一读主题介绍与阅读建议。'),
      card('找到一份合适的材料', 'formats', '选择书籍、讲义、试题或代码，打开详情查看内容、作者、分享者和文件入口。'),
      card('运行、记录，再分享', 'guide/tools', '用 GCC、GDB、HTTP 或 SQLite 小实验观察结果，留下自己的发现。'),
    ] },
    grid('books', '选一本书', [card('C 语言书架', 'books/c', '从入门教材开始，再走向指针与语言细节。', 'book'), card('系统书架', 'books/computer-systems', '连接程序执行与 Linux 使用。', 'book'), card('算法书架', 'books/algorithms', '图解入门、算法分析与竞赛读物。', 'book'), card('共同书架', 'books', '查看所有主题的书籍、版本与内容介绍。', 'library')]),
    grid('practice', '带着问题动手', [card('C++ 群程序与调试', 'guide/cpp-debugging', '用固定输入检查数组、排序和猜数程序，逐个理解问题。', 'source'), card('四周练习安排', 'guide/roadmap', '从循环与调试出发，逐步走到网络、数据库与操作系统。', 'lab')], '复习时可以先做试卷，再查看答案；单片机讲义按 01—10 的原系列顺序阅读。搜索支持书名、主题与分享者，Ctrl / ⌘ + K 可以快速打开。'),
    grid('share', '留下一点自己的收获', [card('分享资料与阅读经验', 'guide/contributing', '补一段读后体会、课堂使用经验，或分享自己的笔记与项目。我们会把你的署名和贡献一起留下。', 'people')]),
  ]);
  view('guide/contributing', ['欢迎分享教材、课堂笔记、实验代码、讲座和解题思路。作者、上传者与整理者分别署名，也欢迎填写希望展示的名字和个人主页。'], [
    grid('actions', '参与整理', [
      { title: '分享一份资料', href: 'https://github.com/HustCAteam/Hust-LearningCode/issues/new?template=resource.yml', description: '填写标题、课程、作者、上传者与分享时间，附上文件或原始下载地址。', icon: 'document' },
      { title: '修正文档与署名', href: 'https://github.com/HustCAteam/Hust-LearningCode/issues/new?template=correction.yml', description: '附上具体页面、需要修改的句子和建议内容；代码问题可以附编译命令与触发输入。', icon: 'notes' },
    ]),
    grid('example', '一份资料可以这样介绍', [{ title: '循环程序设计：三种边界输入', eyebrow: '分享示例 · C 语言', icon: 'source', description: '输入 0、1、5，分别输出 0、1、15，用于练习 for 循环的上下界。', meta: ['文件：loops.c', '作者与上传者：你的署名'] }]),
    grid('community', '继续参与', [card('看看群友的分享', 'guide/credits', '每一次具体的贡献，都让资料库多一份可以接着读的内容。', 'people'), { title: '在 GitHub 提交修改', href: 'https://github.com/HustCAteam/Hust-LearningCode/pulls', description: '提交笔记、修订介绍和整理文件，也可以参与已有修改的讨论。', icon: 'source' }]),
  ]);
  return views;
}

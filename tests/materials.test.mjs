import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, symlinkSync, rmSync, copyFileSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { validateMeta, validateRelease, validateBytes, containedPath, sha256 } from '../scripts/materials.mjs';
const courses=[{id:'operating-systems',category:'systems'}];
const base={title:'同步笔记',originalName:'笔记.pdf',course:'operating-systems',kind:'notes',topic:'进程同步',version:'2024',contributor:'同学',sourceFolder:'/',uploadedAt:'2024-11-01',description:'同步机制的例题与推导'};
test('导入保留课程、类型、主题与版本',()=>assert.equal(validateMeta(base,courses),'006-操作系统/operating-systems/notes/operating-systems__notes__进程同步__2024.pdf'));
test('Office 阅读版使用 PDF 扩展名并保留原文件名，源码保持原格式',()=>{assert.equal(validateMeta({...base,originalName:'中断.ppt',archiveExtension:'.pdf'},courses),'006-操作系统/operating-systems/notes/operating-systems__notes__进程同步__2024.pdf');assert.throws(()=>validateMeta({...base,originalName:'示例.cpp',archiveExtension:'.pdf'},courses));assert.throws(()=>validateMeta({...base,originalName:'讲义.docx',archiveExtension:'.exe'},courses));});
test('导入识别路径、类型、日期错误',()=>{for(const change of [{topic:'../../escape'},{kind:'exe'},{originalName:'a.exe'},{uploadedAt:'2024-02-30'},{course:'missing'}])assert.throws(()=>validateMeta({...base,...change},courses));});
test('容量与可执行内容检查',()=>{assert.throws(()=>validateBytes(Buffer.alloc(0)));assert.throws(()=>validateBytes(Buffer.alloc(10*1024*1024+1)));assert.throws(()=>validateBytes(Buffer.from('MZfake')));assert.throws(()=>validateBytes(Buffer.from('abc'),80*1024*1024));assert.equal(sha256(Buffer.from('abc')),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');});
test('目标路径保持在目录内，并检查符号链接',()=>{const root=mkdtempSync(join(tmpdir(),'learningcode-test-'));try{mkdirSync(join(root,'inbox'));assert.throws(()=>containedPath(root,'../escape'));symlinkSync(tmpdir(),join(root,'link'));assert.throws(()=>containedPath(root,'link/escape'));assert.equal(containedPath(root,'inbox/a.pdf'),join(root,'inbox/a.pdf'));}finally{rmSync(root,{recursive:true,force:true});}});
test('Release 书籍只需真实链接和完整元数据，容量不受 Git 文件限制', () => {
  const book = { ...base, kind: 'book', storage: 'release', releaseTag: 'group-library', bytes: 512 * 1024 * 1024, sha256: 'a'.repeat(64), url: 'https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/os__book__text.pdf' };
  assert.ok(validateMeta(book, courses).includes('/book/'));
  assert.doesNotThrow(() => validateRelease(book));
  for (const change of [{ bytes: 0 }, { sha256: 'bad' }, { url: 'https://example.com/book.pdf' }, { releaseTag: 'other' }, { url: book.url + '?fake=1' }]) assert.throws(() => validateRelease({ ...book, ...change }));
});
test('ZIP、RAR、7z 成员保留真实容器来源并使用实际扩展名', () => {
  const selected = { ...base, originalSha256: 'b'.repeat(64), archiveExtension: '.pdf', archiveMember: '历年试题/2024试卷.pdf' };
  for (const originalName of ['教材.pdf.zip', '历年试题2024.rar', '资料.7z']) {
    assert.ok(validateMeta({ ...selected, originalName }, courses).endsWith('.pdf'));
  }
  const source = { ...selected, kind: 'source', originalName: '两个问题.zip', archiveExtension: '.cpp', archiveMember: '两个问题/snake.cpp' };
  assert.ok(validateMeta(source, courses).endsWith('.cpp'));
  for (const change of [{ archiveMember: undefined }, { archiveMember: '../snake.cpp' }, { archiveMember: '/snake.cpp' }, { archiveMember: 'C:/snake.cpp' }, { archiveMember: 'source\\snake.cpp' }, { archiveMember: 'a//snake.cpp' }, { archiveMember: 'setup.exe' }, { archiveMember: 'snake.pdf' }, { originalSha256: '' }, { archiveExtension: '.exe' }]) assert.throws(() => validateMeta({ ...source, ...change }, courses));
});
test('多文件源码 ZIP 保留必需资源与成员清单，不接收任意压缩包', () => {
  const project = { ...base, kind: 'source', originalName: '代码及运行截图及问题描述.7z', originalSha256: 'c'.repeat(64), archiveExtension: '.zip', archiveMembers: ['项目/main.cpp', '项目/image/雷.png', '项目/问题.docx', '项目/README.md'], sourceArchiveMembers: ['项目/main.cpp', '项目/image/雷.png', '项目/问题.docx', '项目/Debug/game.exe'] };
  assert.ok(validateMeta(project, courses).endsWith('.zip'));
  for (const change of [{ kind: 'book' }, { archiveMember: '项目/main.cpp' }, { archiveMembers: undefined }, { archiveMembers: [] }, { archiveMembers: ['说明.txt'] }, { archiveMembers: ['main.cpp', '../雷.png'] }, { archiveMembers: ['main.cpp', 'game.exe'] }, { archiveMembers: ['main.cpp', 'main.obj'] }, { archiveMembers: ['main.cpp', 'main.cpp'] }, { sourceArchiveMembers: ['../main.cpp'] }]) assert.throws(() => validateMeta({ ...project, ...change }, courses));
  assert.throws(() => validateMeta({ ...base, originalName: 'installer.zip' }, courses));
});
test('同一群压缩包的多次成员导入累计 materialPaths，成员摘要留在资料记录', () => {
  const root = mkdtempSync(join(tmpdir(), 'learningcode-intake-'));
  const originalSha256 = sha256(Buffer.from('source archive fixture'));
  try {
    for (const directory of ['scripts', 'data', 'inbox']) mkdirSync(join(root, directory));
    for (const name of ['lib.mjs', 'materials.mjs', 'import-material.mjs']) copyFileSync(new URL(`../scripts/${name}`, import.meta.url), join(root, 'scripts', name));
    writeFileSync(join(root, 'data/courses.json'), JSON.stringify(courses));
    writeFileSync(join(root, 'data/materials.json'), '[]');
    writeFileSync(join(root, 'data/group-intake.json'), JSON.stringify({ files: [{ sourceFolder: '/', originalName: '问题.zip', status: 'pending' }] }));
    for (const [index, member] of ['first.cpp', 'second.cpp'].entries()) {
      writeFileSync(join(root, 'inbox', member), `int answer${index}() { return ${index}; }\n`);
      const manifest = { ...base, originalName: '问题.zip', kind: 'source', topic: `例子${index}`, input: member, archiveMember: member, archiveExtension: '.cpp', originalSha256 };
      const path = join(root, 'inbox', `${index}.json`);
      writeFileSync(path, JSON.stringify(manifest));
      execFileSync(process.execPath, [join(root, 'scripts/import-material.mjs'), path], { cwd: root });
    }
    const records = JSON.parse(readFileSync(join(root, 'data/materials.json'), 'utf8'));
    const item = JSON.parse(readFileSync(join(root, 'data/group-intake.json'), 'utf8')).files[0];
    assert.deepEqual(item.materialPaths, records.map(record => record.path));
    assert.equal(item.originalSha256, originalSha256);
    assert.equal(item.status, 'archived');
    assert.ok(!('path' in item) && !('sha256' in item));
    assert.notEqual(records[0].sha256, records[1].sha256);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
test('EPUB 书籍保留原始电子书格式', () => {
  assert.equal(validateMeta({ ...base, kind: 'book', originalName: '修订版.epub', version: '修订版' }, courses), '006-操作系统/operating-systems/book/operating-systems__book__进程同步__修订版.epub');
});
test('仅实际图标署名允许没有文字昵称，普通贡献者仍需署名', () => {
  assert.doesNotThrow(() => validateMeta({ ...base, contributor: '', contributorNameType: 'icon-only' }, courses));
  assert.throws(() => validateMeta({ ...base, contributor: '' }, courses));
  assert.throws(() => validateMeta({ ...base, contributor: ' ', contributorNameType: 'icon-only' }, courses));
});

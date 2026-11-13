import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, readJSON, mdText, materialUrl } from '../scripts/lib.mjs';
import { materialId, materialRoute, materialTitle } from '../scripts/catalog.mjs';

const materials = readJSON('data/materials.json');
const content = 'docs/content/docs';
const read = p => readFileSync(join(ROOT, p), 'utf8');

test('每份群资料有唯一详情页，下载地址与作者、上传者信息完整保留', () => {
  assert.equal(new Set(materials.map(materialId)).size, materials.length);
  for (const m of materials) {
    const path = `${content}/${materialRoute(m)}.md`, text = read(path);
    assert.ok(text.includes(JSON.stringify(materialTitle(m))), m.title);
    assert.ok(text.includes(materialUrl(m, path)), `download: ${m.title}`);
    assert.ok(text.includes(mdText(m.originalName)), `original: ${m.title}`);
    assert.ok(text.includes(mdText(m.contributor || '群友分享')), `uploader: ${m.title}`);
    if (m.author) assert.ok(text.includes(mdText(m.author)), `author: ${m.title}`);
    const topic = read(`${content}/group/${m.course}.md`);
    assert.ok(topic.includes(`${m.sha256.slice(0, 12)}.md`), `topic entry: ${m.title}`);
  }
});

test('书架先按主题索引，每本书进入相应书架与详情页', () => {
  const index = read(`${content}/books/index.md`);
  assert.ok(!index.includes('releases/download/'));
  for (const m of materials.filter(m => m.kind === 'book')) {
    assert.ok(index.includes(`${m.course}.md`));
    const shelf = read(`${content}/books/${m.course}.md`);
    assert.ok(shelf.includes(`${m.sha256.slice(0, 12)}.md`));
  }
});

test('Xuejie 课程标题和文件入口带来源标签', () => {
  for (const course of readJSON('data/courses.json')) {
    const text = read(`${content}/supplement/hust/${course.id}.md`);
    assert.ok(text.includes('title: "Hust-opensource-Xuejie '));
    for (const line of text.split('\n').filter(line => line.includes('/blob/') || line.includes('/tree/'))) {
      assert.ok(line.includes('[Hust-opensource-Xuejie '), line);
    }
  }
});

test('原始资料元数据与校验值不受页面生成影响', () => {
  for (const m of materials) {
    assert.match(m.sha256, /^[a-f0-9]{64}$/);
    if (m.storage !== 'release') assert.ok(existsSync(join(ROOT, m.path)));
  }
  const index = readJSON('data/site-catalog.json');
  assert.equal(index.counts.materials, materials.length);
  assert.equal(index.counts.topics, new Set(materials.map(m => m.course)).size);
  assert.equal(index.materials.length, materials.length);
});

test('目录中的所有配置入口都对应实际生成页面', () => {
  function walk(nodes) {
    for (const item of nodes) {
      if (item.slug) {
        assert.ok(existsSync(join(ROOT, content, `${item.slug}.md`)) || existsSync(join(ROOT, content, item.slug, 'index.md')), item.slug);
      } else {
        if (item.entries) walk(item.entries);
        if (item.groups) walk(item.groups);
      }
    }
  }
  walk(readJSON('data/navigation.json').docs.groups);
});

test('可视化目录的卡片入口、章节标识和资料署名完整', () => {
  const views = readJSON('data/catalog-views.json');
  const base = '/Hust-LearningCode/';
  for (const [route, view] of Object.entries(views)) {
    assert.ok(existsSync(join(ROOT, content, `${route}.md`)) || existsSync(join(ROOT, content, route, 'index.md')), route);
    assert.equal(new Set(view.sections.map(s => s.id)).size, view.sections.length, route);
    for (const section of view.sections) for (const card of section.cards) {
      assert.ok(card.title);
      for (const href of [card.href, ...(card.links ?? []).map(l => l.href)].filter(Boolean)) {
        if (!href.startsWith(base)) continue;
        const slug = href.slice(base.length).replace(/\/$/, '');
        assert.ok(existsSync(join(ROOT, content, `${slug}.md`)) || existsSync(join(ROOT, content, slug, 'index.md')), href);
      }
    }
  }
  for (const m of materials) {
    const entry = views[`group/${m.course}`].sections.flatMap(s => s.cards).find(c => c.href === `${base}${materialRoute(m)}/`);
    assert.equal(entry?.title, materialTitle(m));
    assert.ok(entry.meta.includes(`分享者：${m.contributor || '群友分享'}`));
  }
  assert.equal(views.formats.sections[0].cards.length, Object.keys(readJSON('data/materials.json').reduce((k, m) => ({ ...k, [m.kind]: true }), {})).length);
});

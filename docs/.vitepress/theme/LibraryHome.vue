<script setup>
import { computed, ref } from 'vue';
import { withBase } from 'vitepress';
import catalog from '../catalog.json';
import stats from '../stats.json';
const query = ref('');
const category = ref('全部');
const categories = ['全部', ...new Set(catalog.map(c => c.categoryTitle))];
const filtered = computed(() => {
  const keywords = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return catalog.filter(c => (category.value === '全部' || c.categoryTitle === category.value)
    && keywords.every(k => `${c.title} ${c.focus} ${c.id} ${c.upstreamPath || ''} ${c.aliases.join(' ')}`.toLowerCase().includes(k)));
});
const href = c => withBase(`/courses/${c.category}/${c.id}.html`);
</script>

<template>
  <div class="library-home">
    <header class="library-hero">
      <div class="hero-copy">
        <p class="eyebrow">HUST LEARNING CODE / 学码群</p>
        <h1>一起学计算机，<br><span>留下一本好手册。</span></h1>
        <p class="hero-description">从一节课、一个实验、一次分享开始。<br>把散落的笔记与经验，放回随时能找到的地方。</p>
        <div class="hero-actions">
          <a class="primary-action" href="#course-finder">找一门课 <span aria-hidden="true">↗</span></a>
          <a :href="withBase('/guide/start.html')">第一次来，先读这里 <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <aside class="reading-note" aria-label="手册导读">
        <span class="note-number">01 / 开卷</span>
        <h2>今天，想弄懂什么？</h2>
        <p>找到一份讲义，写下一个问题，<br>动手试一试，再把收获分享出来。</p>
        <a :href="withBase('/guide/roadmap.html')">看看学习路线 <span aria-hidden="true">↗</span></a>
        <div class="note-bottom">从好奇心出发，慢慢往深处走。</div>
      </aside>
    </header>

    <section class="library-stats" aria-label="资料统计">
      <div><strong>{{ stats.courses }}</strong><span>上游课程目录 · 另有 {{ stats.topics }} 个群内专题</span></div>
      <div><strong>{{ stats.resources }}</strong><span>华科文件入口</span></div>
      <div><strong>{{ stats.selfstudy }}</strong><span>自学课程与工具</span></div>
      <div><strong>{{ stats.materials }}</strong><span>已归档群资料</span></div>
    </section>

    <section class="finder" id="course-finder">
      <div class="section-heading">
        <div><p class="eyebrow">02 / 按课找资料</p><h2>从你正在学的课开始</h2></div>
        <label class="course-search"><span class="sr-only">检索课程名称、英文缩写或学习内容</span><input v-model="query" type="search" placeholder="搜索课程、OS、C++、网络…" autocomplete="off"></label>
      </div>
      <div class="category-filter" aria-label="按主题筛选">
        <button v-for="item in categories" :key="item" @click="category = item" :aria-pressed="category === item" :class="{ active: category === item }">{{ item }}</button>
      </div>
      <p class="result-count" role="status">找到 {{ filtered.length }} 个目录</p>
      <div class="course-grid">
        <a v-for="c in filtered" :key="c.id" :href="href(c)" class="course-entry">
          <span class="course-category">{{ c.categoryTitle }}</span>
          <h3>{{ c.title }} <span aria-hidden="true">↗</span></h3>
          <p>{{ c.focus }}</p>
        </a>
      </div>
      <p v-if="!filtered.length" class="empty-results">换一个关键词试试，或选择“全部”浏览目录。</p>
    </section>

    <section class="contribution-note">
      <p class="eyebrow">03 / 接力</p>
      <h2>你的那份笔记，也值得被看见。</h2>
      <p>一段清楚的解释、一份实验记录、一个好用的链接，都能让后来的人少绕一点路。<br>我们会认真保留资料作者和上传者的署名，让每次分享都有来处。</p>
      <a :href="withBase('/guide/contributing.html')">一起补充这本手册 <span aria-hidden="true">→</span></a>
    </section>
  </div>
</template>

import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, BASE, readJSON, encodePath } from './lib.mjs';

export default function remarkLinks() {
  const content = resolve(ROOT, 'docs/content/docs');
  const materials = new Set(readJSON('data/materials.json').filter(item => item.storage !== 'release').map(item => item.path));
  return (tree, file) => {
    const source = file.path.startsWith('file:') ? fileURLToPath(file.path) : file.path;
    const walk = node => {
      if (node.type === 'link' && node.children?.[0]?.type === 'text') {
        const label = node.children[0].value;
        const source = /^(Hust-opensource-Xuejie|CSdiy)(?:\s+(.+))?$/.exec(label);
        if (source) node.children.splice(0, 1,
          { type: 'sourceBadge', data: { hName: 'span', hProperties: { className: ['source-tag'], title: source[1] } }, children: [{ type: 'text', value: source[1] === 'Hust-opensource-Xuejie' ? 'Xuejie' : source[1] }] },
          ...(source[2] ? [{ type: 'text', value: ` ${source[2]}` }] : []));
      }
      if ((node.type === 'link' || node.type === 'definition') && node.url && !/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(node.url)) {
        const suffixStart = node.url.search(/[?#]/);
        const pathname = suffixStart === -1 ? node.url : node.url.slice(0, suffixStart);
        const suffix = suffixStart === -1 ? '' : node.url.slice(suffixStart);
        const target = resolve(dirname(source), decodeURIComponent(pathname));
        const repositoryPath = relative(ROOT, target).split(sep).join('/');
        if (materials.has(repositoryPath)) {
          node.url = `${BASE}materials/${encodePath(repositoryPath)}${suffix}`;
          if (!/\.pdf$/i.test(repositoryPath)) node.data = { ...node.data, hProperties: { ...node.data?.hProperties, download: '' } };
        } else if (target.startsWith(content + sep) && /\.mdx?$/.test(target)) {
          const slug = relative(content, target).split(sep).join('/').replace(/(?:\/index)?\.mdx?$/, '').replace(/^index$/, '');
          node.url = `${BASE}${slug}${slug ? '/' : ''}${suffix}`;
        }
      }
      for (const child of node.children || []) walk(child);
    };
    walk(tree);
  };
}

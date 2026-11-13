import { dirname, relative, resolve, sep } from 'node:path';
import { ROOT, encodePath } from '../../scripts/lib.mjs';

// Only registered files are downloads. Ordinary documentation links keep VitePress's renderer.
export function materialUrl(href, page, paths, base) {
  if (!page || /^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(href)) return null;
  const [, pathname, suffix] = href.match(/^([^?#]*)(.*)$/s);
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }
  const path = relative(ROOT, resolve(dirname(page), decoded)).split(sep).join('/');
  return paths.has(path) ? `${base}materials/${encodePath(path)}${suffix}` : null;
}

export function materialLinks(md, materials, base) {
  const paths = new Set(materials.map(material => material.path));
  const renderLink = md.renderer.rules.link_open;
  md.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
    const token = tokens[index];
    const href = token.attrGet('href');
    const url = href && materialUrl(href, env.path, paths, base);
    if (!url) return renderLink(tokens, index, options, env, renderer);
    token.attrSet('href', url);
    // Source/Markdown downloads must not turn into .html document routes.
    if (!/\.pdf(?:[?#]|$)/i.test(url)) token.attrSet('download', '');
    return renderer.renderToken(tokens, index, options);
  };
}

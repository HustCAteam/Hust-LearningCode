import { SIDEBAR_NAVIGATION } from '@data/config';
import catalog from '@data/site-catalog.json';
import { resolveSystem } from '../resolveSystem';
import type { GroupOrEntry } from './types';

/** Resolve labels from the same curated navigation used by the CelestialDocs sidebar. */
export function buildBreadcrumbItems(slug: string, collectionId = 'docs'): Array<{label:string;href?:string}> {
  const base = resolveSystem(collectionId).route;
  const labels = new Map<string,string>();
  function visit(nodes: GroupOrEntry[]) {
    for (const node of nodes) {
      if ('slug' in node) { if(node.label) labels.set(node.slug,node.label); }
      else { if(node.entries)visit(node.entries);if(node.groups)visit(node.groups); }
    }
  }
  visit(SIDEBAR_NAVIGATION[collectionId].groups);
  const items: Array<{label:string;href?:string}> = [{label:'首页',href:`${base}/`}];
  const material=catalog.materials.find(m=>m.route===slug);
  if(material){
    items.push({label:'学码群资料',href:`${base}/group/`});
    items.push({label:labels.get(`group/${material.course}`)||material.course,href:`${base}/group/${material.course}/`});
    items.push({label:'资料详情'});
    return items;
  }
  const parts=slug.split('/');
  for(let i=0;i<parts.length;i++){
    const path=parts.slice(0,i+1).join('/');
    const label=labels.get(path)||(parts[i]==='practice'?'动手练习':({guide:'阅读与分享',books:'书架',formats:'资料形式',supplement:'延伸阅读'}[path]));
    if(label)items.push({label,href:i<parts.length-1?`${base}/${path === "guide" ? "guide/start" : path}/`:undefined});
  }
  return items;
}

import type { CollectionKey } from "astro:content";
import { getCollection, render } from "astro:content";
import { CONTENT } from "@data/config";

import type { FrontmatterEntry } from "@/lib/docs/types";

import type { SearchIndex, SearchItem } from "./types";
import catalogViews from '@data/catalog-views.json';
import type { CatalogView } from '../catalog/types';

/**
 * Build the search index by extracting pages and headings from all content collections
 */
export async function buildSearchIndex(): Promise<SearchIndex> {
  const items: SearchItem[] = [];

  for (const sys of CONTENT.systems) {
    try {
      // Get all entries from this collection
      const collectionId = sys.id as CollectionKey;
      const entries = ((await getCollection(collectionId)) as FrontmatterEntry[]).filter(entry => entry.id !== "index" && !entry.data.draft);
      entries.sort((a,b) => Number(a.id.startsWith("supplement")) - Number(b.id.startsWith("supplement")));

      for (const entry of entries) {
        // Add the page itself as a searchable item
        items.push({
          type: "page",
          slug: entry.id,
          title: entry.data.title,
          description: [entry.data.description, ...(entry.data.authors ?? [])].join(" · "),
          collection: sys.id,
          url: `${sys.route}/${entry.id}/`,
        });

        if (entry.id.includes("/files/")) continue;
        // Extract headings from the content
        try {
          const view = (catalogViews as Record<string, CatalogView>)[entry.id];
          const headings = view ? view.sections.filter(s => s.title).map(s => ({depth: 2, slug: s.id, text: s.title!})) : (await render(entry)).headings;

          // Filter to h2-h4 headings (following TOC pattern)
          const filteredHeadings = headings.filter((h) => h.depth >= 2 && h.depth <= 4);

          // Add each heading as a separate searchable item
          for (const heading of filteredHeadings) {
            items.push({
              type: "heading",
              slug: entry.id,
              headingId: heading.slug,
              headingText: heading.text,
              pageTitle: entry.data.title,
              collection: sys.id,
              url: `${sys.route}/${entry.id}/#${heading.slug}`,
              depth: heading.depth,
            });
          }
        } catch (renderError) {
          // Skip heading extraction if rendering fails
          console.warn(`Failed to extract headings from ${sys.id}/${entry.id}:`, renderError);
        }
      }
    } catch (error) {
      console.error(`Failed to build index for collection ${sys.id}:`, error);
    }
  }

  return {
    items,
    timestamp: Date.now(),
  };
}

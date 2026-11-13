"use client";

import Fuse from "fuse.js";
import { FileTextIcon, FilterIcon, HashIcon } from "lucide-react";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Toggle } from "@/components/ui/toggle";
import { fuseOptions } from "@/lib/search/fuseConfig";
import type { SearchIndex, SearchItem } from "@/lib/search/types";
import SourceLabel from '@/components/docs/SourceLabel';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [searchIndex, setSearchIndex] = React.useState<SearchItem[]>([]);
  const [filteredResults, setFilteredResults] = React.useState<SearchItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const fuseRef = React.useRef<Fuse<SearchItem> | null>(null);

  // Filter states (inverted logic: OFF = show all, ON = filter)
  const [filterDocs, setFilterDocs] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState(false);
  const [filterFunnydocs, setFilterFunnydocs] = React.useState(false);
  const [filterPages, setFilterPages] = React.useState(false);
  const [filterHeadings, setFilterHeadings] = React.useState(false);

  // Keyboard shortcut: Cmd/Ctrl + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    // Custom event listener for opening search
    const handleOpenSearch = () => {
      setOpen(true);
    };

    document.addEventListener("keydown", down);
    window.addEventListener("open-search", handleOpenSearch);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, []);

  // Load search index when dialog opens
  React.useEffect(() => {
    if (open && searchIndex.length === 0) {
      setLoading(true);
      setLoadError(false);
      fetch(`${import.meta.env.BASE_URL.replace(/\/$/, "")}/api/search-index.json`)
        .then((res) => { if (!res.ok) throw new Error(String(res.status)); return res.json(); })
        .then((data: SearchIndex) => {
          setSearchIndex(data.items);
          fuseRef.current = new Fuse(data.items, fuseOptions);
        })
        .catch((err) => {
          setLoadError(true);
          console.error("Failed to load search index:", err);
        }).finally(() => setLoading(false));
    }
  }, [open, searchIndex.length]);

  // Perform search and filtering when query or filters change
  React.useEffect(() => {
    if (!fuseRef.current) {
      setFilteredResults([]);
      return;
    }

    let results: SearchItem[];

    if (!searchQuery.trim()) {
      // Show all items when no search query
      results = searchIndex;
    } else {
      const searchResults = fuseRef.current.search(searchQuery);
      results = searchResults.map((result) => result.item);
    }

    // Apply filters with inverted logic
    const filtered = results.filter((item) => {
      // If no collection filters are active, show all collections
      const hasCollectionFilter = filterDocs || filterFunnydocs;
      const collectionMatch = hasCollectionFilter
        ? (filterDocs && !item.slug.startsWith("supplement")) || (filterFunnydocs && item.slug.startsWith("supplement"))
        : true;

      // If no type filters are active, show all types
      const hasTypeFilter = filterPages || filterHeadings;
      const typeMatch = hasTypeFilter
        ? (filterPages && item.type === "page") || (filterHeadings && item.type === "heading")
        : true;

      return collectionMatch && typeMatch;
    });

    setFilteredResults(filtered.slice(0, 20));
  }, [searchQuery, searchIndex, filterDocs, filterFunnydocs, filterPages, filterHeadings]);

  // Handle item selection
  const handleSelect = (url: string) => {
    setOpen(false);
    window.location.assign(url);
  };

  // Group results by type
  const pageResults = filteredResults.filter((item) => item.type === "page");
  const headingResults = filteredResults.filter((item) => item.type === "heading");

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="搜索学码群资料"
      description="搜索书名、主题、作者或群友署名"
    >
      <CommandInput placeholder="搜索书名、主题、作者或分享者…" value={searchQuery} onValueChange={setSearchQuery} />

      {/* Filter toggles */}
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <FilterIcon className="text-muted-foreground size-4" />
        <div className="flex flex-wrap items-center gap-1">
          <Toggle size="sm" pressed={filterDocs} onPressedChange={setFilterDocs} aria-label="只看群资料">
            群资料
          </Toggle>
          <Toggle
            size="sm"
            pressed={filterFunnydocs}
            onPressedChange={setFilterFunnydocs}
            aria-label="查看外部补充"
          >
            外部补充
          </Toggle>
          <div className="bg-border mx-1 h-6 w-px" />
          <Toggle size="sm" pressed={filterPages} onPressedChange={setFilterPages} aria-label="只看页面">
            页面
          </Toggle>
          <Toggle size="sm" pressed={filterHeadings} onPressedChange={setFilterHeadings} aria-label="只看章节">
            章节
          </Toggle>
        </div>
      </div>

      <CommandList>
        <CommandEmpty>{loading ? "正在载入资料目录…" : loadError ? "目录暂时未能载入，请关闭后重新打开搜索。" : "没有找到相关资料，试试书名中的关键词。"}</CommandEmpty>

        {pageResults.length > 0 && (
          <CommandGroup heading="资料与主题">
            {pageResults.map((item) => {
              if (item.type !== "page") return null;
              return (
                <CommandItem
                  key={item.url}
                  value={item.url}
                  onSelect={() => handleSelect(item.url)}
                >
                  <FileTextIcon />
                  <div className="flex flex-col gap-1">
                    <div className="font-medium"><SourceLabel text={item.title} /></div>
                    {item.description && (
                      <div className="text-muted-foreground line-clamp-1 text-xs">{item.description}</div>
                    )}
                  </div>
                  <span className="text-muted-foreground ml-auto text-xs">{item.slug.startsWith("supplement") ? "补充" : "学码群"}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {headingResults.length > 0 && (
          <CommandGroup heading="相关章节">
            {headingResults.map((item) => {
              if (item.type !== "heading") return null;
              return (
                <CommandItem
                  key={item.url}
                  value={item.url}
                  onSelect={() => handleSelect(item.url)}
                >
                  <HashIcon />
                  <div className="flex flex-col gap-1">
                    <div className="font-medium"><SourceLabel text={item.headingText} /></div>
                    <div className="text-muted-foreground text-xs"><SourceLabel text={item.pageTitle} /></div>
                  </div>
                  <span className="text-muted-foreground ml-auto text-xs">{item.slug.startsWith("supplement") ? "补充" : "学码群"}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}

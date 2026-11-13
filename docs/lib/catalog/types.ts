export interface CatalogCard {
  title: string;
  href?: string;
  description?: string;
  eyebrow?: string;
  icon?: string;
  meta?: string[];
  links?: Array<{ label: string; href: string }>;
}

export interface CatalogSection {
  id: string;
  title?: string;
  description?: string;
  layout?: 'grid' | 'path';
  cards: CatalogCard[];
}

export interface CatalogView {
  intro: string[];
  sections: CatalogSection[];
  note?: string;
}

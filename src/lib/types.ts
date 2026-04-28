export interface Item {
  gid: string;
  slug: string;
  name: string;
  rarity: string;
  type: string;
  extraTypes?: string[];
  sockets?: string[];
  cost?: number;
  damage?: number | [number, number];
  cd?: number;
  accuracy?: number;
  effect?: string;
  shape?: number[][];
  image?: string;
}

export interface Effect {
  kind: 'buff' | 'debuff';
  color: string;
  icon?: string;
  short: string;
  formula: string;
  note: string;
  alias?: never;
}

export interface EffectAlias {
  alias: string;
}

export type EffectEntry = Effect | EffectAlias;

export interface Character {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  role: string;
  tagline: string;
  description: string;
  signature: string;
  items: string[];
}

export interface Strategy {
  id: string;
  title: string;
  char: string;
  tags: string[];
  excerpt: string;
  items: string[];
  color: string;
  author?: string;
  updated?: string;
}

export interface TierRow {
  tier: string;
  items: string[];
}

export interface ItemComment {
  id: string;
  item_slug: string;
  body: string;
  created_at: string;
}

export interface ItemConnection {
  id: string;
  slug_a: string;
  slug_b: string;
  to_type: 'item' | 'effect' | 'character';
  votes: number;
  created_at: string;
}

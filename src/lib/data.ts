import type { Character, EffectEntry, Strategy, TierRow } from './types';

export const EFFECTS: Record<string, EffectEntry> = {
  Regeneration: { kind: 'buff', color: '#3a8a52', icon: '/images/icons/Icon_Regeneration.webp',
    short: 'Heals over time.', formula: 'Heals 1 HP per Regeneration stack on a tick.',
    note: 'Often gained from Nature items (Banana, Ruby Egg).' },
  Luck: { kind: 'buff', color: '#c08a3e', icon: '/images/icons/Icon_Lucky.webp',
    short: 'Increases accuracy.', formula: '+2% accuracy (flat) per stack.',
    note: 'Reaper synergies — Snake Pet → Rapier scaling.' },
  Spikes: { kind: 'buff', color: '#6b6157', icon: '/images/icons/Icon_Spikes.webp',
    short: 'Reflects damage.', formula: 'Reflects damage equal to Spikes stacks on melee/ranged hits.',
    note: 'Berzerker / Thorn Whip lean heavily into stacking.' },
  Mana: { kind: 'buff', color: '#3a5a8a', icon: '/images/icons/Icon_Mana.webp',
    short: 'Resource for Magic items.', formula: 'Stored, consumed by Magic-tagged effects.',
    note: 'Mage core resource.' },
  Vampirism: { kind: 'buff', color: '#8a3324', icon: '/images/icons/Icon_Vampirism.webp',
    short: 'Lifesteal scaling.', formula: '+~10% lifesteal per stack on hits.',
    note: 'Reaper / Vampiric build cornerstone.' },
  Heat: { kind: 'buff', color: '#d96952', icon: '/images/icons/Icon_Heat.webp',
    short: 'Speeds up your attacks.', formula: '+2% attack speed per stack.',
    note: 'Counters Cold/Freeze.' },
  Empower: { kind: 'buff', color: '#b27a18', icon: '/images/icons/Icon_Empower.webp',
    short: 'Adds bonus damage.', formula: '+1 damage to next attack per Empower (consumed on use).',
    note: 'Often a single big-hit accelerant.' },
  Block: { kind: 'buff', color: '#5a4632', icon: '/images/icons/Icon_Block.webp',
    short: 'Absorbs incoming damage.', formula: '1 Block soaks 1 damage; depletes first.',
    note: 'Most armor/shields generate Block at start of battle.' },
  Poison: { kind: 'debuff', color: '#5a8a3a', icon: '/images/icons/Icon_Poison.webp',
    short: 'Damage over time.', formula: 'Each tick: deal 1 dmg per Poison stack, then −1 stack.',
    note: 'Pyromancer/Dark builds; cleansed by potions.' },
  Blind: { kind: 'debuff', color: '#3d2f22', icon: '/images/icons/Icon_Blind.webp',
    short: 'Reduces accuracy.', formula: '−2% accuracy per stack (flat).',
    note: 'Pocket Sand, Sir Sand, Broom on-hit.' },
  Cold: { kind: 'debuff', color: '#3a6a8a', icon: '/images/icons/Icon_Cold.webp',
    short: 'Slows attack speed.', formula: '−2% attack speed per stack.',
    note: 'Eventually upgrades to Freeze in some chains.' },
  Vampiric: { alias: 'Vampirism' },
};

export const ELEMENTS: Record<string, string> = {
  Nature: '#3a8a52', Holy: '#c4a64a', Magic: '#3a5a8a', Dark: '#3d2f22',
  Fire: '#d96952', Vampiric: '#8a3324', Musical: '#6b3a8a', Ice: '#3a6a8a',
  Pet: '#7a6a4a', Effect: '#8a3324', Food: '#7a8a3a', Spell: '#3a5a8a',
  Helmet: '#6b6157', Melee: '#8a3324', Ranged: '#3a5a8a',
  Star: '#c08a3e', Treasure: '#b27a18', Gold: '#c08a3e',
  Diamond: '#3a6a8a', Lightning: '#c08a3e', Engineer: '#6b6157',
};

export const RARITY_ORDER = ['Common', 'Rare', 'Epic', 'Legendary', 'Godly', 'Unique'];

export const RARITY_KEY: Record<string, string> = {
  Common: 'common', Rare: 'rare', Epic: 'epic',
  Legendary: 'legend', Godly: 'godly', Unique: 'unique',
};

export const CHARACTERS: Character[] = [
  { id: 'Ranger', name: 'Ranger', color: '#4a7a3a', icon: '/images/chars/RangerIcon.webp',
    role: 'Ranged / Nature', tagline: 'Strike from afar.',
    description: 'Ranged Weapons and Nature items. Stones, bows, pets.',
    signature: 'Ranged + Nature', items: ['Stone', 'SerpentStaff'] },
  { id: 'Reaper', name: 'Reaper', color: '#3d2f22', icon: '/images/chars/ReaperIcon.webp',
    role: 'Lifesteal / Death', tagline: 'Bleed them dry.',
    description: 'Vampirism, Dark items, and Luck synergies. The classic Snake → Rapier opener stacks Luck so the Rapier ramps damage fast.',
    signature: 'Vampirism + Luck', items: ['BloodAmulet', 'SpectralDagger', 'BloodyDagger'] },
  { id: 'Berzerker', name: 'Berzerker', color: '#8a3324', icon: '/images/chars/BerserkerIcon.webp',
    role: 'Aggressive Melee', tagline: 'Hit first, hit hardest.',
    description: 'Spikes, on-hit triggers, raw weapon damage. Wants Whetstone-style scaling and stacked melee weapons.',
    signature: 'Spikes + Empower', items: ['ThornWhip', 'Hammer', 'ClawsofAttack'] },
  { id: 'Pyromancer', name: 'Pyromancer', color: '#d96952', icon: '/images/chars/PyromancerIcon.webp',
    role: 'Burn / Poison', tagline: 'Cook them with stacks.',
    description: 'Heat, Burn, and Poison — damage-over-time stacking.',
    signature: 'Heat + Poison', items: ['BurningTorch', 'MagicTorch', 'PestilenceFlask'] },
  { id: 'Mage', name: 'Mage', color: '#3a5a8a', icon: '/images/chars/MageIcon.webp',
    role: 'Magic / Mana', tagline: 'Cast, spend, recharge.',
    description: 'Mana economy. Magic Staff, Mana Orb, Manathirst, Manekineko.',
    signature: 'Mana spend cycle', items: ['MagicStaff', 'ManaOrb', 'Manathirst'] },
  { id: 'Adventurer', name: 'Adventurer', color: '#4a7a3a', icon: '/images/chars/AdventurerIcon.webp',
    role: 'Generalist', tagline: 'Jack of all trades — flexible builds.',
    description: 'The starter character. Not pinned to a single archetype, so most generic items work.',
    signature: 'Open-ended', items: ['HeroSword', 'LeatherArmor'] },
  { id: 'Engineer', name: 'Engineer', color: '#6b6157', icon: '/images/chars/EngineerIcon.webp',
    role: 'Contraptions', tagline: 'Build the machine.',
    description: 'Gadget-driven kit. Combos discrete trigger items.',
    signature: 'Gadget triggers', items: ['BoxofProsperity', 'Holdall', 'PlatinumCustomerCard'] },
];

export const TIER: TierRow[] = [
  { tier: 'S', items: ['Eggscalibur', 'BloodyDagger', 'Manathirst', 'HolyArmor', 'RipsawBlade'] },
  { tier: 'A', items: ['Hammer', 'Pandamonium', 'HeroLongsword', 'SpectralDagger', 'PoisonSpear', 'VampiricArmor'] },
  { tier: 'B', items: ['HungryBlade', 'ThornWhip', 'HeroSword', 'MagicStaff', 'BurningTorch', 'ClawsofAttack'] },
  { tier: 'C', items: ['WoodenSword', 'Stone', 'Spear', 'Dagger', 'Torch', 'Broom'] },
];

export const STRATEGIES: Strategy[] = [
  { id: 'reaper-luck-rapier', title: 'Reaper: Snake → Rapier Luck Snowball',
    char: 'Reaper', tags: ['Luck', 'Vampirism', 'Early-game'],
    excerpt: 'Open with the Snake pet to feed Luck stacks into a Rapier. Each on-hit ramps damage faster than enemies can scale armor.',
    items: ['BloodyDagger'], color: '#8a3324', author: 'meta', updated: 'patch 0.9' },
  { id: 'pyro-burn-stack', title: 'Pyromancer: Burning Torch Heat Spam',
    char: 'Pyromancer', tags: ['Heat', 'Poison', 'DoT'],
    excerpt: 'Stack Heat early so attack speed compounds. Burning Torch + Magic Torch + Pestilence Flask covers most matchups.',
    items: ['BurningTorch', 'MagicTorch'], color: '#d96952' },
  { id: 'mage-mana-burst', title: 'Mage: Manathirst Burst Loop',
    char: 'Mage', tags: ['Mana', 'Burst'],
    excerpt: 'Manathirst into Mana Orb plus a Strong Mana Potion socket. Detonate big Mana dumps when opponent armor is highest.',
    items: ['Manathirst', 'ManaOrb'], color: '#3a5a8a' },
  { id: 'berz-spike-wall', title: 'Berzerker: Thorn-Spike Reflect Wall',
    char: 'Berzerker', tags: ['Spikes', 'Defense'],
    excerpt: 'Stack Spikes via Spiked Shield, Thorn Whip, and Heroic Potion. Many melee opponents cleave themselves on you.',
    items: ['ThornWhip', 'SpikedShield'], color: '#5a4632' },
  { id: 'ranger-stone-engine', title: 'Ranger: Stone Engine Open',
    char: 'Ranger', tags: ['Ranged', 'Nature', 'Early-game'],
    excerpt: 'Bag of Stones lets stones be reused. Free chip damage every fight while you scale up the real ranged carry.',
    items: ['Stone'], color: '#4a7a3a' },
  { id: 'eng-holdall-stack', title: 'Engineer: Holdall Neutral Block Tower',
    char: 'Engineer', tags: ['Block', 'Economy'],
    excerpt: 'Stuff Holdall with neutral filler — each yields 8 Block at start of battle.',
    items: ['Holdall', 'HolyArmor'], color: '#6b6157' },
  { id: 'adv-customer-card', title: 'Adventurer: Customer Card Econ Spike',
    char: 'Adventurer', tags: ['Economy', 'Mid-game'],
    excerpt: 'Customer Card → Platinum Customer Card. Reroll into rarity bumps and trade offers.',
    items: ['CustomerCard', 'PlatinumCustomerCard'], color: '#c08a3e' },
];

export function rarityKey(r: string): string {
  return RARITY_KEY[r] ?? 'common';
}

export function formatDamage(d: number | [number, number] | undefined): string | null {
  if (d == null) return null;
  if (Array.isArray(d)) return d[0] === d[1] ? `${d[0]}` : `${d[0]}–${d[1]}`;
  return String(d);
}

export function resolveEffect(name: string): string | null {
  const e = EFFECTS[name];
  if (!e) return null;
  if ('alias' in e) return e.alias ?? null;
  return name;
}

export function tokenKind(name: string): 'buff' | 'debuff' | 'elem' {
  const e = EFFECTS[name];
  if (!e) return 'elem';
  if ('alias' in e && e.alias) return tokenKind(e.alias);
  return (e as import('./types').Effect).kind;
}

const ELEMENT_ICONS: Record<string, string> = {
  Star:     '/images/icons/Star.webp',
  Diamond:  '/images/icons/SecondaryStar_icon.webp',
  Treasure: '/images/icons/Icon_Treasure.webp',
  Effect:   '/images/icons/Icon_Effect.webp',
  Melee:    '/images/icons/Icon_Melee.webp',
  Ranged:   '/images/icons/Icon_Ranged.webp',
  Holy:     '/images/icons/Icon_Holy.webp',
  Magic:    '/images/icons/Icon_Magic.webp',
  Nature:   '/images/icons/Icon_Nature.webp',
  Dark:     '/images/icons/Icon_Dark.webp',
  Fire:     '/images/icons/Icon_Fire.webp',
  Ice:      '/images/icons/Icon_Ice.webp',
  Lightning:'/images/icons/Icon_Lightning.webp',
  Musical:  '/images/icons/Icon_Musical.webp',
  Vampiric: '/images/icons/Icon_Vampiric.webp',
};

export function effectIcon(name: string): string | null {
  const resolved = resolveEffect(name);
  if (resolved) {
    const e = EFFECTS[resolved];
    if (e && !('alias' in e)) return e.icon ?? null;
  }
  return ELEMENT_ICONS[name] ?? null;
}

export function parseEffect(str: string) {
  if (!str) return [];
  const out: Array<{ kind: string; text?: string; style?: string; name?: string }> = [];
  let i = 0;
  const re = /\$(l|h|g|m|red)\[([^\]]*)\]|<([^>]+)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(str)) !== null) {
    if (m.index > i) out.push({ kind: 'text', text: str.slice(i, m.index) });
    if (m[1]) {
      out.push({ kind: 'styled', style: m[1], text: m[2] });
    } else if (m[3]) {
      out.push({ kind: 'token', name: m[3] });
    }
    i = re.lastIndex;
  }
  if (i < str.length) out.push({ kind: 'text', text: str.slice(i) });
  return out;
}

export function itemsWithToken(items: import('./types').Item[], token: string) {
  const aliases = [token];
  if (token === 'Vampirism') aliases.push('Vampiric');
  if (token === 'Vampiric') aliases.push('Vampirism');
  const re = new RegExp('<(' + aliases.join('|') + ')>');
  return items.filter(it => it.effect && re.test(it.effect));
}

export type EffectRole = 'generates' | 'consumes' | 'removes' | 'scales' | 'triggered-by';
export type InteractionKind = 'buff' | 'debuff' | 'meta';

// One chip per (effect, role) combination. Renders independently in the UI.
export interface InteractionChip {
  effect: string;      // display name
  kind: InteractionKind;
  role: EffectRole;
  icon: string | null;
  navigable: boolean;  // true when clicking should jump to the effect on the Effects page
  position: number;    // first text-position the role was triggered at; used to sort chips in reading order
  target?: 'self' | 'enemy'; // only set when non-default (self-debuff or buff-to-enemy)
}

// Classify a single occurrence at `pos` by walking back up to 50 chars and
// matching verb patterns. Periods and semicolons act as clause boundaries so
// an earlier "Gain X." doesn't leak into a later "Use Y." clause.
// Generates is checked before consumes so the closest unblocked verb wins
// in "Use 1 <Mana> to gain 3 <Heat>" → Heat = generates.
function classifyOccurrence(text: string, pos: number): EffectRole {
  const before = text.slice(Math.max(0, pos - 50), pos);
  // Token inside $l[...] trigger label → it's what triggers the effect, not an action target
  if (/\$l\[[^\]]*$/.test(before)) return 'triggered-by';
  const tail = before.slice(-30);
  if (/(?:for each|per|chance for each)\s*$/i.test(tail) ||
      /\bat least\s+\S+\s*$/i.test(tail)) return 'scales';
  if (/\b(?:Remove|Steal|Cleanse|remove|steal|cleanse)\b[^.;]{0,50}$/.test(before)) return 'removes';
  // "into N <X>" covers "Convert N health into 100 <Block>" — the conversion target.
  if (/\b(?:Gain|Inflict|gain|inflict|into)\b[^.;]{0,50}$/.test(before)) return 'generates';
  if (/\b(?:Use|use)\b[^.;]{0,50}$/.test(before)) return 'consumes';
  return 'scales';
}

// Detect targeting modifier for an occurrence: only flags non-default cases.
// Default: buffs go to self, debuffs go to opponent. We flag when inverted.
function detectOccurrenceTarget(text: string, pos: number): 'self' | 'enemy' | undefined {
  const win = text.slice(Math.max(0, pos - 60), Math.min(text.length, pos + 100));
  if (/\byourself\b/i.test(win)) return 'self';
  if (/\b(?:your opponent|the opponent|enemy)\b/i.test(win)) return 'enemy';
  return undefined;
}

// Run `matchRe` over `text` and emit one (role, firstPosition) entry per
// distinct role triggered. The position is the index of the *first* occurrence
// that produced that role, so chips later sort by reading order.
function classifyMatches(text: string, matchRe: RegExp): { role: EffectRole; position: number }[] {
  const seen = new Map<EffectRole, number>();
  let m: RegExpExecArray | null;
  while ((m = matchRe.exec(text)) !== null) {
    const role = classifyOccurrence(text, m.index);
    if (!seen.has(role)) seen.set(role, m.index);
  }
  return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
}

// Public API: just the role list (used by EffectsPage's itemsByRole grouping).
export function classifyItemEffect(text: string, effectName: string): EffectRole[] {
  if (!text) return [];
  const aliases = [effectName];
  if (effectName === 'Vampirism') aliases.push('Vampiric');
  if (effectName === 'Vampiric') aliases.push('Vampirism');
  return classifyMatches(text, new RegExp(`<(?:${aliases.join('|')})>`, 'g')).map(x => x.role);
}

export function itemsByRole(items: import('./types').Item[], effectName: string): Record<EffectRole, import('./types').Item[]> {
  const result: Record<EffectRole, import('./types').Item[]> = { generates: [], consumes: [], removes: [], scales: [], 'triggered-by': [] };
  for (const it of itemsWithToken(items, effectName)) {
    const roles = classifyItemEffect(it.effect ?? '', effectName);
    for (const r of roles) result[r].push(it);
  }
  return result;
}

// --- Implicit / meta interactions ---------------------------------------------
// Concepts the game refers to without a <Token>: generic buff/debuff stripping,
// stat changes (maximum health), and game-mechanic shifts (healing reduction).
// Each detector returns (role, position) pairs so chips order by text appearance.
type ImplicitDetector = (t: string) => { role: EffectRole; position: number }[];

const IMPLICIT_EFFECTS: { name: string; kind: InteractionKind; detect: ImplicitDetector }[] = [
  {
    name: 'Buff', kind: 'meta',
    detect: (t) => {
      // "buff" / "buffs" not preceded by "de" (so "debuffs" doesn't match).
      // Drop the 'scales' default since "If you have buffs" isn't actionable.
      return classifyMatches(t, /(?<![Dd]e)\bbuffs?\b/g).filter(x => x.role !== 'scales');
    }
  },
  {
    name: 'Debuff', kind: 'meta',
    detect: (t) => {
      const out: { role: EffectRole; position: number }[] = [];
      // "cleanse N debuff" reads as removing debuffs from self
      const cleanseM = /\bcleanse\b[^.;]{0,30}\bdebuffs?\b/i.exec(t);
      if (cleanseM) out.push({ role: 'removes', position: cleanseM.index });
      // Standard verb scan (Inflict / Remove debuffs)
      for (const x of classifyMatches(t, /\bdebuffs?\b/g)) {
        if (x.role === 'scales') continue;
        if (out.some(o => o.role === x.role)) continue;
        out.push(x);
      }
      return out;
    }
  },
  {
    name: 'Maximum Health', kind: 'buff',
    detect: (t) => {
      const re = /\bmaximum health\b/gi;
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      while ((m = re.exec(t)) !== null) {
        const before = t.slice(Math.max(0, m.index - 50), m.index);
        let role: EffectRole | null = null;
        if (/\b(?:Gain|gain)\b[^.;]{0,50}$/.test(before)) role = 'generates';
        else if (/\+\s*\d+\s*$/.test(before)) role = 'generates';
        else if (/\b(?:Lose|lose|reduce)\b[^.;]{0,50}$/.test(before)) role = 'removes';
        if (role && !seen.has(role)) seen.set(role, m.index);
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    name: 'Healing Reduction', kind: 'debuff',
    detect: (t) => {
      // Passive: "your opponent's healing is reduced by N%"
      let m = /\bhealing\s+is\s+reduced\b/i.exec(t);
      if (m) return [{ role: 'generates', position: m.index }];
      // Active: "reduce N% healing", "reduce healing by N%"
      m = /\breduce[^.;]{0,30}healing\b/i.exec(t);
      if (m) return [{ role: 'generates', position: m.index }];
      return [];
    }
  },
  {
    name: 'Stun', kind: 'debuff',
    detect: (t) => {
      // "stun" is the verb itself, so always marks as generated
      const re = /\bstun\b/gi;
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      while ((m = re.exec(t)) !== null) {
        if (!seen.has('generates')) seen.set('generates', m.index);
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    name: 'Invulnerability', kind: 'buff',
    detect: (t) => {
      const re = /\b(?:invulnerable|invulnerability)\b/gi;
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      while ((m = re.exec(t)) !== null) {
        if (!seen.has('generates')) seen.set('generates', m.index);
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    name: 'Damage Reduction', kind: 'buff',
    detect: (t) => {
      // Various phrasings for taking less damage
      const patterns = [
        /\breduce[s]?\s+damage\s+taken\b/i,
        /\btakes?\s+\d+%?\s+less\s+damage\b/i,
        /\bdamage\s+(?:is\s+)?reduced\b/i,
        /\bless\s+damage\b/i,
      ];
      for (const pat of patterns) {
        const m = pat.exec(t);
        if (m) return [{ role: 'generates' as EffectRole, position: m.index }];
      }
      return [];
    }
  },
];

// For an item, return one chip per (effect, role) tuple — both tokenized and
// implicit interactions interleaved by text-position so the rendered list
// reads in the same order the player encounters them in the description.
export function effectRolesForItem(item: import('./types').Item): InteractionChip[] {
  const text = item.effect;
  if (!text) return [];
  const chips: InteractionChip[] = [];

  // Tokenized: <Regeneration>, <Luck>, etc.
  const seenEffects = new Set<string>();
  const re = /<([A-Z][a-zA-Z]+)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const tok = m[1];
    const resolved = resolveEffect(tok);
    if (!resolved || seenEffects.has(resolved)) continue;
    seenEffects.add(resolved);
    const aliases = [resolved];
    if (resolved === 'Vampirism') aliases.push('Vampiric');
    if (resolved === 'Vampiric') aliases.push('Vampirism');
    const aliasRe = new RegExp(`<(?:${aliases.join('|')})>`, 'g');
    const matches = classifyMatches(text, aliasRe);
    if (matches.length === 0) continue;
    const e = EFFECTS[resolved];
    const kind: InteractionKind = (e && !('alias' in e)) ? (e as import('./types').Effect).kind : 'meta';
    const icon = effectIcon(resolved);
    for (const { role, position } of matches) {
      // Detect non-default target (self-debuff or buff-to-enemy) by scanning occurrences
      // with this role. Only flag when it deviates from the implicit default.
      let target: 'self' | 'enemy' | undefined;
      if (role === 'generates') {
        const scanRe = new RegExp(`<(?:${aliases.join('|')})>`, 'g');
        let sm: RegExpExecArray | null;
        while ((sm = scanRe.exec(text)) !== null) {
          if (classifyOccurrence(text, sm.index) !== role) continue;
          const t = detectOccurrenceTarget(text, sm.index);
          if (t) { target = t; break; }
        }
      }
      chips.push({ effect: resolved, kind, role, icon, navigable: true, position, target });
    }
  }

  // Implicit / meta
  for (const def of IMPLICIT_EFFECTS) {
    for (const { role, position } of def.detect(text)) {
      chips.push({ effect: def.name, kind: def.kind, role, icon: null, navigable: false, position });
    }
  }

  // Sort by text position so chips appear in reading order.
  chips.sort((a, b) => a.position - b.position);
  return chips;
}

export function itemsForCharacter(items: import('./types').Item[], charId: string) {
  return items.filter(it => Array.isArray(it.sockets) && it.sockets.includes(charId));
}

// Canonical pair key — always slug_a < slug_b
export function pairKey(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

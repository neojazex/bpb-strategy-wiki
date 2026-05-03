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
  // 100-char window so long "Gain X $m[or] Y $m[or] Z" lists don't lose the verb.
  const before = text.slice(Math.max(0, pos - 100), pos);
  // Token inside $l[...] trigger label → it's what triggers the effect, not an action target
  if (/\$l\[[^\]]*$/.test(before)) return 'triggered-by';
  const tail = before.slice(-30);
  if (/(?:for each|per|chance for each)\s*$/i.test(tail) ||
      /\bat least\s+\S+\s*$/i.test(tail)) return 'scales';

  // Split at hard sentence boundaries (. ; ) but not at decimal numbers (1.6s).
  // Take the last segment so "Remove X and gain Y" classifies Y by its own verb
  // (gain → generates) rather than the earlier Remove.
  const clause = before.split(/(?<!\d)[.;]/).pop() ?? before;
  // Walk all verb matches and keep only the last one — it's the most recent action.
  const verbRe = /\b(Remove|Steal|Cleanse|Destroy|Gain|Inflict|Use|remove|steal|cleanse|destroy|gain|inflict|into|use)\b/g;
  let lastVerb = '';
  let lm: RegExpExecArray | null;
  while ((lm = verbRe.exec(clause)) !== null) lastVerb = lm[1].toLowerCase();

  if (/^(?:remove|steal|cleanse|destroy)$/.test(lastVerb)) return 'removes';
  // "into N <X>" covers "Convert N health into 100 <Block>" — the conversion target.
  if (/^(?:gain|inflict|into)$/.test(lastVerb)) return 'generates';
  if (lastVerb === 'use') return 'consumes';
  return 'scales';
}

// Returns true if the character at `pos` sits inside an open $red[...] span.
// Tracks nested $x[...] spans correctly so inner $h[1] etc. don't prematurely
// close the outer $red[.
function isInsideRedSpan(text: string, pos: number): boolean {
  const before = text.slice(Math.max(0, pos - 150), pos);
  const lastRedIdx = before.lastIndexOf('$red[');
  if (lastRedIdx === -1) return false;
  // Walk from after '$red[' and count bracket depth using $x[ openers and ] closers.
  const afterOpener = before.slice(lastRedIdx + 5); // skip '$red['
  let depth = 1;
  for (let i = 0; i < afterOpener.length; i++) {
    if (afterOpener[i] === '$' && i + 2 < afterOpener.length && afterOpener[i + 2] === '[') {
      // single-char style names: $l[ $h[ $m[ $s[ etc.
      depth++; i += 2; // loop will i++ → lands on content after '['
    } else if (afterOpener[i] === ']') {
      if (--depth === 0) return false; // $red[ was closed before our token
    }
  }
  return depth > 0;
}

// Detect targeting modifier for an occurrence: only flags non-default cases.
// Default: buffs go to self, debuffs go to opponent. We flag when inverted.
//
// Two signals:
//   A) Token is inside a $red[...] span — the game uses red to warn of self-damage.
//   B) "to yourself" / "$red[to yourself" appears within 20 chars immediately after
//      the token closing '>'. 20 chars is tight enough that two tokens in the same
//      clause (e.g. Poison Spear's first <Poison>) won't pick up the later qualifier.
function detectOccurrenceTarget(text: string, pos: number): 'self' | 'enemy' | undefined {
  if (isInsideRedSpan(text, pos)) return 'self';
  const tokenEnd = text.indexOf('>', pos) + 1;
  const after = text.slice(tokenEnd, Math.min(text.length, tokenEnd + 20));
  if (/\byourself\b/i.test(after)) return 'self';
  if (/\b(?:your opponent|the opponent)\b/i.test(after)) return 'enemy';
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
// Each detector returns (role, position, target?) triples so chips order by text
// appearance and can carry Self/Enemy badges just like tokenized chips.
type ImplicitMatch = { role: EffectRole; position: number; target?: 'self' | 'enemy' };
type ImplicitDetector = (t: string) => ImplicitMatch[];

const IMPLICIT_EFFECTS: { name: string; kind: InteractionKind; detect: ImplicitDetector }[] = [
  {
    name: 'Buff', kind: 'meta',
    detect: (t): ImplicitMatch[] => {
      // "buff" / "buffs" not preceded by "de" (so "debuffs" doesn't match).
      // Drop the 'scales' default since "If you have buffs" isn't actionable.
      const results: ImplicitMatch[] = classifyMatches(t, /(?<![Dd]e)\bbuffs?\b/g)
        .filter(x => x.role !== 'scales');
      // "your opponent gains N random buffs" isn't caught by the verb lookback
      // (uses "gains" not "gain") — detect it explicitly as Generates (Enemy).
      const enemyRe = /\byour opponent\b[^.;]{0,30}\bbuffs?\b/gi;
      let m: RegExpExecArray | null;
      while ((m = enemyRe.exec(t)) !== null) {
        if (!results.some(r => r.role === 'generates' && r.target === 'enemy'))
          results.push({ role: 'generates', position: m.index, target: 'enemy' });
      }
      return results;
    }
  },
  {
    name: 'Debuff', kind: 'meta',
    detect: (t) => {
      const out: ImplicitMatch[] = [];
      // "cleanse N debuff" reads as removing debuffs from self
      const cleanseM = /\bcleanse\b[^.;]{0,30}\bdebuffs?\b/i.exec(t);
      if (cleanseM) out.push({ role: 'removes', position: cleanseM.index });
      // Standard verb scan (Inflict / Remove / Scales-with debuffs).
      // 'scales' is allowed here — "for each debuff" is a real interaction (e.g. Darksaber).
      for (const x of classifyMatches(t, /\bdebuffs?\b/g)) {
        // "resist debuffs" → Resistance detector. "opponent's debuffs from cleansing"
        // → anti-cleanse mechanic captured by Resistance, not a scaling relationship.
        const ctx = t.slice(Math.max(0, x.position - 30), x.position + 20);
        if (/\bresist\b/i.test(ctx) || /\bcleansing\b/i.test(ctx)) continue;
        // For triggered-by, check if the $l[...] label says "Self-inflicted" → (Self) badge
        let target: 'self' | 'enemy' | undefined;
        if (x.role === 'triggered-by') {
          const win = t.slice(Math.max(0, x.position - 30), x.position + 10);
          if (/\bself\b/i.test(win)) target = 'self';
        }
        if (out.some(o => o.role === x.role && o.target === target)) continue;
        out.push({ ...x, target });
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
    detect: (t): ImplicitMatch[] => {
      // "stun" is the verb itself. When both "opponent" and "yourself" appear in
      // the clause (e.g. "Stun opponent for 1s and yourself for 0.5s"), emit two
      // chips: plain (default = opponent) + (Self).
      const re = /\bstun\b/gi;
      const chips: ImplicitMatch[] = [];
      const seenKeys = new Set<string>();
      let m: RegExpExecArray | null;
      while ((m = re.exec(t)) !== null) {
        const win = t.slice(Math.max(0, m.index - 10), Math.min(t.length, m.index + m[0].length + 70));
        const hasSelf = /\byourself\b/i.test(win);
        if (!seenKeys.has('generates:')) {
          seenKeys.add('generates:');
          chips.push({ role: 'generates', position: m.index });
        }
        if (hasSelf && !seenKeys.has('generates:self')) {
          seenKeys.add('generates:self');
          chips.push({ role: 'generates', position: m.index, target: 'self' });
        }
      }
      return chips;
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
    detect: (t): ImplicitMatch[] => {
      // Various phrasings for taking less damage
      const patterns = [
        /\breduce[s]?\s+damage\s+taken\b/i,
        /\btakes?\s+\d+%?\s+less\s+damage\b/i,
        /\bdamage\s+(?:is\s+)?reduced\b/i,
        /\bless\s+damage\b/i,
        // "players take -35% damage" (Turtle/Sir Sand/No Rush Please) — negative modifier on damage taken
        /\btakes?\s+-\d+%\s+damage\b/i,
      ];
      const results: ImplicitMatch[] = [];
      const seen = new Set<string>();
      for (const pat of patterns) {
        const m = pat.exec(t);
        if (m) {
          if (!seen.has('generates:')) {
            seen.add('generates:');
            results.push({ role: 'generates' as EffectRole, position: m.index });
          }
          // "Both players take..." → also emit an enemy-targeted chip
          const ctx = t.slice(Math.max(0, m.index - 40), m.index + 10);
          if (/\bboth\b/i.test(ctx) && !seen.has('generates:enemy')) {
            seen.add('generates:enemy');
            results.push({ role: 'generates' as EffectRole, position: m.index, target: 'enemy' });
          }
          break; // one pattern matched, no need to check further
        }
      }
      return results;
    }
  },
  {
    // "Deal N% of your healing as <Effect>" — convert healing output into bonus damage.
    // Several items use this mechanic (Harold, Vampire's Fang, etc.).
    name: 'Retribution', kind: 'meta',
    detect: (t) => {
      const re = /\bof your healing\b|\bhealing as\b/gi;
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      while ((m = re.exec(t)) !== null) {
        if (!seen.has('generates')) seen.set('generates', m.index);
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    // Stamina is the game's ATB-like resource — slowly fills over time, consumed by weapons.
    // "Use N stamina" → Consumes; "$l[N stamina used:]" trigger label → Triggered-by.
    name: 'Stamina', kind: 'meta',
    detect: (t) => {
      const results: ImplicitMatch[] = [];
      const seen = new Set<string>();
      // Generates: "Regenerate N stamina" — restoring the stamina resource
      const generateRe = /\bregenerate\s+\d+\s+stamina\b/gi;
      let m: RegExpExecArray | null;
      while ((m = generateRe.exec(t)) !== null) {
        if (!seen.has('generates')) { seen.add('generates'); results.push({ role: 'generates', position: m.index }); }
      }
      // Consumes: "Use [up to] N stamina" or "[N] stamina used" (inline, not trigger label)
      const consumeRe = /\buse\s+(?:up\s+to\s+)?[\d$\w]+\s+stamina\b(?!\s*\])/gi;
      while ((m = consumeRe.exec(t)) !== null) {
        if (!seen.has('consumes')) { seen.add('consumes'); results.push({ role: 'consumes', position: m.index }); }
      }
      // Triggered-by: "$l[N stamina used:]" as a trigger condition label
      const triggerRe = /\$l\[[^\]]*stamina\s+used:/gi;
      while ((m = triggerRe.exec(t)) !== null) {
        if (!seen.has('triggered-by')) { seen.add('triggered-by'); results.push({ role: 'triggered-by', position: m.index }); }
      }
      return results;
    }
  },
  {
    // Flat healing actions ("Heal for N", "Heal N HP") as distinct from Regeneration
    // (which ticks per stack) or healing percentages. Covers the most common heal verb.
    name: 'Heal', kind: 'buff',
    detect: (t) => {
      // Match "Heal for" (most common) or bare "Heal N" patterns. Avoid matching
      // "Healing Reduction" or "healing as <Effect>" (caught by other detectors).
      const re = /\bheal\s+for\b/gi;
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      while ((m = re.exec(t)) !== null) {
        if (!seen.has('generates')) seen.set('generates', m.index);
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    // Health used as an explicit cost component. Two phrasings:
    //   "N $m[health:]"         — Djinn Lamp (cost listed with colon)
    //   "Convert N health into" — Vampiric Armor, Stone Skin Potions
    // Distinct from Maximum Health (which modifies the health pool size).
    name: 'Health', kind: 'meta',
    detect: (t): ImplicitMatch[] => {
      const results: ImplicitMatch[] = [];
      const seen = new Set<string>();
      const patterns = [
        // "N health:" or "N $style[health:]" — number immediately before, colon marks it as cost
        /\b\d+\s*(?:\$\w+\[)?health[\]]*:/gi,
        // "convert N health" — trading health for another resource
        /\bconvert\s+\d+\s+(?:\$\w+\[)?health\b/gi,
      ];
      let m: RegExpExecArray | null;
      for (const re of patterns) {
        while ((m = re.exec(t)) !== null) {
          if (!seen.has('consumes')) {
            seen.add('consumes');
            results.push({ role: 'consumes', position: m.index });
          }
        }
      }
      return results;
    }
  },
  {
    // Permanent weapon damage bonus granted by the item: "Give the <Star> $h[Weapon] +N damage (once)"
    // or more broadly "give ... +N damage". Only fires for explicit damage grants, not Empower stacks.
    name: 'Weapon Damage', kind: 'buff',
    detect: (t): ImplicitMatch[] => {
      const seen = new Map<EffectRole, number>();
      // Most specific: "+N damage (once)" — the game's phrasing for a one-time weapon upgrade
      const onceRe = /\+\d+\s+damage\s*\(\s*once\s*\)/i;
      let m = onceRe.exec(t);
      if (m && !seen.has('generates')) seen.set('generates', m.index);
      // Broader: "give ... +N damage" within the same clause
      if (!seen.has('generates')) {
        const giveRe = /\bgive\b[^.;]{0,60}\+\d+\s+damage\b/i;
        m = giveRe.exec(t);
        if (m) seen.set('generates', m.index);
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    // Permanent weapon damage gains: "gain N damage" (recurring on-hit, start of battle, etc.).
    // Distinct from Weapon Damage (one-time grant via "give +N damage (once)").
    name: 'Damage', kind: 'buff',
    detect: (t): ImplicitMatch[] => {
      const re = /\bgain\s+\+?\d+\s+damage\b/gi;
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      while ((m = re.exec(t)) !== null) {
        if (!seen.has('generates')) seen.set('generates', m.index);
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    // Speed at which an item's trigger fires. Covers both "trigger N% faster" (most items)
    // and "attack N% faster" (weapons like Null Blade, Crossblades).
    name: 'Trigger Speed', kind: 'buff',
    detect: (t): ImplicitMatch[] => {
      const seen = new Map<EffectRole, number>();
      const patterns = [
        /\btriggers?\s+\d+%\s+faster\b/gi,  // "Triggers 10% faster" and "trigger 30% faster"
        /\battack\s+\d+%\s+faster\b/gi,
      ];
      let m: RegExpExecArray | null;
      for (const re of patterns) {
        while ((m = re.exec(t)) !== null) {
          if (!seen.has('generates')) seen.set('generates', m.index);
        }
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    // Lifesteal expressed as a percentage stat rather than <Vampirism> stacks.
    // Common in Rubies ("Gain 35% lifesteal"), potions, and battle-rage items.
    name: 'Lifesteal', kind: 'buff',
    detect: (t): ImplicitMatch[] => {
      const re = /\blifesteal\b/gi;
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      while ((m = re.exec(t)) !== null) {
        if (!seen.has('generates')) seen.set('generates', m.index);
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    // Healing amplification — boosts the amount healed, distinct from generating
    // a heal (Heal detector) or reducing opponent healing (Healing Reduction).
    // Patterns: "healing is increased by N%", "heal N% more", "heals N% more".
    name: 'Healing', kind: 'buff',
    detect: (t): ImplicitMatch[] => {
      const patterns = [
        /\bhealing\s+is\s+increased\b/gi,
        /\bheals?\s+\d+%\s+more\b/gi,
      ];
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      for (const re of patterns) {
        while ((m = re.exec(t)) !== null) {
          if (!seen.has('generates')) seen.set('generates', m.index);
        }
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    // Opponent takes increased damage — the offensive counterpart to Damage Reduction.
    // Patterns: "your opponent takes +N% damage", "they take +N% damage".
    name: 'Vulnerability', kind: 'debuff',
    detect: (t): ImplicitMatch[] => {
      const patterns = [
        /\b(?:your\s+)?opponent\s+takes?\s+\+\d+%\s+(?:more\s+)?damage\b/gi,
        /\bthey\s+take\s+\+\d+%\s+(?:more\s+)?damage\b/gi,
      ];
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      for (const re of patterns) {
        while ((m = re.exec(t)) !== null) {
          if (!seen.has('generates')) seen.set('generates', m.index);
        }
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
    }
  },
  {
    // Passive protection from negative effects. Three forms:
    //   "Resist N debuffs/stuns/critical hits/<Token>" — explicit resist
    //   "protect your buffs from removal"              — buff-strip immunity
    //   "opponent's debuffs from cleansing"            — anti-cleanse lock
    name: 'Resistance', kind: 'buff',
    detect: (t): ImplicitMatch[] => {
      const patterns = [
        /\bresists?\b[^.;]{0,50}(?:debuffs?|stuns?|critical\s+hits?|<\w+>)/gi,
        /\bprotect\b[^.;]{0,40}\bbuffs?\b[^.;]{0,20}\bremoval\b/gi,
        /\bdebuffs?\b[^.;]{0,20}\bcleansing\b/gi,
      ];
      const seen = new Map<EffectRole, number>();
      let m: RegExpExecArray | null;
      for (const re of patterns) {
        while ((m = re.exec(t)) !== null) {
          if (!seen.has('generates')) seen.set('generates', m.index);
        }
      }
      return Array.from(seen.entries()).map(([role, position]) => ({ role, position }));
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
  // Deduplicate by (resolved-name, role, target) so the same effect can produce
  // both a plain chip and a (Self)/(Enemy) chip when the item targets differ.
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
    const e = EFFECTS[resolved];
    const kind: InteractionKind = (e && !('alias' in e)) ? (e as import('./types').Effect).kind : 'meta';
    const icon = effectIcon(resolved);
    // Scan all occurrences; group by (role, target) — each unique pair → one chip
    const chipMap = new Map<string, { role: EffectRole; target: 'self' | 'enemy' | undefined; position: number }>();
    const scanRe = new RegExp(`<(?:${aliases.join('|')})>`, 'g');
    let sm: RegExpExecArray | null;
    while ((sm = scanRe.exec(text)) !== null) {
      const role = classifyOccurrence(text, sm.index);
      const tgt = (role === 'generates') ? detectOccurrenceTarget(text, sm.index) : undefined;
      const key = `${role}:${tgt ?? ''}`;
      if (!chipMap.has(key)) chipMap.set(key, { role, target: tgt, position: sm.index });
      // "to both players" / "both players" after token → also emit the opposite-target chip.
      // e.g. "Inflict 3 <Blind> to $red[both] players" → plain chip (enemy default) + Self chip.
      if (role === 'generates') {
        const tokenEnd = text.indexOf('>', sm.index) + 1;
        const after = text.slice(tokenEnd, Math.min(text.length, tokenEnd + 35));
        if (/\bboth\b/i.test(after)) {
          const altTgt: 'self' | 'enemy' | undefined = tgt === 'self' ? undefined : 'self';
          const altKey = `${role}:${altTgt ?? ''}`;
          if (!chipMap.has(altKey)) chipMap.set(altKey, { role, target: altTgt, position: sm.index });
        }
      }
    }
    for (const { role, target, position } of chipMap.values()) {
      chips.push({ effect: resolved, kind, role, icon, navigable: true, position, target });
    }
  }

  // Implicit / meta — target field forwarded so Self/Enemy badges appear on these too
  for (const def of IMPLICIT_EFFECTS) {
    for (const { role, position, target } of def.detect(text)) {
      chips.push({ effect: def.name, kind: def.kind, role, icon: null, navigable: false, position, target });
    }
  }

  // Sort by text position so chips appear in reading order.
  chips.sort((a, b) => a.position - b.position);
  return chips;
}

export function itemsForCharacter(items: import('./types').Item[], charId: string) {
  return items.filter(it => Array.isArray(it.sockets) && it.sockets.includes(charId));
}

// --- Misc effects (for Effects page) -----------------------------------------
// All implicit effects except the generic Buff/Debuff meta-detectors, which
// don't map to a single distinct mechanic and would be too noisy to list.
export const MISC_EFFECTS: { name: string; kind: InteractionKind }[] = IMPLICIT_EFFECTS
  .filter(d => d.name !== 'Buff' && d.name !== 'Debuff')
  .map(d => ({ name: d.name, kind: d.kind }));

// Items that trigger the named implicit effect, grouped by role.
export function itemsByImplicitRole(
  items: import('./types').Item[],
  implicitName: string,
): Record<EffectRole, import('./types').Item[]> {
  const result: Record<EffectRole, import('./types').Item[]> = {
    generates: [], consumes: [], removes: [], scales: [], 'triggered-by': [],
  };
  const def = IMPLICIT_EFFECTS.find(d => d.name === implicitName);
  if (!def) return result;
  for (const it of items) {
    if (!it.effect) continue;
    const roles = new Set(def.detect(it.effect).map(m => m.role));
    for (const role of roles) result[role].push(it);
  }
  return result;
}

// Canonical pair key — always slug_a < slug_b
export function pairKey(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

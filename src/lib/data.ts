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

export type EffectRole = 'generates' | 'consumes' | 'removes' | 'scales';

// Classify how an item interacts with a buff/debuff by inspecting the immediate
// context preceding each <Token> occurrence in its effect text. An item can
// belong to multiple roles (e.g. Fancy Fencing Rapier both consumes and generates Luck).
//
// Verb gaps allow intervening <Tokens> (so "Use 7 <Block>, 7 <Luck>" tags both as
// consumed) but exclude clause separators (".", ";") to avoid bleeding across
// independent effects.
export function classifyItemEffect(text: string, effectName: string): EffectRole[] {
  if (!text) return [];
  const aliases = [effectName];
  if (effectName === 'Vampirism') aliases.push('Vampiric');
  if (effectName === 'Vampiric') aliases.push('Vampirism');
  const tokenAlt = aliases.join('|');
  const tokenRe = new RegExp(`<(?:${tokenAlt})>`, 'g');
  const roles = new Set<EffectRole>();

  // Window sizes for "looking back" before a token occurrence
  const SCALE_LOOKBACK = 30;   // "for each ", "per ", "at least N "
  const VERB_LOOKBACK = 50;    // "Gain N ", "Inflict N ", "Use N ", "Remove N "

  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(text)) !== null) {
    const before = text.slice(Math.max(0, m.index - VERB_LOOKBACK), m.index);
    const tail = before.slice(-SCALE_LOOKBACK);

    // Scaling: "for each X", "per X", "at least N X" — checked first because
    // these patterns can contain a "gain" that's not actually generating the effect.
    if (/(?:for each|per|chance for each)\s*$/i.test(tail) ||
        /\bat least\s+\S+\s*$/i.test(tail)) {
      roles.add('scales');
      continue;
    }

    // Removes: "Remove N <X>" / "Steal N <X>" — buff stripping from opponent.
    if (/\b(?:Remove|Steal|remove|steal)\b[^.;]{0,50}$/.test(before)) {
      roles.add('removes');
      continue;
    }

    // Generates: "Gain N <X>" / "Inflict N <X>". Checked BEFORE consumes so
    // that "Use 1 <Mana> to gain 3 <Heat>" tags Heat as generates (the closer,
    // unblocked verb to <Heat> is "gain"). Compound consumes still work
    // because periods between clauses block earlier "Gain" verbs from
    // matching across into the consume clause.
    if (/\b(?:Gain|Inflict|gain|inflict)\b[^.;]{0,50}$/.test(before)) {
      roles.add('generates');
      continue;
    }

    // Consumes: "Use N <X>" / "use N <X>". Allows compound forms like
    // "Use 7 <Block>, 7 <Luck>" by permitting intervening <Tokens>.
    if (/\b(?:Use|use)\b[^.;]{0,50}$/.test(before)) {
      roles.add('consumes');
      continue;
    }

    // Default: item references the effect without a clear verb pattern
    // (e.g. "<X> reached:" thresholds, "While you have <X>"). Treat as scales.
    roles.add('scales');
  }

  return Array.from(roles);
}

export function itemsByRole(items: import('./types').Item[], effectName: string): Record<EffectRole, import('./types').Item[]> {
  const result: Record<EffectRole, import('./types').Item[]> = { generates: [], consumes: [], removes: [], scales: [] };
  for (const it of itemsWithToken(items, effectName)) {
    const roles = classifyItemEffect(it.effect ?? '', effectName);
    for (const r of roles) result[r].push(it);
  }
  return result;
}

// For an item, list each known buff/debuff it touches and what roles it plays.
// Used in the detail panel for an at-a-glance interaction summary.
export function effectRolesForItem(item: import('./types').Item): { effect: string; roles: EffectRole[] }[] {
  const text = item.effect;
  if (!text) return [];
  const seen = new Set<string>();
  const re = /<([A-Z][a-zA-Z]+)>/g;
  let m: RegExpExecArray | null;
  const out: { effect: string; roles: EffectRole[] }[] = [];
  while ((m = re.exec(text)) !== null) {
    const tok = m[1];
    const resolved = resolveEffect(tok);
    if (!resolved || seen.has(resolved)) continue;
    seen.add(resolved);
    const roles = classifyItemEffect(text, resolved);
    if (roles.length > 0) out.push({ effect: resolved, roles });
  }
  return out;
}

export function itemsForCharacter(items: import('./types').Item[], charId: string) {
  return items.filter(it => Array.isArray(it.sockets) && it.sockets.includes(charId));
}

// Canonical pair key — always slug_a < slug_b
export function pairKey(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

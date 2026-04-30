import type { Character, EffectEntry, Strategy, TierRow } from './types';

export const EFFECTS: Record<string, EffectEntry> = {
  Regeneration: { kind: 'buff', color: '#3a8a52', icon: '/images/effects/Regeneration.png',
    short: 'Heals over time.', formula: 'Heals 1 HP per Regeneration stack on a tick.',
    note: 'Often gained from Nature items (Banana, Ruby Egg).' },
  Luck: { kind: 'buff', color: '#c08a3e', icon: '/images/effects/Luck.png',
    short: 'Increases accuracy.', formula: '+2% accuracy (flat) per stack.',
    note: 'Reaper synergies — Snake Pet → Rapier scaling.' },
  Spikes: { kind: 'buff', color: '#6b6157', icon: '/images/effects/Spikes.png',
    short: 'Reflects damage.', formula: 'Reflects damage equal to Spikes stacks on melee/ranged hits.',
    note: 'Berzerker / Thorn Whip lean heavily into stacking.' },
  Mana: { kind: 'buff', color: '#3a5a8a', icon: '/images/effects/Mana.png',
    short: 'Resource for Magic items.', formula: 'Stored, consumed by Magic-tagged effects.',
    note: 'Mage core resource.' },
  Vampirism: { kind: 'buff', color: '#8a3324', icon: '/images/effects/Vampirism.png',
    short: 'Lifesteal scaling.', formula: '+~10% lifesteal per stack on hits.',
    note: 'Reaper / Vampiric build cornerstone.' },
  Heat: { kind: 'buff', color: '#d96952', icon: '/images/effects/Heat.png',
    short: 'Speeds up your attacks.', formula: '+2% attack speed per stack.',
    note: 'Counters Cold/Freeze.' },
  Empower: { kind: 'buff', color: '#b27a18', icon: '/images/effects/Empower.png',
    short: 'Adds bonus damage.', formula: '+1 damage to next attack per Empower (consumed on use).',
    note: 'Often a single big-hit accelerant.' },
  Block: { kind: 'buff', color: '#5a4632', icon: '/images/effects/Block.png',
    short: 'Absorbs incoming damage.', formula: '1 Block soaks 1 damage; depletes first.',
    note: 'Most armor/shields generate Block at start of battle.' },
  Poison: { kind: 'debuff', color: '#5a8a3a', icon: '/images/effects/Poison.png',
    short: 'Damage over time.', formula: 'Each tick: deal 1 dmg per Poison stack, then −1 stack.',
    note: 'Pyromancer/Dark builds; cleansed by potions.' },
  Blind: { kind: 'debuff', color: '#3d2f22', icon: '/images/effects/Blind.png',
    short: 'Reduces accuracy.', formula: '−2% accuracy per stack (flat).',
    note: 'Pocket Sand, Sir Sand, Broom on-hit.' },
  Cold: { kind: 'debuff', color: '#3a6a8a', icon: '/images/effects/Cold.png',
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

export function itemsForCharacter(items: import('./types').Item[], charId: string) {
  return items.filter(it => Array.isArray(it.sockets) && it.sockets.includes(charId));
}

// Canonical pair key — always slug_a < slug_b
export function pairKey(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

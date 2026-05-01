'use client';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { Item } from '@/lib/types';
import {
  CHARACTERS, EFFECTS, STRATEGIES, TIER, RARITY_ORDER,
  rarityKey, formatDamage, resolveEffect, effectIcon, tokenKind,
  itemsWithToken, itemsForCharacter, itemsByRole, effectRolesForItem,
} from '@/lib/data';
import type { EffectRole, InteractionChip } from '@/lib/data';
import ItemIcon from '@/components/ItemIcon';
import EffectText from '@/components/EffectText';
import ShapeGrid from '@/components/ShapeGrid';
import ConnectionsPanel from '@/components/ConnectionsPanel';
import CommentsPanel from '@/components/CommentsPanel';

type Tab = 'home' | 'items' | 'characters' | 'effects' | 'strategies';
const TABS: Tab[] = ['home', 'items', 'characters', 'effects', 'strategies'];

// --- URL state sync (deep links) ---
function readUrlState(): { tab?: Tab; item?: string; char?: string; effect?: string } {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const tab = p.get('tab');
  return {
    tab: tab && (TABS as string[]).includes(tab) ? (tab as Tab) : undefined,
    item: p.get('item') ?? undefined,
    char: p.get('char') ?? undefined,
    effect: p.get('effect') ?? undefined,
  };
}

function writeUrlState(
  s: { tab: Tab; item?: string | null; char?: string | null; effect?: string | null },
  method: 'push' | 'replace' = 'push',
) {
  if (typeof window === 'undefined') return;
  const p = new URLSearchParams();
  if (s.tab && s.tab !== 'home') p.set('tab', s.tab);
  if (s.item) p.set('item', s.item);
  if (s.char) p.set('char', s.char);
  if (s.effect) p.set('effect', s.effect);
  const qs = p.toString();
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  if (method === 'push') window.history.pushState(null, '', url);
  else window.history.replaceState(null, '', url);
}

function Topbar({ tab, onTab, theme, onToggleTheme, gameFont, onToggleFont }: {
  tab: Tab; onTab: (t: Tab) => void; theme: string; onToggleTheme: () => void;
  gameFont: boolean; onToggleFont: () => void;
}) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand" onClick={() => onTab('home')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="crest"><img src="/images/ui/Backpack_icon.png" alt="" /></div>
          <div className="brand-name">Strategy Codex<small>Backpack Battles wiki</small></div>
        </div>
        <nav className="nav">
          {(['home','characters','items','effects','strategies'] as Tab[]).map(t => (
            <button key={t} className={tab === t ? 'active' : ''} onClick={() => onTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
        <button className={`font-toggle${gameFont ? ' game' : ''}`} onClick={onToggleFont} title={gameFont ? 'Switch to system font' : 'Switch to game font'}>
          {gameFont ? 'Aa' : 'Aa'}
        </button>
        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? '☾ Dark' : '☀ Light'}
        </button>
      </div>
    </header>
  );
}

function HomePage({ items, onTab, onSelectItem }: { items: Item[]; onTab: (t: Tab) => void; onSelectItem: (i: Item) => void }) {
  const showcase = useMemo(() => {
    const wanted = ['WoodenSword','Hammer','Eggscalibur','HealthPotion','Goobert','BloodAmulet','MagicStaff','LeatherArmor','SpikedShield','Stone','BurningTorch','Shovel','RubyEgg','Pineapple','BloodyDagger','Manathirst'];
    const map = Object.fromEntries(items.map(i => [i.slug, i]));
    return wanted.map(s => map[s]).filter(Boolean).slice(0, 16);
  }, [items]);

  const tierMap = useMemo(() => {
    const m = Object.fromEntries(items.map(i => [i.slug, i]));
    return TIER.map(t => ({ tier: t.tier, items: t.items.map(s => m[s]).filter(Boolean) }));
  }, [items]);

  const effectCount = Object.values(EFFECTS).filter(e => !('alias' in e)).length;

  return (
    <div>
      <section className="hero">
        <div>
          <div className="eyebrow">Backpack Battles · Strategy Codex</div>
          <h1>Win the next <em>backpack</em>.</h1>
          <p className="lede">A field guide to Backpack Battles — every item, every status effect, every character, and the strategies that string them together.</p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => onTab('items')}>Browse {items.length} items →</button>
            <button className="btn" onClick={() => onTab('strategies')}>Read strategies</button>
          </div>
        </div>
        <div className="hero-art-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="hero-bag-deco"><img src="/images/ui/Backpack_icon.png" alt="" /></div>
          <div className="hero-art">
            {Array.from({ length: 16 }).map((_, i) => {
              const it = showcase[i];
              return (
                <div key={i} className={`slot${it ? '' : ' empty'}`} title={it?.name} onClick={() => it && onSelectItem(it)}>
                  {it && <ItemIcon item={it} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="feature-row">
        {[
          { k: 'characters' as Tab, icon: 'C', count: CHARACTERS.length, h: 'Characters', p: 'Seven classes, each with a signature synergy lane.' },
          { k: 'items' as Tab, icon: 'I', count: items.length, h: 'Items', p: 'Weapons, food, accessories — searchable with shape grids.' },
          { k: 'effects' as Tab, icon: 'E', count: effectCount, h: 'Status Effects', p: 'Buffs and debuffs with formulas and item sources.' },
          { k: 'strategies' as Tab, icon: 'S', count: STRATEGIES.length, h: 'Strategies', p: 'Build guides — what to grab, when, and why.' },
        ].map(f => (
          <div key={f.k} className="feature" onClick={() => onTab(f.k)}>
            <div className="icon">{f.icon}</div>
            <span className="count">{f.count}</span>
            <h3>{f.h}</h3>
            <p>{f.p}</p>
          </div>
        ))}
      </section>

      <section className="home-grid">
        <div>
          <div className="section-head"><span className="eyebrow">Featured</span><h2>Strategies worth trying</h2></div>
          <div className="featured-builds">
            {STRATEGIES.slice(0, 3).map(s => (
              <div key={s.id} className="strat-card" onClick={() => onTab('strategies')} style={{ '--strat-color': s.color } as React.CSSProperties}>
                <div className="strat-banner" />
                <div className="body">
                  <h3>{s.title}</h3>
                  <div className="tag-row">
                    <span className="pill accent">{s.char}</span>
                    {s.tags.slice(0, 2).map(t => <span key={t} className="pill">{t}</span>)}
                  </div>
                  <p>{s.excerpt}</p>
                  <div className="meta"><span>{s.items.length} key items</span><span>Read →</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-head"><span className="eyebrow">Meta</span><h2>Tier list peek</h2></div>
          <div className="tier-list">
            {tierMap.map(row => (
              <div key={row.tier} className="tier-row">
                <div className={`tier-badge tier-${row.tier}`}>{row.tier}</div>
                <div className="picks">
                  {row.items.map(it => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={it.gid} src={`/images/items/${it.slug}.png`} title={it.name} alt={it.name}
                      onClick={() => onSelectItem(it)}
                      onError={(e) => { (e.target as HTMLImageElement).src = it.image ?? ''; }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const TYPE_ICONS = new Set(['Dark', 'Effect', 'Fire', 'Holy', 'Ice', 'Magic', 'Melee', 'Musical', 'Nature', 'Ranged', 'Treasure', 'Vampiric']);
const TYPE_ICON_MAP: Record<string, string> = { 'Melee Weapon': 'Melee', 'Ranged Weapon': 'Ranged' };

function DetailPanel({ item, allItems, onClose, onSelectItem, onNavigateEffect }: {
  item: Item; allItems: Item[]; onClose: () => void;
  onSelectItem: (i: Item) => void; onNavigateEffect: (e: string) => void;
}) {
  const k = rarityKey(item.rarity);

  const related = useMemo(() => {
    const rels: Item[] = [];
    if (item.extraTypes?.length) {
      for (const it of allItems) {
        if (it.gid === item.gid) continue;
        if (it.extraTypes?.some(t => item.extraTypes!.includes(t))) rels.push(it);
        if (rels.length >= 6) break;
      }
    }
    if (rels.length < 4) {
      for (const it of allItems) {
        if (it.gid === item.gid || rels.find(r => r.gid === it.gid)) continue;
        if (it.type === item.type) rels.push(it);
        if (rels.length >= 6) break;
      }
    }
    return rels.slice(0, 6);
  }, [item, allItems]);

  const tokensMentioned = useMemo(() => {
    if (!item.effect) return [];
    const set = new Set<string>();
    const re = /<([^>]+)>/g; let m: RegExpExecArray | null;
    while ((m = re.exec(item.effect)) !== null) set.add(m[1]);
    return Array.from(set);
  }, [item.effect]);

  const dividerSrc = `/images/tooltip/Divider2_${item.rarity}.webp`;

  return (
    <aside className="detail-panel has-frame" style={{ '--rarity': `var(--r-${k})`, '--frame-url': `url('/images/tooltip/TooltipBase_${item.rarity}.webp')` } as React.CSSProperties}>
      <div className="detail-sticky-head">
        <button className="detail-close" onClick={onClose}>×</button>
        <div className="detail-head">
        <div className="icon-wrap"><ItemIcon key={item.gid} item={item} /></div>
        <div>
          <h2 className="detail-name">{item.name}</h2>
          <div className="detail-sub">
            <span className="rarity-badge" style={{ background: `var(--r-${k})` }}>{item.rarity}</span>
            <span className="dot" /><span>{item.type}</span>
            {TYPE_ICON_MAP[item.type] && (
              // eslint-disable-next-line @next/next/no-img-element
              <span className="type-icon-chip" title={item.type}><img src={`/images/icons/Icon_${TYPE_ICON_MAP[item.type]}.webp`} alt={item.type} /></span>
            )}
            {item.extraTypes?.map(t => TYPE_ICONS.has(t) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <span key={t} className="type-icon-chip" title={t}><img src={`/images/icons/Icon_${t}.webp`} alt={t} /></span>
            ) : (
              <span key={t} className="type-chip">{t}</span>
            ))}
          </div>
          {item.sockets && item.sockets.length > 0 && (
            <div className="detail-sub" style={{ marginTop: 6 }}>
              {item.sockets.map(s => {
                const c = CHARACTERS.find(c => c.id === s);
                return c ? (
                  <span key={s} className="char-chip" style={{ '--char-color': c.color } as React.CSSProperties}>
                    <span className="av">{c.icon ? <img src={c.icon} alt="" /> : c.name[0]}</span>
                    {c.name}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tooltip-divider" src={dividerSrc} alt="" />
      </div>{/* end detail-sticky-head */}
      <div className="detail-scroll">

      {(item.cost != null || item.damage || item.cd != null || item.accuracy != null) && (
        <div className="stat-row">
          {item.cost != null && <div className="stat-cell"><div className="lbl">Cost</div><div className="val">{item.cost}<img src="/images/ui/GoldCoin.png" alt="" className="gold-coin" /></div></div>}
          {item.damage && <div className="stat-cell"><div className="lbl">Damage</div><div className="val">{formatDamage(item.damage)}</div></div>}
          {item.cd != null && <div className="stat-cell"><div className="lbl">Cooldown</div><div className="val">{item.cd}<span style={{ fontSize: '0.7em', color: 'var(--ink-3)' }}>s</span></div></div>}
          {item.accuracy != null && <div className="stat-cell"><div className="lbl">Accuracy</div><div className="val">{item.accuracy}<span style={{ fontSize: '0.7em', color: 'var(--ink-3)' }}>%</span></div></div>}
        </div>
      )}

      {item.effect && (
        <div className="detail-section">
          <h4>Effect</h4>
          <EffectText text={item.effect} onTokenClick={(t) => { const r = resolveEffect(t); if (r) onNavigateEffect(r); }} />
        </div>
      )}

      {item.shape && item.shape.length > 0 && (
        <div className="detail-section">
          <h4>Shape — {item.shape.length}×{Math.max(...item.shape.map(r => r.length))} grid</h4>
          <ShapeGrid shape={item.shape} itemSlug={item.slug} itemImage={item.image} />
          <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)', marginTop: 8 }}>
            Filled cells occupy backpack space.{item.shape.flat().includes(2) ? ' Sockets accept embedded items.' : ''}
          </div>
        </div>
      )}

      {(() => {
        const chips: InteractionChip[] = effectRolesForItem(item);
        if (chips.length === 0) return null;
        const ROLE_LABEL: Record<EffectRole, string> = {
          generates: 'Generates', consumes: 'Consumes', removes: 'Removes',
          scales: 'Scales with', 'triggered-by': 'Triggered by',
        };
        return (
          <div className="detail-section">
            <h4>Interactions</h4>
            <div className="interactions-chips">
              {chips.map((c, i) => (
                <span
                  key={`${c.effect}-${c.role}-${i}`}
                  className={`ix-chip role-${c.role} kind-${c.kind}${c.navigable ? ' navigable' : ''}${c.target ? ` target-${c.target}` : ''}`}
                  onClick={() => c.navigable && onNavigateEffect(c.effect)}
                  title={c.navigable ? `View ${c.effect} effect details` : undefined}
                >
                  <span className="ix-role">{ROLE_LABEL[c.role]}</span>
                  <span className="ix-effect">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {c.icon && <img src={c.icon} alt="" />}
                    <span className="ix-name">
                      {c.effect}
                      {c.target && <span className={`ix-target ${c.target}`}>{c.target === 'self' ? 'Self' : 'Enemy'}</span>}
                    </span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        );
      })()}

      {tokensMentioned.length > 0 && (() => {
        // References section: only show tokens that didn't make it into Interactions
        // (i.e. element/type tokens like Star, Diamond, Treasure, plus Gold).
        const interactionEffects = new Set(effectRolesForItem(item).map(c => c.effect));
        const others = tokensMentioned.filter(t => !interactionEffects.has(resolveEffect(t) ?? ''));
        if (others.length === 0) return null;
        return (
          <div className="detail-section">
            <h4>References</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {others.map(t => {
                const resolved = resolveEffect(t);
                const icon = effectIcon(t);
                const kind = tokenKind(t);
                if (t === 'Gold') return (
                  <span key={t} className="tag elem no-icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/ui/GoldCoin.png" alt="" />Gold
                  </span>
                );
                return (
                  <span key={t} className={`tag ${kind}${!icon ? ' no-icon' : ''}`}
                    style={{ cursor: resolved ? 'pointer' : 'default' }}
                    onClick={() => resolved && onNavigateEffect(resolved)}>
                    {icon && <img src={icon} alt="" />}{t}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })()}

      <ConnectionsPanel item={item} allItems={allItems} onSelectItem={onSelectItem} onNavigateEffect={onNavigateEffect} />
      <CommentsPanel itemSlug={item.slug} />

      {related.length > 0 && (
        <div className="detail-section">
          <h4>Related items</h4>
          <div className="crosslinks">
            {related.map(r => (
              <div key={r.gid} className="crosslink" onClick={() => onSelectItem(r)}>
                <ItemIcon item={r} size={32} />
                <div><div className="nm">{r.name}</div><div className="ty">{r.type}</div></div>
                <span className="rarity-badge" style={{ background: `var(--r-${rarityKey(r.rarity)})` }}>{r.rarity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </aside>
  );
}

function ItemsPage({ items, selected, onSelect, onClose, onNavigateEffect, focusCharId, focusEffect, clearFocus }: {
  items: Item[]; selected: Item | null;
  onSelect: (i: Item) => void; onClose: () => void;
  onNavigateEffect: (e: string) => void;
  focusCharId: string | null; focusEffect: string | null; clearFocus: () => void;
}) {
  const [query, setQuery] = useState('');
  const [rarityFs, setRarityFs] = useState<string[]>([]);
  const [typeFs, setTypeFs] = useState<string[]>([]);
  const [typeDropOpen, setTypeDropOpen] = useState(false);
  const typeDropRef = useRef<HTMLDivElement>(null);
  const [charFs, setCharFs] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const toggleArr = (arr: string[], val: string): string[] =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  useEffect(() => { if (focusCharId) setCharFs([focusCharId]); }, [focusCharId]);
  useEffect(() => { setPage(1); }, [query, rarityFs, typeFs, charFs, focusEffect]);

  useEffect(() => {
    if (!typeDropOpen) return;
    const handler = (e: MouseEvent) => {
      if (!typeDropRef.current?.contains(e.target as Node)) setTypeDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [typeDropOpen]);

  const types = useMemo(() => Array.from(new Set(items.map(i => i.type))).sort(), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items;
    if (charFs.length > 0) {
      list = list.filter(it => charFs.some(c =>
        c === 'Neutral' ? !it.sockets?.length : Array.isArray(it.sockets) && it.sockets.includes(c)
      ));
    }
    if (focusEffect) list = itemsWithToken(list, focusEffect);
    if (q) list = list.filter(i => i.name.toLowerCase().includes(q) || (i.effect ?? '').toLowerCase().includes(q));
    if (rarityFs.length > 0) list = list.filter(i => rarityFs.includes(i.rarity));
    if (typeFs.length > 0) list = list.filter(i => typeFs.includes(i.type));
    const rarityOrd = Object.fromEntries(RARITY_ORDER.map((r, i) => [r, i]));
    // Neutral (no sockets) = 0, then classes in CHARACTERS order (1-based), unknown = 99
    const classOrd: Record<string, number> = { Neutral: 0 };
    CHARACTERS.forEach((c, i) => { classOrd[c.id] = i + 1; });
    const classKey = (it: Item) => it.sockets?.length ? classOrd[it.sockets[0]] ?? 99 : 0;
    return [...list].sort((a, b) =>
      (rarityOrd[a.rarity] ?? 99) - (rarityOrd[b.rarity] ?? 99) ||
      classKey(a) - classKey(b) ||
      a.name.localeCompare(b.name)
    );
  }, [items, query, rarityFs, typeFs, charFs, focusEffect]);

  const PAGE_SIZE = 48;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {focusEffect && (
        <div className="scaffold-note" style={{ borderColor: 'var(--accent)', borderStyle: 'solid' }}>
          <strong>Filtered:</strong> items that interact with <em>{focusEffect}</em>.
          <button className="btn" style={{ marginLeft: 'auto', padding: '4px 10px', fontSize: '0.8rem' }} onClick={clearFocus}>Clear</button>
        </div>
      )}
      <div className="items-toolbar">
        <div className="search-box">
          <span className="icon">⌕</span>
          <input type="text" placeholder="Search items, effects, types…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="count-pill">{filtered.length} / {items.length}</div>
      </div>
      <div className="filters" style={{ marginBottom: 12 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className={`char-chip${charFs.includes('Neutral') ? ' active' : ''}`} onClick={() => setCharFs(prev => toggleArr(prev, 'Neutral'))} style={{ '--char-color': '#94a3b8' } as React.CSSProperties}>
          <span className="av"><img src="/images/chars/NeutralIcon.webp" alt="" /></span>
          Neutral
        </span>
        {CHARACTERS.map(c => (
          <span key={c.id} className={`char-chip${charFs.includes(c.id) ? ' active' : ''}`} onClick={() => setCharFs(prev => toggleArr(prev, c.id))} style={{ '--char-color': c.color } as React.CSSProperties}>
            <span className="av">{c.icon ? <img src={c.icon} alt="" /> : c.name[0]}</span>
            {c.name}
          </span>
        ))}
      </div>
      <div className="filters">
        {RARITY_ORDER.map(r => {
          const k = rarityKey(r);
          return (
            <button key={r} className={`filter-chip${rarityFs.includes(r) ? ' active' : ''}`} onClick={() => setRarityFs(prev => toggleArr(prev, r))}>
              <span className="swatch" style={{ background: `var(--r-${k})` }} />{r}
            </button>
          );
        })}
      </div>
      <div className="filters type-filter-row" ref={typeDropRef}>
        <button
          className={`filter-chip type-drop-btn${typeFs.length > 0 ? ' active' : ''}`}
          onClick={() => setTypeDropOpen(o => !o)}
        >
          {typeFs.length === 0 ? 'All types' : typeFs.length === 1 ? typeFs[0] : `${typeFs.length} types`}
          <span className="drop-caret">{typeDropOpen ? '▲' : '▼'}</span>
        </button>
        {typeDropOpen && (
          <div className="type-dropdown">
            <button className={`type-drop-item${typeFs.length === 0 ? ' checked' : ''}`} onClick={() => setTypeFs([])}>
              <span className="drop-check" />All types
            </button>
            {types.map(t => (
              <button key={t} className={`type-drop-item${typeFs.includes(t) ? ' checked' : ''}`}
                onClick={() => setTypeFs(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}>
                <span className="drop-check" />{t}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={`items-layout${selected ? ' with-detail' : ''}`}>
        <div className="items-grid">
          {filtered.length === 0 && <div className="empty">No items match those filters.</div>}
          {paginated.map(it => {
            const k = rarityKey(it.rarity);
            const charId = Array.isArray(it.sockets) && it.sockets[0];
            const char = charId ? CHARACTERS.find(c => c.id === charId) : null;
            return (
              <div key={it.gid} className={`item-card${selected?.gid === it.gid ? ' selected' : ''}`}
                style={{ '--rarity': `var(--r-${k})` } as React.CSSProperties} onClick={() => onSelect(it)}>
                <ItemIcon item={it} />
                {char && (
                  <span className={`char-badge${!char.icon ? ' fallback' : ''}`} style={{ '--char-color': char.color } as React.CSSProperties}>
                    {char.icon ? <img src={char.icon} alt="" /> : char.name[0]}
                  </span>
                )}
                <div className="item-meta">
                  <h4 className="item-name" title={it.name}>{it.name}</h4>
                  <div className="item-sub">
                    <span className="rarity-badge" style={{ background: `var(--r-${k})` }}>{it.rarity}</span>
                    <span>·</span><span>{it.type}</span>
                  </div>
                  <div className="item-stats">
                    {it.cost != null && <span className="stat"><span className="lbl">Cost</span><strong>{it.cost}</strong></span>}
                    {it.damage && <span className="stat"><span className="lbl">Dmg</span><strong>{formatDamage(it.damage)}</strong></span>}
                    {it.cd != null && <span className="stat"><span className="lbl">CD</span><strong>{it.cd}s</strong></span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {selected && (
          <DetailPanel item={selected} allItems={items} onClose={onClose}
            onSelectItem={onSelect} onNavigateEffect={onNavigateEffect} />
        )}
      </div>
      {pageCount > 1 && (
        <div className="pagination">
          <button className="pg-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>←</button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map(n => (
            <button key={n} className={`pg-btn${n === page ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
          ))}
          <button className="pg-btn" onClick={() => setPage(p => p + 1)} disabled={page === pageCount}>→</button>
        </div>
      )}
    </div>
  );
}

function CharactersPage({ items, onFilterChar }: { items: Item[]; onFilterChar: (id: string) => void }) {
  return (
    <div>
      <div className="scaffold-note"><strong>Scaffold:</strong> portraits and descriptions are placeholders — fill in HP, starting kit, and ability text as you collect data.</div>
      <div className="chars-grid">
        {CHARACTERS.map(c => {
          const count = itemsForCharacter(items, c.id).length;
          return (
            <div key={c.id} className="char-card" style={{ '--char-color': c.color } as React.CSSProperties} onClick={() => onFilterChar(c.id)}>
              <div className="portrait">{c.icon ? <img src={c.icon} alt={c.name} /> : c.name[0]}</div>
              <h3>{c.name}</h3>
              <div className="role">{c.role}</div>
              <div className="desc">{c.description}</div>
              <div className="signature">
                <strong>Signature:</strong> {c.signature}
                <span className="item-count">{count} items locked to this class · click to view</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EffectsPage({ items, onFilterEffect, onSelectItem }: {
  items: Item[]; onFilterEffect: (e: string) => void; onSelectItem: (i: Item) => void;
}) {
  const buffs = Object.entries(EFFECTS).filter(([, v]) => !('alias' in v) && (v as import('@/lib/types').Effect).kind === 'buff') as [string, import('@/lib/types').Effect][];
  const debuffs = Object.entries(EFFECTS).filter(([, v]) => !('alias' in v) && (v as import('@/lib/types').Effect).kind === 'debuff') as [string, import('@/lib/types').Effect][];

  function RoleGroup({ label, list }: { label: string; list: Item[] }) {
    const [expanded, setExpanded] = useState(false);
    const COLLAPSED = 6;
    if (list.length === 0) return null;
    const visible = expanded ? list : list.slice(0, COLLAPSED);
    return (
      <div className="role-group">
        <div className="role-label">{label} <span className="role-count">{list.length}</span></div>
        <div className="source-list">
          {visible.map(it => (
            <button
              key={it.gid}
              className="source-item"
              onClick={() => onSelectItem(it)}
              style={{ '--rarity': `var(--r-${rarityKey(it.rarity)})` } as React.CSSProperties}
              title={`${it.name} · ${it.rarity}`}
            >
              <ItemIcon item={it} size={28} />
              <span className="source-name">{it.name}</span>
            </button>
          ))}
        </div>
        {list.length > COLLAPSED && (
          <button className="source-more" onClick={() => setExpanded(x => !x)}>
            {expanded ? 'Show less' : `Show ${list.length - COLLAPSED} more`}
          </button>
        )}
      </div>
    );
  }

  const ROLE_LABELS: Record<EffectRole, string> = {
    generates: 'Generates',
    consumes: 'Consumes',
    removes: 'Removes',
    scales: 'Scales with',
    'triggered-by': 'Triggered by',
  };

  function EffectCard({ name, e }: { name: string; e: import('@/lib/types').Effect }) {
    const byRole = useMemo(() => itemsByRole(items, name), [items, name]);
    const total = byRole.generates.length + byRole.consumes.length + byRole.removes.length + byRole.scales.length + byRole['triggered-by'].length;
    return (
      <div className="effect-card" data-effect={name} style={{ '--effect-color': e.color } as React.CSSProperties}>
        <h3>
          <span className={`glyph${!e.icon ? ' fallback' : ''}`}>
            {e.icon ? <img src={e.icon} alt="" /> : name[0]}
          </span>
          {name}
        </h3>
        <div className="kind">{e.kind === 'buff' ? 'Buff' : 'Debuff'}</div>
        <p style={{ margin: '0 0 10px', fontSize: '0.9rem' }}>{e.short}</p>
        <div className="formula"><strong style={{ color: 'var(--accent)' }}>Effect:</strong> {e.formula}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)', marginBottom: 14 }}>{e.note}</div>
        {total > 0 && (
          <div className="sources-section">
            <div className="sources-head">
              <span>Items</span>
              <button className="sources-filter" onClick={() => onFilterEffect(name)}>Filter all →</button>
            </div>
            {(['generates', 'consumes', 'removes', 'scales', 'triggered-by'] as EffectRole[]).map(role => (
              <RoleGroup key={role} label={ROLE_LABELS[role]} list={byRole[role]} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="scaffold-note"><strong>Scaffold:</strong> formulas reflect the described mechanics. Refine numbers and edge cases as you confirm them.</div>
      <div className="effects-section">
        <div className="group-title">Buffs</div>
        <div className="effects-grid">{buffs.map(([name, e]) => <EffectCard key={name} name={name} e={e} />)}</div>
      </div>
      <div className="effects-section">
        <div className="group-title">Debuffs</div>
        <div className="effects-grid">{debuffs.map(([name, e]) => <EffectCard key={name} name={name} e={e} />)}</div>
      </div>
    </div>
  );
}

function StrategiesPage({ items, onSelectItem }: { items: Item[]; onSelectItem: (i: Item) => void }) {
  return (
    <div>
      <div className="scaffold-note"><strong>Scaffold:</strong> short article cards. Expand with full item lists and playstyle notes.</div>
      <div className="strats-grid">
        {STRATEGIES.map(s => {
          const linked = s.items.map(slug => items.find(i => i.slug === slug)).filter(Boolean) as Item[];
          return (
            <div key={s.id} className="strat-card" style={{ '--strat-color': s.color } as React.CSSProperties}>
              <div className="strat-banner" />
              <div className="body">
                <h3>{s.title}</h3>
                <div className="tag-row">
                  <span className="pill" style={{ background: s.color, color: '#fff', borderColor: s.color }}>{s.char}</span>
                  {s.tags.map(t => <span key={t} className="pill">{t}</span>)}
                </div>
                <p>{s.excerpt}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  {linked.map(it => (
                    <span key={it.gid} className="crosslink" style={{ padding: '4px 6px', display: 'inline-flex' }} onClick={() => onSelectItem(it)}>
                      <ItemIcon item={it} size={24} /><span className="nm" style={{ fontSize: '0.82rem' }}>{it.name}</span>
                    </span>
                  ))}
                </div>
                <div className="meta"><span>{s.author ?? 'community'}{s.updated ? ` · ${s.updated}` : ''}</span><span>Read →</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [tab, setTab] = useState<Tab>(() => readUrlState().tab ?? 'home');
  const [selected, setSelected] = useState<Item | null>(null);
  const [theme, setTheme] = useState('light');
  const [gameFont, setGameFont] = useState(true);
  const [focusCharId, setFocusCharId] = useState<string | null>(() => readUrlState().char ?? null);
  const [focusEffect, setFocusEffect] = useState<string | null>(() => readUrlState().effect ?? null);
  const hydratedRef = useRef(false);
  const skipPushRef = useRef(false);

  useEffect(() => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('bpb_theme') ?? (systemDark ? 'dark' : 'light');
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
    const savedFont = localStorage.getItem('bpb_font') ?? 'game';
    setGameFont(savedFont === 'game');
    document.documentElement.setAttribute('data-font', savedFont);
    // Follow system preference changes only if user hasn't manually set a preference
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('bpb_theme')) {
        const next = e.matches ? 'dark' : 'light';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    fetch('/items.json').then(r => r.json()).then(setItems);
  }, []);

  // Hydrate `selected` from URL once items are available
  useEffect(() => {
    if (!items || hydratedRef.current) return;
    const slug = readUrlState().item;
    if (slug) {
      const it = items.find(i => i.slug === slug);
      if (it) setSelected(it);
    }
    hydratedRef.current = true;
  }, [items]);

  // Sync state → URL with pushState so back/forward cycle through nav actions.
  // Dedup against current URL so hydration doesn't add a spurious entry.
  useEffect(() => {
    if (!hydratedRef.current) return;
    if (skipPushRef.current) {
      // popstate just updated state from URL — don't push back
      skipPushRef.current = false;
      return;
    }
    const cur = readUrlState();
    const wantItem = selected?.slug;
    const wantChar = focusCharId ?? undefined;
    const wantEffect = focusEffect ?? undefined;
    if (
      (cur.tab ?? 'home') === tab &&
      cur.item === wantItem &&
      cur.char === wantChar &&
      cur.effect === wantEffect
    ) {
      return; // URL already matches; nothing to push
    }
    writeUrlState({ tab, item: wantItem, char: focusCharId, effect: focusEffect }, 'push');
  }, [tab, selected, focusCharId, focusEffect]);

  // Browser back/forward → re-derive state from URL
  useEffect(() => {
    if (!items) return;
    const handler = () => {
      skipPushRef.current = true;
      const u = readUrlState();
      setTab(u.tab ?? 'home');
      if (u.item) {
        const it = items.find(i => i.slug === u.item);
        setSelected(it ?? null);
      } else {
        setSelected(null);
      }
      setFocusCharId(u.char ?? null);
      setFocusEffect(u.effect ?? null);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [items]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('bpb_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }, [theme]);

  const toggleFont = useCallback(() => {
    const next = gameFont ? 'system' : 'game';
    setGameFont(!gameFont);
    localStorage.setItem('bpb_font', next);
    document.documentElement.setAttribute('data-font', next);
  }, [gameFont]);

  const goTab = useCallback((t: Tab, opts?: { charId?: string; effect?: string }) => {
    setTab(t);
    if (t === 'items') {
      if (opts?.charId) { setFocusCharId(opts.charId); setFocusEffect(null); setSelected(null); }
      else if (opts?.effect) { setFocusEffect(opts.effect); setFocusCharId(null); setSelected(null); }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateEffect = useCallback((name: string) => {
    setTab('effects');
    setSelected(null);
    setTimeout(() => { document.querySelector(`[data-effect="${name}"]`)?.scrollIntoView({ block: 'center' }); }, 80);
  }, []);

  const selectItem = useCallback((it: Item) => { setSelected(it); setTab('items'); }, []);

  if (!items) return <div style={{ padding: '120px 20px', textAlign: 'center', color: 'var(--ink-3)' }}>Loading codex…</div>;

  const PAGE_TITLES: Record<Tab, { eyebrow: string; title: string; sub: string }> = {
    home: { eyebrow: '', title: '', sub: '' },
    items: { eyebrow: 'Codex', title: 'Item catalogue', sub: `${items.length} items · click any card for details and cross-links.` },
    characters: { eyebrow: 'Classes', title: 'Characters', sub: 'Each unlocks a different shop pool and synergy lane.' },
    effects: { eyebrow: 'Reference', title: 'Status effects', sub: 'Buffs and debuffs with formulas and item sources.' },
    strategies: { eyebrow: 'Builds', title: 'Strategies', sub: `${STRATEGIES.length} community write-ups.` },
  };
  const pt = PAGE_TITLES[tab];

  return (
    <>
      <Topbar tab={tab} onTab={goTab} theme={theme} onToggleTheme={toggleTheme} gameFont={gameFont} onToggleFont={toggleFont} />
      <main className="shell">
        {tab !== 'home' && (
          <div className="section-head">
            <span className="eyebrow">{pt.eyebrow}</span>
            <h2>{pt.title}</h2>
            <span className="sub">{pt.sub}</span>
          </div>
        )}
        {tab === 'home' && <HomePage items={items} onTab={goTab} onSelectItem={selectItem} />}
        {tab === 'items' && (
          <ItemsPage items={items} selected={selected} onSelect={setSelected} onClose={() => setSelected(null)}
            onNavigateEffect={navigateEffect} focusCharId={focusCharId} focusEffect={focusEffect}
            clearFocus={() => { setFocusCharId(null); setFocusEffect(null); }} />
        )}
        {tab === 'characters' && <CharactersPage items={items} onFilterChar={id => goTab('items', { charId: id })} />}
        {tab === 'effects' && <EffectsPage items={items} onFilterEffect={e => goTab('items', { effect: e })} onSelectItem={selectItem} />}
        {tab === 'strategies' && <StrategiesPage items={items} onSelectItem={selectItem} />}
      </main>
      <footer className="foot">
        <div>An unofficial fan strategy compendium · {items.length} items</div>
        <div>Next.js + Supabase</div>
      </footer>
    </>
  );
}

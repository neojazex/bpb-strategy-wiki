'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Item } from '@/lib/types';
import {
  CHARACTERS, EFFECTS, STRATEGIES, TIER, RARITY_ORDER,
  rarityKey, formatDamage, resolveEffect, effectIcon, tokenKind,
  itemsWithToken, itemsForCharacter,
} from '@/lib/data';
import ItemIcon from '@/components/ItemIcon';
import EffectText from '@/components/EffectText';
import ShapeGrid from '@/components/ShapeGrid';
import ConnectionsPanel from '@/components/ConnectionsPanel';
import CommentsPanel from '@/components/CommentsPanel';

type Tab = 'home' | 'items' | 'characters' | 'effects' | 'strategies';

function Topbar({ tab, onTab, theme, onToggleTheme }: {
  tab: Tab; onTab: (t: Tab) => void; theme: string; onToggleTheme: () => void;
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

  return (
    <aside className="detail-panel" style={{ '--rarity': `var(--r-${k})` } as React.CSSProperties}>
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

      {tokensMentioned.length > 0 && (
        <div className="detail-section">
          <h4>References</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tokensMentioned.map(t => {
              const resolved = resolveEffect(t);
              const icon = resolved ? effectIcon(t) : null;
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
      )}

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
  const [rarityF, setRarityF] = useState('All');
  const [typeF, setTypeF] = useState('All');
  const [charF, setCharF] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => { if (focusCharId) setCharF(focusCharId); }, [focusCharId]);
  useEffect(() => { setPage(1); }, [query, rarityF, typeF, charF, focusEffect]);

  const types = useMemo(() => ['All', ...Array.from(new Set(items.map(i => i.type))).sort()], [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items;
    if (charF === 'Neutral') list = list.filter(it => !it.sockets?.length);
    else if (charF !== 'All') list = list.filter(it => Array.isArray(it.sockets) && it.sockets.includes(charF));
    if (focusEffect) list = itemsWithToken(list, focusEffect);
    if (q) list = list.filter(i => i.name.toLowerCase().includes(q) || (i.effect ?? '').toLowerCase().includes(q));
    if (rarityF !== 'All') list = list.filter(i => i.rarity === rarityF);
    if (typeF !== 'All') list = list.filter(i => i.type === typeF);
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
  }, [items, query, rarityF, typeF, charF, focusEffect]);

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
        <button className={`char-chip${charF === 'All' ? ' active' : ''}`} onClick={() => { setCharF('All'); clearFocus(); }} style={{ paddingLeft: 12 }}>All characters</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className={`char-chip${charF === 'Neutral' ? ' active' : ''}`} onClick={() => setCharF('Neutral')} style={{ '--char-color': '#94a3b8' } as React.CSSProperties}>
          <span className="av"><img src="/images/chars/NeutralIcon.webp" alt="" /></span>
          Neutral
        </span>
        {CHARACTERS.map(c => (
          <span key={c.id} className={`char-chip${charF === c.id ? ' active' : ''}`} onClick={() => setCharF(c.id)} style={{ '--char-color': c.color } as React.CSSProperties}>
            <span className="av">{c.icon ? <img src={c.icon} alt="" /> : c.name[0]}</span>
            {c.name}
          </span>
        ))}
      </div>
      <div className="filters">
        {['All', ...RARITY_ORDER].map(r => {
          const k = r === 'All' ? null : rarityKey(r);
          return (
            <button key={r} className={`filter-chip${rarityF === r ? ' active' : ''}`} onClick={() => setRarityF(r)}>
              {k && <span className="swatch" style={{ background: `var(--r-${k})` }} />}{r}
            </button>
          );
        })}
      </div>
      <div className="filters">
        {types.slice(0, 14).map(t => (
          <button key={t} className={`filter-chip${typeF === t ? ' active' : ''}`} onClick={() => setTypeF(t)}>{t}</button>
        ))}
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

function EffectsPage({ items, onFilterEffect }: { items: Item[]; onFilterEffect: (e: string) => void }) {
  const buffs = Object.entries(EFFECTS).filter(([, v]) => !('alias' in v) && (v as import('@/lib/types').Effect).kind === 'buff') as [string, import('@/lib/types').Effect][];
  const debuffs = Object.entries(EFFECTS).filter(([, v]) => !('alias' in v) && (v as import('@/lib/types').Effect).kind === 'debuff') as [string, import('@/lib/types').Effect][];

  function EffectCard({ name, e }: { name: string; e: import('@/lib/types').Effect }) {
    const sources = itemsWithToken(items, name).slice(0, 5);
    const total = itemsWithToken(items, name).length;
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
        <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)', marginBottom: 10 }}>{e.note}</div>
        {sources.length > 0 && (
          <div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>Sources ({total})</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {sources.map(it => <span key={it.gid} className="type-chip" style={{ cursor: 'pointer' }} onClick={() => onFilterEffect(name)}>{it.name}</span>)}
              {total > 5 && <span className="type-chip" style={{ cursor: 'pointer', background: 'var(--accent-soft)' }} onClick={() => onFilterEffect(name)}>See all →</span>}
            </div>
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
  const [tab, setTab] = useState<Tab>('home');
  const [selected, setSelected] = useState<Item | null>(null);
  const [theme, setTheme] = useState('light');
  const [focusCharId, setFocusCharId] = useState<string | null>(null);
  const [focusEffect, setFocusEffect] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bpb_theme') ?? 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    fetch('/items.json').then(r => r.json()).then(setItems);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('bpb_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }, [theme]);

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
      <Topbar tab={tab} onTab={goTab} theme={theme} onToggleTheme={toggleTheme} />
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
        {tab === 'effects' && <EffectsPage items={items} onFilterEffect={e => goTab('items', { effect: e })} />}
        {tab === 'strategies' && <StrategiesPage items={items} onSelectItem={selectItem} />}
      </main>
      <footer className="foot">
        <div>An unofficial fan strategy compendium · {items.length} items</div>
        <div>Next.js + Supabase</div>
      </footer>
    </>
  );
}

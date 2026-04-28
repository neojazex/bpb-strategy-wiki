/* Page components: Home, Items, Characters, Effects, Strategies */

const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP, useRef: useRefP } = React;

// ============================== HOME ==============================
function HomePage({ allItems, onTab, onSelectItem }) {
  // Pick a few showcase items for the "backpack" hero art
  const showcase = useMemoP(() => {
    const wanted = ['WoodenSword','Hammer','Eggscalibur','HealthPotion','Goobert','BloodAmulet','MagicStaff','LeatherArmor','SpikedShield','Stone','BurningTorch','Shovel','RubyEgg','Pineapple','BloodyDagger','Manathirst'];
    const map = Object.fromEntries(allItems.map(i => [i.slug, i]));
    return wanted.map(s => map[s]).filter(Boolean).slice(0, 16);
  }, [allItems]);

  const counts = useMemoP(() => {
    const types = new Set(allItems.map(i => i.type));
    return {
      items: allItems.length,
      chars: BPB.CHARACTERS.length,
      effects: Object.keys(BPB.EFFECTS).filter(k => !BPB.EFFECTS[k].alias).length,
      strats: BPB.STRATEGIES.length,
      types: types.size,
    };
  }, [allItems]);

  const tierItemMap = useMemoP(() => {
    const m = Object.fromEntries(allItems.map(i => [i.slug, i]));
    return BPB.TIER.map(t => ({ tier: t.tier, items: t.items.map(s => m[s]).filter(Boolean) }));
  }, [allItems]);

  const featured = useMemoP(() => BPB.STRATEGIES.slice(0, 3), []);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div>
          <div className="hero-eyebrow">A community strategy compendium</div>
          <h1>Win the next <em>backpack</em>.</h1>
          <p className="hero-lede">
            A field guide to Backpack Battles — every item, every status effect, every character, and the strategies that string them together.
            Click anything you see to follow the threads.
          </p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => onTab('items')}>Browse {counts.items} items →</button>
            <button className="btn" onClick={() => onTab('strategies')}>Read strategies</button>
            <button className="btn" onClick={() => onTab('characters')}>Pick a character</button>
          </div>
        </div>
        <div className="hero-art-wrap">
          <div className="hero-bag-deco"><img src="images/ui/Backpack_icon.png" alt="" /></div>
          <div className="hero-art">
            {Array.from({length:16}).map((_, i) => {
              const it = showcase[i];
              return (
                <div key={i} className={`slot${it ? '' : ' empty'}`} title={it && it.name} onClick={() => it && onSelectItem(it)}>
                  {it && <img src={`images/items/${it.slug}.png`} alt={it.name} onError={(e) => { e.target.src = it.image; }} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURE ROW */}
      <section className="feature-row">
        <div className="feature" onClick={() => onTab('characters')}>
          <div className="icon">⚔︎</div>
          <span className="count">{counts.chars}</span>
          <h3>Characters</h3>
          <p>Reaper, Mage, Pyromancer, and four more — each with a signature playstyle.</p>
        </div>
        <div className="feature" onClick={() => onTab('items')}>
          <div className="icon">⌗</div>
          <span className="count">{counts.items}</span>
          <h3>Items</h3>
          <p>Weapons, food, accessories, pets and gemstones — fully searchable with shape grids.</p>
        </div>
        <div className="feature" onClick={() => onTab('effects')}>
          <div className="icon">✦</div>
          <span className="count">{counts.effects}</span>
          <h3>Status Effects</h3>
          <p>Buffs and debuffs — Luck, Heat, Poison, Spikes — with formulas and item sources.</p>
        </div>
        <div className="feature" onClick={() => onTab('strategies')}>
          <div className="icon">⚐</div>
          <span className="count">{counts.strats}</span>
          <h3>Strategies</h3>
          <p>Build guides and openers from the community — what to grab, when, and why.</p>
        </div>
      </section>

      {/* HOME GRID */}
      <section className="home-grid">
        <div>
          <div className="section-title">
            <h2>Featured strategies</h2>
            <span className="sub">Updated builds worth trying</span>
          </div>
          <div className="featured-builds">
            {featured.map(s => (
              <div key={s.id} className="strat-card" onClick={() => onTab('strategies')}>
                <div className="strat-banner" style={{ background: s.color }}>
                  <span>“{s.tags.join(' · ')}”</span>
                </div>
                <div className="body">
                  <h3>{s.title}</h3>
                  <div className="tag-row">
                    <span className="pill">{s.char}</span>
                    {s.tags.slice(0,2).map(t => <span key={t} className="pill">{t}</span>)}
                  </div>
                  <p>{s.excerpt}</p>
                  <div className="meta">
                    <span>{s.items.length} key items</span>
                    <span>Read →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-title">
            <h2>Tier list peek</h2>
            <span className="sub">Community meta — placeholder</span>
          </div>
          <div className="tier-list">
            {tierItemMap.map(row => (
              <div key={row.tier} className="tier-row">
                <div className={`tier-badge tier-${row.tier}`}>{row.tier}</div>
                <div className="picks">
                  {row.items.map(it => (
                    <img key={it.gid} src={`images/items/${it.slug}.png`} title={it.name} alt={it.name}
                      onClick={() => onSelectItem(it)}
                      onError={(e) => { e.target.src = it.image; }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="scaffold-note" style={{marginTop:18}}>
            <strong>Heads-up:</strong> the tier list and Strategies are scaffolds for now — real picks and writeups go in next pass.
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================== ITEMS ==============================
function ItemsPage({ allItems, selected, onSelect, onClose, onNavigateEffect, onTab, focusCharacter, focusEffect, clearFocus }) {
  const [query, setQuery] = useStateP('');
  const [rarityF, setRarityF] = useStateP('All');
  const [typeF, setTypeF] = useStateP('All');
  const [extraF, setExtraF] = useStateP('All');
  const [charF, setCharF] = useStateP('All'); // local character filter

  // Sync local charF with external focusCharacter
  useEffectP(() => {
    if (focusCharacter) setCharF(focusCharacter);
  }, [focusCharacter]);

  // Apply external focus (char or effect)
  useEffectP(() => {
    if (focusCharacter) {
      // no direct filter UI for character — show only items socketed to that char
      setQuery('');
    }
    if (focusEffect) {
      setQuery('');
    }
  }, [focusCharacter, focusEffect]);

  const types = useMemoP(() => ['All', ...Array.from(new Set(allItems.map(i => i.type))).sort()], [allItems]);
  const extras = useMemoP(() => {
    const s = new Set();
    allItems.forEach(i => (i.extraTypes||[]).forEach(t => s.add(t)));
    return ['All', ...Array.from(s).sort()];
  }, [allItems]);

  const filtered = useMemoP(() => {
    const q = query.trim().toLowerCase();
    let list = allItems;
    if (charF !== 'All') {
      list = list.filter(it => Array.isArray(it.sockets) && it.sockets.includes(charF));
    }
    if (focusEffect) {
      list = BPB.itemsWithToken(list, focusEffect);
    }
    if (q) list = list.filter(i => i.name.toLowerCase().includes(q) || (i.effect||'').toLowerCase().includes(q) || (i.type||'').toLowerCase().includes(q));
    if (rarityF !== 'All') list = list.filter(i => i.rarity === rarityF);
    if (typeF !== 'All') list = list.filter(i => i.type === typeF);
    if (extraF !== 'All') list = list.filter(i => Array.isArray(i.extraTypes) && i.extraTypes.includes(extraF));
    // Sort: by rarity order, then name
    const rarOrder = Object.fromEntries(BPB.RARITY_ORDER.map((r,i)=>[r,i]));
    list = [...list].sort((a,b) => (rarOrder[a.rarity]??99) - (rarOrder[b.rarity]??99) || a.name.localeCompare(b.name));
    return list;
  }, [allItems, query, rarityF, typeF, extraF, charF, focusEffect]);

  const layoutCls = selected ? 'items-layout with-detail' : 'items-layout';

  return (
    <div>
      <div className="section-title">
        <h2>Item codex</h2>
        <span className="sub">{allItems.length} catalogued · click any item for details</span>
      </div>

      {focusEffect && (
        <div className="scaffold-note" style={{borderColor:'var(--accent)', borderStyle:'solid'}}>
          <strong>Filtered:</strong> showing items that interact with <em>{focusEffect}</em>.
          <button className="btn" style={{marginLeft:'auto', padding:'4px 10px', fontSize:'0.8rem'}} onClick={clearFocus}>Clear</button>
        </div>
      )}

      <div className="items-toolbar">
        <div className="search-box">
          <span className="icon">⌕</span>
          <input
            type="text"
            placeholder="Search items, effects, types…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="count-pill">{filtered.length} / {allItems.length}</div>
      </div>

      {/* Character filter row */}
      <div className="filters" style={{marginBottom: 12}}>
        <button
          className={`char-chip${charF==='All'?' active':''}`}
          onClick={() => { setCharF('All'); clearFocus(); }}
          style={{paddingLeft: 12}}
        >
          All characters
        </button>
        {BPB.CHARACTERS.map(c => (
          <span
            key={c.id}
            className={`char-chip${charF===c.id?' active':''}`}
            onClick={() => setCharF(c.id)}
            style={{'--char-color': c.color}}
            title={c.name}
          >
            <span className="av">
              {c.icon ? <img src={c.icon} alt="" /> : c.name[0]}
            </span>
            {c.name}
          </span>
        ))}
      </div>

      <div className="filters">
        <div className="filter-group">
          {['All', ...BPB.RARITY_ORDER].map(r => {
            const k = r === 'All' ? null : BPB.RARITY_KEY(r);
            return (
              <button key={r} className={`filter-chip ${rarityF===r?'active':''}`} onClick={() => setRarityF(r)}>
                {k && <span className="swatch" style={{background:`var(--r-${k})`}}></span>}
                {r}
              </button>
            );
          })}
        </div>
        <div className="filter-group">
          {types.slice(0, 12).map(t => (
            <button key={t} className={`filter-chip ${typeF===t?'active':''}`} onClick={() => setTypeF(t)}>{t}</button>
          ))}
        </div>
        {extras.length > 1 && (
          <div className="filter-group">
            {extras.slice(0, 10).map(t => (
              <button key={t} className={`filter-chip ${extraF===t?'active':''}`} onClick={() => setExtraF(t)}>
                {t !== 'All' && <span className="swatch" style={{background: BPB.ELEMENTS[t] || 'var(--ink-3)'}}></span>}
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={layoutCls}>
        <div className="items-grid">
          {filtered.length === 0 && <div className="empty">No items match those filters.</div>}
          {filtered.slice(0, 240).map(it => (
            <ItemCard key={it.gid} item={it} onSelect={onSelect} selected={selected && selected.gid === it.gid} />
          ))}
          {filtered.length > 240 && <div className="empty">Showing first 240 of {filtered.length}. Refine your filters to narrow.</div>}
        </div>
        {selected && (
          <DetailPanel
            item={selected}
            allItems={allItems}
            onClose={onClose}
            onNavigateItem={(opts) => {
              if (opts.item) onSelect(opts.item);
              if (opts.goCharacter) onTab('characters', { charId: opts.goCharacter });
            }}
            onNavigateEffect={onNavigateEffect}
          />
        )}
      </div>
    </div>
  );
}

// ============================== CHARACTERS ==============================
function CharactersPage({ allItems, focusCharId, onSelectChar, onTab }) {
  return (
    <div>
      <div className="section-title">
        <h2>Characters</h2>
        <span className="sub">Each unlocks a different shop pool and synergy lane</span>
      </div>
      <div className="scaffold-note">
        <strong>Scaffold:</strong> placeholder portraits and descriptions — fill in HP, starting kit, and ability text as you collect data. Items socketed to a character ({BPB.CHARACTERS.map(c=>c.name).join(', ')}) will already filter correctly.
      </div>
      <div className="chars-grid">
        {BPB.CHARACTERS.map(c => {
          const sigItems = c.items.map(s => allItems.find(i => i.slug === s)).filter(Boolean);
          const socketCount = BPB.itemsForCharacter(allItems, c.id).length;
          const initials = c.name.slice(0,1);
          return (
            <div key={c.id} className="char-card" style={{'--char-color': c.color}} onClick={() => onTab('items', { charId: c.id })}>
              <div className="portrait">
                {c.icon ? <img src={c.icon} alt={c.name} /> : initials}
              </div>
              <h3>{c.name}</h3>
              <div className="role">{c.role}</div>
              <div className="desc">{c.description}</div>
              <div className="signature">
                <strong>Signature:</strong> {c.signature}<br/>
                <span className="item-count">{socketCount} items locked to this class · click to view</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================== EFFECTS ==============================
function EffectsPage({ allItems, focusEffect, onTab }) {
  const buffs = Object.entries(BPB.EFFECTS).filter(([k,v]) => v.kind === 'buff');
  const debuffs = Object.entries(BPB.EFFECTS).filter(([k,v]) => v.kind === 'debuff');

  function Card({ name, e }) {
    const sources = BPB.itemsWithToken(allItems, name).slice(0, 5);
    return (
      <div className="effect-card" data-effect={name} style={{'--effect-color': e.color}}>
        <h3>
          <span className={`glyph${!e.icon ? ' fallback' : ''}`}>
            {e.icon ? <img src={e.icon} alt="" /> : (e.glyph || name[0])}
          </span>
          {name}
        </h3>
        <div className="kind">{e.kind === 'buff' ? 'Buff' : 'Debuff'}</div>
        <p style={{margin:'0 0 10px',color:'var(--ink-2)',fontSize:'0.9rem'}}>{e.short}</p>
        <div className="formula"><strong style={{color:'var(--accent)'}}>Effect:</strong> {e.formula}</div>
        <div style={{fontSize:'0.78rem',color:'var(--ink-3)',marginBottom:10}}>{e.note}</div>
        {sources.length > 0 && (
          <div>
            <div style={{fontSize:'0.7rem',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:6}}>Sources ({BPB.itemsWithToken(allItems, name).length})</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {sources.map(it => (
                <a key={it.gid} className="type-chip" style={{cursor:'pointer'}} onClick={() => onTab('items', { itemSlug: it.slug })}>{it.name}</a>
              ))}
              {BPB.itemsWithToken(allItems, name).length > 5 && (
                <a className="type-chip" style={{cursor:'pointer',background:'var(--accent-soft)',borderColor:'var(--accent-2)'}}
                   onClick={() => onTab('items', { effect: name })}>
                  See all →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">
        <h2>Status effects</h2>
        <span className="sub">Buffs and debuffs that items inflict, generate, or scale with</span>
      </div>
      <div className="scaffold-note">
        <strong>Scaffold:</strong> formulas reflect what you described (Luck +2% acc, Heat +2% speed, Cold/Blind −2%). Refine the numbers and add edge cases as you confirm them.
      </div>

      <div className="effects-section">
        <h3 style={{fontFamily:'EB Garamond, serif',fontSize:'1.4rem',marginBottom:14,color:'var(--ink-2)'}}>Buffs</h3>
        <div className="effects-grid">
          {buffs.map(([name, e]) => <Card key={name} name={name} e={e} />)}
        </div>
      </div>
      <div className="effects-section">
        <h3 style={{fontFamily:'EB Garamond, serif',fontSize:'1.4rem',marginBottom:14,color:'var(--ink-2)'}}>Debuffs</h3>
        <div className="effects-grid">
          {debuffs.map(([name, e]) => <Card key={name} name={name} e={e} />)}
        </div>
      </div>
    </div>
  );
}

// ============================== STRATEGIES ==============================
function StrategiesPage({ allItems, onTab }) {
  return (
    <div>
      <div className="section-title">
        <h2>Strategies</h2>
        <span className="sub">{BPB.STRATEGIES.length} build guides · community blog feel</span>
      </div>
      <div className="scaffold-note">
        <strong>Scaffold:</strong> short article cards as placeholders. Each links to the items it mentions. Expand into full pages with item lists, playstyle notes, and counters.
      </div>
      <div className="strats-grid">
        {BPB.STRATEGIES.map(s => {
          const items = s.items.map(slug => allItems.find(i => i.slug === slug)).filter(Boolean);
          return (
            <div key={s.id} className="strat-card">
              <div className="strat-banner" style={{ background: s.color }}>
                <span>“{s.char} · {s.tags.join(' · ')}”</span>
              </div>
              <div className="body">
                <h3>{s.title}</h3>
                <div className="tag-row">
                  <span className="pill" style={{background: s.color, color:'#fff7e4', borderColor: s.color}}>{s.char}</span>
                  {s.tags.map(t => <span key={t} className="pill">{t}</span>)}
                </div>
                <p>{s.excerpt}</p>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
                  {items.map(it => (
                    <span key={it.gid} className="crosslink" style={{padding:'4px 6px',display:'inline-flex'}} onClick={() => onTab('items', { itemSlug: it.slug })}>
                      <img src={`images/items/${it.slug}.png`} onError={e=>e.target.src=it.image} alt={it.name} style={{width:24,height:24}} />
                      <span className="nm" style={{fontSize:'0.82rem'}}>{it.name}</span>
                    </span>
                  ))}
                </div>
                <div className="meta">
                  <span>{s.author || 'community'}{s.updated ? ' · '+s.updated : ''}</span>
                  <span>Read →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, ItemsPage, CharactersPage, EffectsPage, StrategiesPage });

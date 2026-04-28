/* Sharp variant — override App, HomePage, and section headers
   for the Refactoring-UI flavored layout. Reuses ItemsPage,
   CharactersPage, EffectsPage, StrategiesPage from pages.jsx. */

const { useState: useStateS, useEffect: useEffectS, useMemo: useMemoS, useCallback: useCallbackS } = React;

function HomePageSharp({ allItems, onTab, onSelectItem }) {
  const showcase = useMemoS(() => {
    const wanted = ['WoodenSword','Hammer','Eggscalibur','HealthPotion','Goobert','BloodAmulet','MagicStaff','LeatherArmor','SpikedShield','Stone','BurningTorch','Shovel','RubyEgg','Pineapple','BloodyDagger','Manathirst'];
    const map = Object.fromEntries(allItems.map(i => [i.slug, i]));
    return wanted.map(s => map[s]).filter(Boolean).slice(0, 16);
  }, [allItems]);

  const counts = useMemoS(() => ({
    items: allItems.length,
    chars: BPB.CHARACTERS.length,
    effects: Object.keys(BPB.EFFECTS).filter(k => !BPB.EFFECTS[k].alias).length,
    strats: BPB.STRATEGIES.length,
  }), [allItems]);

  const tierItemMap = useMemoS(() => {
    const m = Object.fromEntries(allItems.map(i => [i.slug, i]));
    return BPB.TIER.map(t => ({ tier: t.tier, items: t.items.map(s => m[s]).filter(Boolean) }));
  }, [allItems]);

  const featured = useMemoS(() => BPB.STRATEGIES.slice(0, 3), []);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div>
          <div className="eyebrow">Backpack Battles · Strategy Codex</div>
          <h1>Win the next <em>backpack</em>.</h1>
          <p className="lede">
            A field guide to Backpack Battles — every item, every status effect, every character, and the strategies that string them together. Click anything you see to follow the threads.
          </p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => onTab('items')}>Browse {counts.items} items →</button>
            <button className="btn" onClick={() => onTab('strategies')}>Read strategies</button>
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
        {[
          {k:'characters', icon:'C', count:counts.chars, h:'Characters', p:'Seven classes, each with a signature synergy lane.'},
          {k:'items', icon:'I', count:counts.items, h:'Items', p:'Weapons, food, accessories — searchable with shape grids.'},
          {k:'effects', icon:'E', count:counts.effects, h:'Status Effects', p:'Buffs and debuffs with formulas and item sources.'},
          {k:'strategies', icon:'S', count:counts.strats, h:'Strategies', p:'Build guides — what to grab, when, and why.'},
        ].map(f => (
          <div key={f.k} className="feature" onClick={() => onTab(f.k)}>
            <div className="icon">{f.icon}</div>
            <span className="count">{f.count}</span>
            <h3>{f.h}</h3>
            <p>{f.p}</p>
          </div>
        ))}
      </section>

      {/* HOME GRID */}
      <section className="home-grid">
        <div>
          <div className="section-head">
            <span className="eyebrow">Featured</span>
            <h2>Strategies worth trying</h2>
            <span className="sub">Hand-picked builds with linked items and brief playstyle notes.</span>
          </div>
          <div className="featured-builds">
            {featured.map(s => (
              <div key={s.id} className="strat-card" onClick={() => onTab('strategies')} style={{'--strat-color': s.color}}>
                <div className="strat-banner"></div>
                <div className="body">
                  <h3>{s.title}</h3>
                  <div className="tag-row">
                    <span className="pill accent">{s.char}</span>
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
          <div className="section-head">
            <span className="eyebrow">Meta</span>
            <h2>Tier list peek</h2>
            <span className="sub">Community placeholder — refine as the meta shifts.</span>
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
        </div>
      </section>
    </div>
  );
}

function AppSharp() {
  const [items, setItems] = useStateS(null);
  const [tab, setTab] = useStateS('home');
  const [selected, setSelected] = useStateS(null);
  const [theme, setTheme] = useStateS(() => localStorage.getItem('bpb_theme_sharp') || 'light');
  const [focus, setFocus] = useStateS({ charId: null, effect: null });

  useEffectS(() => {
    fetch('data/items.json').then(r => r.json()).then(setItems).catch(err => console.error(err));
  }, []);

  useEffectS(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bpb_theme_sharp', theme);
  }, [theme]);

  const navigateTab = useCallbackS((newTab, opts = {}) => {
    setTab(newTab);
    if (newTab === 'items') {
      if (opts.itemSlug && items) {
        const it = items.find(i => i.slug === opts.itemSlug);
        if (it) setSelected(it);
        setFocus({ charId: null, effect: null });
      } else if (opts.charId) {
        setFocus({ charId: opts.charId, effect: null });
        setSelected(null);
      } else if (opts.effect) {
        setFocus({ charId: null, effect: opts.effect });
        setSelected(null);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [items]);

  const navigateEffect = useCallbackS((effectName) => {
    setTab('effects');
    setSelected(null);
    setTimeout(() => {
      const card = document.querySelector(`[data-effect="${effectName}"]`);
      if (card) card.scrollIntoView({ block: 'center' });
    }, 80);
  }, []);

  if (!items) {
    return (
      <div style={{padding:'120px 20px',textAlign:'center',color:'var(--ink-3)',fontSize:'0.95rem'}}>
        Loading codex…
      </div>
    );
  }

  return (
    <div>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand" onClick={() => navigateTab('home')}>
            <div className="crest"><img src="images/ui/Backpack_icon.png" alt="" /></div>
            <div className="brand-name">
              Strategy Codex
              <small>Backpack Battles wiki</small>
            </div>
          </div>
          <nav className="nav">
            <button className={tab==='home'?'active':''} onClick={() => navigateTab('home')}>Home</button>
            <button className={tab==='characters'?'active':''} onClick={() => navigateTab('characters')}>Characters</button>
            <button className={tab==='items'?'active':''} onClick={() => navigateTab('items')}>Items</button>
            <button className={tab==='effects'?'active':''} onClick={() => navigateTab('effects')}>Effects</button>
            <button className={tab==='strategies'?'active':''} onClick={() => navigateTab('strategies')}>Strategies</button>
          </nav>
          <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '☾ Dark' : '☀ Light'}
          </button>
        </div>
      </header>

      <main className="shell">
        {tab === 'home' && (
          <HomePageSharp allItems={items} onTab={navigateTab} onSelectItem={(it) => navigateTab('items', { itemSlug: it.slug })} />
        )}
        {tab === 'items' && (
          <div>
            <div className="section-head">
              <span className="eyebrow">Codex</span>
              <h2>Item catalogue</h2>
              <span className="sub">{items.length} items · click any card for details and cross-links.</span>
            </div>
            <ItemsPage
              allItems={items}
              selected={selected}
              onSelect={setSelected}
              onClose={() => setSelected(null)}
              onNavigateEffect={navigateEffect}
              onTab={navigateTab}
              focusCharacter={focus.charId}
              focusEffect={focus.effect}
              clearFocus={() => setFocus({ charId: null, effect: null })}
            />
          </div>
        )}
        {tab === 'characters' && (
          <div>
            <div className="section-head">
              <span className="eyebrow">Classes</span>
              <h2>Characters</h2>
              <span className="sub">Each unlocks a different shop pool and synergy lane.</span>
            </div>
            <CharactersPage allItems={items} onTab={navigateTab} />
          </div>
        )}
        {tab === 'effects' && (
          <div>
            <div className="section-head">
              <span className="eyebrow">Reference</span>
              <h2>Status effects</h2>
              <span className="sub">Buffs and debuffs with formulas and item sources.</span>
            </div>
            <EffectsPage allItems={items} onTab={navigateTab} />
          </div>
        )}
        {tab === 'strategies' && (
          <div>
            <div className="section-head">
              <span className="eyebrow">Builds</span>
              <h2>Strategies</h2>
              <span className="sub">{BPB.STRATEGIES.length} community write-ups · scaffold pending real content.</span>
            </div>
            <StrategiesPage allItems={items} onTab={navigateTab} />
          </div>
        )}
      </main>

      <footer className="foot">
        <div>An unofficial fan strategy compendium · {items.length} items</div>
        <div>Sharp variant · Refactoring-UI flavored</div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppSharp />);

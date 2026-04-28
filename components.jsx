/* Shared UI atoms for BPB wiki */

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ---------- Effect text renderer ----------
function EffectText({ text, onTokenClick }) {
  if (!text) return null;
  const parts = BPB.parseEffect(text);
  return (
    <span className="effect-text">
      {parts.map((p, i) => {
        if (p.kind === 'text') {
          return <span key={i}>{p.text}</span>;
        }
        if (p.kind === 'styled') {
          return <span key={i} className={`tk-${p.style}`}>{p.text}</span>;
        }
        if (p.kind === 'token') {
          const kind = BPB.tokenKind(p.name);
          const iconUrl = BPB.effectIcon(p.name);
          // Special-case Gold token → coin icon inline
          if (p.name === 'Gold') {
            return (
              <span key={i} className="gold-inline" title="Gold">
                <img src="images/ui/GoldCoin.png" alt="" />
              </span>
            );
          }
          return (
            <span
              key={i}
              className={`tag ${kind}${!iconUrl ? ' no-icon' : ''}`}
              onClick={(e) => { e.stopPropagation(); onTokenClick && onTokenClick(p.name); }}
              title={p.name}
            >
              {iconUrl && <img src={iconUrl} alt="" />}
              {p.name}
            </span>
          );
        }
        return null;
      })}
    </span>
  );
}

// ---------- Character chip / badge ----------
function CharChip({ charId, active, onClick, size = 'md' }) {
  const c = BPB.CHARACTERS.find(c => c.id === charId);
  if (!c) return null;
  return (
    <span
      className={`char-chip${active ? ' active' : ''}`}
      onClick={onClick}
      style={{'--char-color': c.color}}
      title={c.name}
    >
      <span className="av">
        {c.icon ? <img src={c.icon} alt="" /> : c.name[0]}
      </span>
      {c.name}
    </span>
  );
}

function CharBadge({ charId, onClick }) {
  const c = BPB.CHARACTERS.find(c => c.id === charId);
  if (!c) return null;
  return (
    <span
      className={`char-badge${!c.icon ? ' fallback' : ''}`}
      style={{'--char-color': c.color}}
      title={c.name}
      onClick={onClick}
    >
      {c.icon ? <img src={c.icon} alt={c.name} /> : c.name[0]}
    </span>
  );
}

// ---------- Rarity badge ----------
function RarityBadge({ rarity }) {
  const k = BPB.RARITY_KEY(rarity);
  const style = {
    '--rarity': `var(--r-${k})`,
    '--rarity-bg': `var(--r-${k}-bg)`,
  };
  return <span className="rarity-badge" style={style}>{rarity}</span>;
}

// ---------- Item icon (image with placeholder fallback) ----------
function ItemIcon({ item, size }) {
  const [errored, setErrored] = useState(false);
  const url = BPB.itemImage(item);
  // Try a local override first (we copied WoodenSword.png locally as PoC).
  const local = `images/items/${item.slug}.png`;
  const [src, setSrc] = useState(local);
  const [triedLocal, setTriedLocal] = useState(false);

  return (
    <div className="item-icon" style={size ? {width:size, height:size} : null}>
      {!errored ? (
        <img
          src={src}
          alt={item.name}
          onError={() => {
            if (!triedLocal) {
              setTriedLocal(true);
              setSrc(url);
            } else {
              setErrored(true);
            }
          }}
        />
      ) : (
        <div className="placeholder" title={item.name}></div>
      )}
    </div>
  );
}

// ---------- Item card (grid) ----------
function ItemCard({ item, onSelect, selected }) {
  const k = BPB.RARITY_KEY(item.rarity);
  const cls = ['item-card', selected ? 'selected' : ''].filter(Boolean).join(' ');
  const charId = Array.isArray(item.sockets) && item.sockets[0];
  return (
    <div
      className={cls}
      style={{ '--rarity': `var(--r-${k})`, '--rarity-bg': `var(--r-${k}-bg)` }}
      onClick={() => onSelect(item)}
    >
      <ItemIcon item={item} />
      {charId && <CharBadge charId={charId} />}
      <div className="item-meta">
        <h4 className="item-name" title={item.name}>{item.name}</h4>
        <div className="item-sub">
          <RarityBadge rarity={item.rarity} />
          <span>·</span>
          <span>{item.type}</span>
        </div>
        <div className="item-stats">
          {item.cost != null && <span className="stat"><span className="lbl">Cost</span><strong>{item.cost}</strong><img src="images/ui/GoldCoin.png" alt="" style={{width:12,height:12,marginLeft:1,verticalAlign:'-2px'}} /></span>}
          {item.damage && <span className="stat"><span className="lbl">Dmg</span><strong>{BPB.formatDamage(item.damage)}</strong></span>}
          {item.cd != null && <span className="stat"><span className="lbl">CD</span><strong>{item.cd}s</strong></span>}
          {item.accuracy != null && <span className="stat"><span className="lbl">Acc</span><strong>{item.accuracy}%</strong></span>}
        </div>
      </div>
    </div>
  );
}

// ---------- Shape grid (only on detail) ----------
function ShapeGrid({ shape }) {
  if (!shape || !shape.length) return null;
  const rows = shape.length;
  const cols = Math.max(...shape.map(r => r.length));
  return (
    <div className="shape-grid" style={{ gridTemplateColumns: `repeat(${cols}, 22px)`, gridTemplateRows: `repeat(${rows}, 22px)` }}>
      {shape.flatMap((row, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const v = row[c] || 0;
          const cls = v === 0 ? 'shape-cell empty' : v === 2 ? 'shape-cell socket' : 'shape-cell fill';
          return <div key={`${r}-${c}`} className={cls}></div>;
        })
      )}
    </div>
  );
}

// ---------- Detail panel ----------
function DetailPanel({ item, onClose, onNavigateItem, onNavigateEffect, allItems }) {
  if (!item) return null;
  const k = BPB.RARITY_KEY(item.rarity);
  const rarityVar = { '--rarity': `var(--r-${k})` };

  // Find related: items sharing extraTypes, items mentioning this item's slug or class.
  const related = useMemo(() => {
    const rels = [];
    // Same extraType (one of)
    if (item.extraTypes && item.extraTypes.length) {
      for (const it of allItems) {
        if (it.gid === item.gid) continue;
        if (it.extraTypes && it.extraTypes.some(t => item.extraTypes.includes(t))) {
          rels.push(it);
        }
        if (rels.length >= 6) break;
      }
    }
    // pad with same type
    if (rels.length < 4) {
      for (const it of allItems) {
        if (it.gid === item.gid) continue;
        if (rels.find(r => r.gid === it.gid)) continue;
        if (it.type === item.type) rels.push(it);
        if (rels.length >= 6) break;
      }
    }
    return rels.slice(0, 6);
  }, [item, allItems]);

  // Effect tokens mentioned
  const tokensMentioned = useMemo(() => {
    if (!item.effect) return [];
    const set = new Set();
    const re = /<([^>]+)>/g;
    let m;
    while ((m = re.exec(item.effect)) !== null) set.add(m[1]);
    return Array.from(set);
  }, [item.effect]);

  return (
    <aside className="detail-panel" style={rarityVar}>
      <button className="detail-close" onClick={onClose} aria-label="Close">×</button>

      <div className="detail-head">
        <div className="icon-wrap">
          <ItemIcon item={item} />
        </div>
        <div>
          <h2 className="detail-name">{item.name}</h2>
          <div className="detail-sub">
            <RarityBadge rarity={item.rarity} />
            <span className="dot"></span>
            <span>{item.type}</span>
            {item.extraTypes && item.extraTypes.map(t => (
              <span key={t} className="type-chip" style={{borderColor: BPB.ELEMENTS[t] || 'var(--rule)'}}>{t}</span>
            ))}
          </div>
          {item.sockets && item.sockets.length > 0 && (
            <div className="detail-sub" style={{marginTop:6}}>
              <span style={{color:'var(--ink-3)', fontSize:'0.78rem'}}>Character:</span>
              {item.sockets.map(s => (
                <CharChip key={s} charId={s} onClick={() => onNavigateItem({ goCharacter: s })} />
              ))}
            </div>
          )}
        </div>
      </div>

      {(item.cost != null || item.damage || item.cd != null || item.accuracy != null) && (
        <div className="stat-row">
          {item.cost != null && <div className="stat-cell"><div className="lbl">Cost</div><div className="val">{item.cost}<img src="images/ui/GoldCoin.png" alt="" className="gold-coin" /></div></div>}
          {item.damage && <div className="stat-cell"><div className="lbl">Damage</div><div className="val">{BPB.formatDamage(item.damage)}</div></div>}
          {item.cd != null && <div className="stat-cell"><div className="lbl">Cooldown</div><div className="val">{item.cd}<span style={{fontSize:'0.7em',color:'var(--ink-3)'}}>s</span></div></div>}
          {item.accuracy != null && <div className="stat-cell"><div className="lbl">Accuracy</div><div className="val">{item.accuracy}<span style={{fontSize:'0.7em',color:'var(--ink-3)'}}>%</span></div></div>}
        </div>
      )}

      {item.effect && (
        <div className="detail-section">
          <h4>Effect</h4>
          <EffectText
            text={item.effect}
            onTokenClick={(t) => {
              const resolved = BPB.resolveEffect(t);
              if (resolved) onNavigateEffect(resolved);
            }}
          />
        </div>
      )}

      {item.shape && item.shape.length > 0 && (
        <div className="detail-section">
          <h4>Shape — {item.shape.length}×{Math.max(...item.shape.map(r=>r.length))} grid</h4>
          <ShapeGrid shape={item.shape} />
          <div style={{fontSize:'0.75rem',color:'var(--ink-3)',marginTop:8}}>
            Filled cells occupy backpack space.{item.shape.flat().includes(2) ? ' Sockets accept embedded items.' : ''}
          </div>
        </div>
      )}

      {tokensMentioned.length > 0 && (
        <div className="detail-section">
          <h4>References</h4>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {tokensMentioned.map(t => {
              const resolved = BPB.resolveEffect(t);
              const isEffect = !!resolved;
              const iconUrl = isEffect ? BPB.effectIcon(t) : null;
              const color = BPB.ELEMENTS[t] || (isEffect ? BPB.EFFECTS[resolved].color : 'var(--ink-3)');
              if (t === 'Gold') {
                return (
                  <span key={t} className="tag elem" style={{ background:'var(--bg-2)', color:'var(--accent-2)' }}>
                    <img src="images/ui/GoldCoin.png" alt="" />Gold
                  </span>
                );
              }
              return (
                <span
                  key={t}
                  className={`tag ${isEffect ? BPB.tokenKind(t) : 'elem'}${!iconUrl ? ' no-icon' : ''}`}
                  style={isEffect ? null : { background:'var(--bg-2)', color }}
                  onClick={() => isEffect && onNavigateEffect(resolved)}
                >
                  {iconUrl && <img src={iconUrl} alt="" />}
                  {t}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="detail-section">
          <h4>Related items</h4>
          <div className="crosslinks">
            {related.map(r => {
              const k2 = BPB.RARITY_KEY(r.rarity);
              return (
                <div key={r.gid} className="crosslink" onClick={() => onNavigateItem({ item: r })}>
                  <ItemIcon item={r} />
                  <div>
                    <div className="nm">{r.name}</div>
                    <div className="ty">{r.type}{r.extraTypes ? ' · '+r.extraTypes.join(', ') : ''}</div>
                  </div>
                  <RarityBadge rarity={r.rarity} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

Object.assign(window, { EffectText, RarityBadge, ItemIcon, ItemCard, ShapeGrid, DetailPanel, CharChip, CharBadge });

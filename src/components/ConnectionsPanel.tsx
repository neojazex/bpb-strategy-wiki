'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Item } from '@/lib/types';
import type { ItemConnection } from '@/lib/types';
import { CHARACTERS, EFFECTS, pairKey } from '@/lib/data';
import ItemIcon from './ItemIcon';

interface Props {
  item: Item;
  allItems: Item[];
  onSelectItem: (item: Item) => void;
  onNavigateEffect: (name: string) => void;
}

const VOTED_KEY = 'bpb_voted_connections';

function getVoted(): Set<string> {
  try {
    const raw = localStorage.getItem(VOTED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function markVoted(key: string) {
  const voted = getVoted();
  voted.add(key);
  localStorage.setItem(VOTED_KEY, JSON.stringify([...voted]));
}

export default function ConnectionsPanel({ item, allItems, onSelectItem, onNavigateEffect }: Props) {
  const [connections, setConnections] = useState<ItemConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState<Set<string>>(new Set());

  // Suggest new connection UI
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Item[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setVoted(getVoted());
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/connections?slug=${item.slug}`);
    if (res.ok) setConnections(await res.json());
    setLoading(false);
  }, [item.slug]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); return; }
    const q = query.toLowerCase();
    setSuggestions(
      allItems
        .filter(i => i.slug !== item.slug && i.name.toLowerCase().includes(q))
        .slice(0, 6)
    );
  }, [query, allItems, item.slug]);

  async function upvote(conn: ItemConnection) {
    const key = `${conn.slug_a}::${conn.slug_b}`;
    if (voted.has(key)) return;
    const partner = conn.slug_a === item.slug ? conn.slug_b : conn.slug_a;
    await fetch('/api/connections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: item.slug, partner_slug: partner, to_type: conn.to_type }),
    });
    markVoted(key);
    setVoted(new Set([...voted, key]));
    load();
  }

  async function suggest(partner: Item) {
    setQuery('');
    setSuggestions([]);
    setSubmitting(true);
    await fetch('/api/connections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: item.slug, partner_slug: partner.slug, to_type: 'item' }),
    });
    const [a, b] = pairKey(item.slug, partner.slug);
    markVoted(`${a}::${b}`);
    setVoted(new Set([...voted, `${a}::${b}`]));
    setSubmitting(false);
    load();
  }

  function resolvePartner(conn: ItemConnection) {
    const partnerSlug = conn.slug_a === item.slug ? conn.slug_b : conn.slug_a;
    const partnerItem = allItems.find(i => i.slug === partnerSlug);
    const partnerChar = CHARACTERS.find(c => c.id === partnerSlug);
    const partnerEffect = EFFECTS[partnerSlug];
    return { partnerSlug, partnerItem, partnerChar, partnerEffect };
  }

  return (
    <div className="detail-section">
      <h4>Synergy connections</h4>

      {loading && <div style={{ fontSize: '0.8rem', color: 'var(--ink-3)' }}>Loading…</div>}

      {!loading && connections.length === 0 && (
        <div style={{ fontSize: '0.85rem', color: 'var(--ink-3)', marginBottom: 10 }}>
          No connections yet — be the first to suggest one below.
        </div>
      )}

      <div className="crosslinks" style={{ marginBottom: 12 }}>
        {connections.map(conn => {
          const { partnerSlug, partnerItem, partnerChar, partnerEffect } = resolvePartner(conn);
          const voteKey = `${conn.slug_a}::${conn.slug_b}`;
          const hasVoted = voted.has(voteKey);

          return (
            <div key={conn.id} className="crosslink connection-row">
              {partnerItem ? (
                <>
                  <ItemIcon item={partnerItem} size={32} />
                  <div onClick={() => onSelectItem(partnerItem)} style={{ cursor: 'pointer', flex: 1 }}>
                    <div className="nm">{partnerItem.name}</div>
                    <div className="ty">{partnerItem.type}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="item-icon" style={{ width: 32, height: 32 }}>
                    {partnerEffect && !('alias' in partnerEffect) && partnerEffect.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={partnerEffect.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'var(--bg-soft)', borderRadius: 4 }} />
                    )}
                  </div>
                  <div
                    onClick={() => onNavigateEffect(partnerSlug)}
                    style={{ cursor: 'pointer', flex: 1 }}
                  >
                    <div className="nm">{partnerChar?.name ?? partnerSlug}</div>
                    <div className="ty">{conn.to_type}</div>
                  </div>
                </>
              )}
              <button
                className={`vote-btn${hasVoted ? ' voted' : ''}`}
                onClick={() => upvote(conn)}
                disabled={hasVoted}
                title={hasVoted ? 'Already upvoted' : 'Upvote this pair'}
              >
                ▲ {conn.votes}
              </button>
            </div>
          );
        })}
      </div>

      {/* Suggest new connection */}
      <div style={{ position: 'relative' }}>
        <input
          className="suggest-input"
          type="text"
          placeholder={submitting ? 'Adding…' : 'Suggest a synergy — type an item name…'}
          value={query}
          onChange={e => setQuery(e.target.value)}
          disabled={submitting}
        />
        {suggestions.length > 0 && (
          <div className="suggest-dropdown">
            {suggestions.map(s => (
              <div key={s.slug} className="suggest-option" onClick={() => suggest(s)}>
                <ItemIcon item={s} size={24} />
                <span>{s.name}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--ink-3)' }}>{s.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

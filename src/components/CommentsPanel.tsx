'use client';
import { useState, useEffect, useCallback } from 'react';
import type { ItemComment } from '@/lib/types';

interface Props {
  itemSlug: string;
}

export default function CommentsPanel({ itemSlug }: Props) {
  const [comments, setComments] = useState<ItemComment[]>([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/comments?slug=${itemSlug}`);
    if (res.ok) setComments(await res.json());
    setLoading(false);
  }, [itemSlug]);

  useEffect(() => { load(); }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setPosting(true);
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_slug: itemSlug, body }),
    });
    setBody('');
    setPosting(false);
    load();
  }

  return (
    <div className="detail-section">
      <h4>Community notes</h4>

      {loading && <div style={{ fontSize: '0.8rem', color: 'var(--ink-3)' }}>Loading…</div>}

      {!loading && comments.length === 0 && (
        <div style={{ fontSize: '0.85rem', color: 'var(--ink-3)', marginBottom: 10 }}>
          No notes yet.
        </div>
      )}

      <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
        {comments.map(c => (
          <div key={c.id} className="comment-card">
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ink)' }}>{c.body}</p>
            <span style={{ fontSize: '0.7rem', color: 'var(--ink-3)', marginTop: 4, display: 'block' }}>
              {new Date(c.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={submit} style={{ display: 'grid', gap: 6 }}>
        <textarea
          className="comment-input"
          rows={2}
          placeholder="Leave a tip, combo note, or counter…"
          value={body}
          onChange={e => setBody(e.target.value)}
          maxLength={1000}
          disabled={posting}
        />
        <button
          type="submit"
          className="btn primary"
          style={{ justifySelf: 'end', padding: '6px 14px', fontSize: '0.82rem' }}
          disabled={posting || !body.trim()}
        >
          {posting ? 'Posting…' : 'Post note'}
        </button>
      </form>
    </div>
  );
}

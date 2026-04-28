import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { pairKey } from '@/lib/data';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const { data, error } = await getSupabase()
    .from('item_connections')
    .select('*')
    .or(`slug_a.eq.${slug},slug_b.eq.${slug}`)
    .order('votes', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/connections — suggest a new connection or upvote existing
export async function POST(req: NextRequest) {
  const { slug, partner_slug, to_type } = await req.json();
  if (!slug || !partner_slug || !to_type) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  if (slug === partner_slug) {
    return NextResponse.json({ error: 'Cannot connect an item to itself' }, { status: 400 });
  }

  const [slug_a, slug_b] = pairKey(slug, partner_slug);

  // Upsert: if pair exists, increment votes; otherwise create with votes = 1
  const { data: existing } = await getSupabase()
    .from('item_connections')
    .select('id, votes')
    .eq('slug_a', slug_a)
    .eq('slug_b', slug_b)
    .maybeSingle();

  if (existing) {
    const { data, error } = await getSupabase()
      .from('item_connections')
      .update({ votes: existing.votes + 1 })
      .eq('id', existing.id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  const { data, error } = await getSupabase()
    .from('item_connections')
    .insert({ slug_a, slug_b, to_type, votes: 1 })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

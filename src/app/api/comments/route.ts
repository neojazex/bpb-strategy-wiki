import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const { data, error } = await getSupabase()
    .from('item_comments')
    .select('*')
    .eq('item_slug', slug)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { item_slug, body } = await req.json();
  if (!item_slug || !body?.trim()) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  if (body.trim().length > 1000) {
    return NextResponse.json({ error: 'Comment too long' }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from('item_comments')
    .insert({ item_slug, body: body.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

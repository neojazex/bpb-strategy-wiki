'use client';
import { parseEffect, tokenKind, effectIcon } from '@/lib/data';

interface Props {
  text: string;
  onTokenClick?: (name: string) => void;
}

type Part = ReturnType<typeof parseEffect>[number];

function RenderToken({ name, onTokenClick }: { name: string; onTokenClick?: (n: string) => void }) {
  if (name === 'Gold') {
    return (
      <span className="gold-inline" title="Gold">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ui/GoldCoin.png" alt="" />
      </span>
    );
  }
  const kind = tokenKind(name);
  const icon = effectIcon(name);
  return (
    <span
      className={`tag ${kind}${!icon ? ' no-icon' : ''}`}
      onClick={(e) => { e.stopPropagation(); onTokenClick?.(name); }}
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {icon && <img src={icon} alt="" />}
      {name}
    </span>
  );
}

function RenderPart({ p, index, onTokenClick }: { p: Part; index: number; onTokenClick?: (n: string) => void }) {
  if (p.kind === 'text') return <span key={index}>{p.text}</span>;
  if (p.kind === 'token') return <RenderToken key={index} name={p.name!} onTokenClick={onTokenClick} />;
  if (p.kind === 'styled') {
    // Re-parse the inner text so <Token> syntax inside $l[...] etc. renders as chips
    const inner = parseEffect(p.text ?? '');
    return (
      <span key={index} className={`tk-${p.style}`}>
        {inner.map((ip, j) => <RenderPart key={j} p={ip} index={j} onTokenClick={onTokenClick} />)}
      </span>
    );
  }
  return null;
}

export default function EffectText({ text, onTokenClick }: Props) {
  const parts = parseEffect(text);
  return (
    <span className="effect-text">
      {parts.map((p, i) => <RenderPart key={i} p={p} index={i} onTokenClick={onTokenClick} />)}
    </span>
  );
}

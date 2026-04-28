'use client';
import { parseEffect, tokenKind, effectIcon, resolveEffect } from '@/lib/data';

interface Props {
  text: string;
  onTokenClick?: (name: string) => void;
}

export default function EffectText({ text, onTokenClick }: Props) {
  const parts = parseEffect(text);
  return (
    <span className="effect-text">
      {parts.map((p, i) => {
        if (p.kind === 'text') return <span key={i}>{p.text}</span>;
        if (p.kind === 'styled') return <span key={i} className={`tk-${p.style}`}>{p.text}</span>;
        if (p.kind === 'token') {
          const name = p.name!;
          if (name === 'Gold') {
            return (
              <span key={i} className="gold-inline" title="Gold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ui/GoldCoin.png" alt="" />
              </span>
            );
          }
          const kind = tokenKind(name);
          const icon = effectIcon(name);
          return (
            <span
              key={i}
              className={`tag ${kind}${!icon ? ' no-icon' : ''}`}
              onClick={(e) => { e.stopPropagation(); onTokenClick?.(name); }}
              title={name}
            >
              {icon && <img src={icon} alt="" />}
              {name}
            </span>
          );
        }
        return null;
      })}
    </span>
  );
}

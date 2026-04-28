'use client';
import { useState } from 'react';
import type { Item } from '@/lib/types';

interface Props {
  item: Item;
  size?: number;
}

export default function ItemIcon({ item, size }: Props) {
  const [src, setSrc] = useState(`/images/items/${item.slug}.png`);
  const [errored, setErrored] = useState(false);

  const style = size ? { width: size, height: size } : undefined;

  return (
    <div className="item-icon" style={style}>
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={item.name}
          onError={() => {
            if (src !== item.image && item.image) {
              setSrc(item.image);
            } else {
              setErrored(true);
            }
          }}
        />
      ) : (
        <div className="placeholder" title={item.name} />
      )}
    </div>
  );
}

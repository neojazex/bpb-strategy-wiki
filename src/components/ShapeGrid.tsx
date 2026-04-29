interface Props {
  shape: number[][];
  itemImage?: string;
  itemSlug?: string;
}

const TILE: Record<number, string> = {
  1: '/images/tiles/AffectedTile.webp',
  2: '/images/tiles/AffectedTile_noEffect.webp',
  3: '/images/tiles/AffectedTile_secondary_noEffect.webp',
  4: '/images/tiles/AffectedTile_tertiary_noEffect.webp',
  5: '/images/tiles/AffectedTile_lightning_noEffect.webp',
};

export default function ShapeGrid({ shape, itemImage, itemSlug }: Props) {
  if (!shape?.length) return null;
  const rows = shape.length;
  const cols = Math.max(...shape.map(r => r.length));

  // Bounding box of primary (value-1) cells for item image placement
  let minRow = rows, maxRow = -1, minCol = cols, maxCol = -1;
  shape.forEach((row, r) => row.forEach((v, c) => {
    if (v === 1) {
      if (r < minRow) minRow = r;
      if (r > maxRow) maxRow = r;
      if (c < minCol) minCol = c;
      if (c > maxCol) maxCol = c;
    }
  }));
  const hasItemCells = maxRow >= 0;

  const localSrc = itemSlug ? `/images/items/${itemSlug}.png` : undefined;

  return (
    <div
      className="shape-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 32px)`, gridTemplateRows: `repeat(${rows}, 32px)` }}
    >
      {shape.flatMap((row, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const v = row[c] ?? 0;
          const src = TILE[v];
          return (
            <div key={`${r}-${c}`} className="shape-cell" style={{ gridColumn: c + 1, gridRow: r + 1 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {src && <img src={src} alt="" />}
            </div>
          );
        })
      )}
      {hasItemCells && (localSrc || itemImage) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={localSrc ?? itemImage}
          alt=""
          className="shape-item-img"
          style={{
            gridColumn: `${minCol + 1} / ${maxCol + 2}`,
            gridRow: `${minRow + 1} / ${maxRow + 2}`,
          }}
          onError={(e) => {
            if (itemImage && (e.target as HTMLImageElement).src !== itemImage) {
              (e.target as HTMLImageElement).src = itemImage;
            }
          }}
        />
      )}
    </div>
  );
}

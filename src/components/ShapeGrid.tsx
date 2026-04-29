interface Props {
  shape: number[][];
}

const TILE: Record<number, string> = {
  1: '/images/tiles/AffectedTile.webp',
  2: '/images/tiles/AffectedTile_noEffect.webp',
  3: '/images/tiles/AffectedTile_secondary_noEffect.webp',
  4: '/images/tiles/AffectedTile_tertiary_noEffect.webp',
  5: '/images/tiles/AffectedTile_lightning_noEffect.webp',
};

export default function ShapeGrid({ shape }: Props) {
  if (!shape?.length) return null;
  const rows = shape.length;
  const cols = Math.max(...shape.map(r => r.length));
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
            <div key={`${r}-${c}`} className="shape-cell">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {src && <img src={src} alt="" />}
            </div>
          );
        })
      )}
    </div>
  );
}

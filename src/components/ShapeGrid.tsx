interface Props {
  shape: number[][];
}

export default function ShapeGrid({ shape }: Props) {
  if (!shape?.length) return null;
  const rows = shape.length;
  const cols = Math.max(...shape.map(r => r.length));
  return (
    <div
      className="shape-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 22px)`, gridTemplateRows: `repeat(${rows}, 22px)` }}
    >
      {shape.flatMap((row, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const v = row[c] ?? 0;
          const cls = v === 0 ? 'shape-cell empty' : v === 2 ? 'shape-cell socket' : 'shape-cell fill';
          return <div key={`${r}-${c}`} className={cls} />;
        })
      )}
    </div>
  );
}

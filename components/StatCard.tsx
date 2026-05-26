export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-cask rounded-lg p-3 text-center border border-border-soft">
      <p className="font-mono text-[10px] tracking-mono-eyebrow lowercase text-ash mb-1">
        {label}
      </p>
      <p className="font-serif text-2xl text-amber">{value}</p>
    </div>
  );
}

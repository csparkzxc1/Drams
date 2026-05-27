export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="card p-3 text-center">
      <p className="font-mono text-[7px] tracking-[0.25em] uppercase text-ash-soft mb-1.5">
        {label}
      </p>
      <p className="font-serif text-2xl gold-text font-semibold">{value}</p>
    </div>
  );
}

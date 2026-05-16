export default function MethodBand() {
  const items = [
    { label: "Method", val: "Google Forms Survey" },
    { label: "Population", val: "University Students" },
    { label: "Collected", val: "April 2026" },
    { label: "Sample Size", val: "n = 100" },
    { label: "Institution", val: "Lahore Garrison University" },
  ];
  return (
    <div className="method-pad" style={{ background: "#EFEDE9", display: "flex", gap: 56, alignItems: "center", overflowX: "auto" }}>
      {items.map((it, idx) => (
        <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 56, flexShrink: 0 }}>
          <div>
            <div className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A09D99", fontWeight: 400 }}>{it.label}</div>
            <div className="serif" style={{ fontSize: "1rem", color: "#0F0E0C", fontWeight: 500 }}>{it.val}</div>
          </div>
          {idx < items.length - 1 && (
            <div style={{ width: 1, height: 24, background: "#E0DDD9" }} />
          )}
        </div>
      ))}
    </div>
  );
}

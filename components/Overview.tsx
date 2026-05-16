"use client";
import { useEffect, useRef } from "react";

const cards = [
  { num: "5.67", label: "Mean Hours / Day", sub: "Median 6h · Mode 7h · SD ±2.46h" },
  { num: "6.30", label: "Mean Sleep Hours", sub: "Median 6h · Mode 8h · SD ±1.84h" },
  { num: "62%", label: "Feel Addicted", sub: "28% Yes · 34% Maybe · 38% No" },
  { num: "50%", label: "Use Social Media", sub: "Education 21% · Gaming 12% · Comms 13%" },
];

export default function Overview() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
    }), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="overview" ref={ref} className="section-pad" style={{ background: "var(--bg)" }}>
      <div className="reveal header-flex">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <div style={{ width: 48, height: 2, background: "#0F0E0C" }} />
            <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A09D99" }}>01 — Descriptive Statistics</div>
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.9rem)", lineHeight: 1.1 }}>The Numbers <em style={{ color: "#0F0E0C" }}>at a Glance</em></h2>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#A09D99", fontWeight: 300, maxWidth: 280, textAlign: "right", lineHeight: 1.7 }}>Core statistical measures computed from 100 respondents across all key variables.</p>
      </div>
      <div className="grid-4">
        {cards.map((c, i) => (
          <div key={c.label} className={`reveal d${i + 1} hover-card`} style={{
            background: "#FFFFFF", border: "1px solid #ECECEA", borderRadius: 16,
            padding: "36px 28px", position: "relative", overflow: "hidden",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
          }}>
            <div className="serif" style={{ fontSize: "2.6rem", fontWeight: 600, color: "#0F0E0C", lineHeight: 1, marginBottom: 8 }}>{c.num}</div>
            <div className="mono" style={{ fontSize: "0.72rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "#A09D99", marginBottom: 10 }}>{c.label}</div>
            <div style={{ fontSize: "0.76rem", color: "#A09D99", lineHeight: 1.6 }}>{c.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";

const members = [
  { initial: "A", name: "Team Member 1", role: "Data Collection", grad: "#0F0E0C" },
  { initial: "B", name: "Team Member 2", role: "Statistical Analysis", grad: "#0F0E0C" },
  { initial: "C", name: "Team Member 3", role: "Data Visualization", grad: "#0F0E0C" },
  { initial: "D", name: "Team Member 4", role: "Presentation", grad: "#0F0E0C" },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
    }), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="team" ref={ref} className="section-pad" style={{ background: "#F8F7F4" }}>
      <div className="reveal header-flex">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <div style={{ width: 48, height: 2, background: "#0F0E0C" }} />
            <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A09D99" }}>06 — Research Team</div>
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.9rem)", lineHeight: 1.1 }}>The <em style={{ color: "#0F0E0C" }}>People</em><br />Behind the Data</h2>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#A09D99", fontWeight: 300, maxWidth: 280, textAlign: "right", lineHeight: 1.7 }}>BSCS students — Probability & Statistics, Spring 2026, Lahore Garrison University</p>
      </div>
      <div className="grid-4">
        {members.map((m, i) => (
          <div key={m.name} className={`reveal d${i + 1} hover-card`} style={{
            background: "#FFFFFF", border: "1px solid #ECECEA",
            borderRadius: 16, padding: "36px 24px", textAlign: "center",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
          }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: m.grad, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="serif" style={{ fontSize: "1.6rem", fontWeight: 600, color: "white" }}>{m.initial}</span>
            </div>
            <div className="serif" style={{ fontSize: "1.05rem", fontWeight: 600, color: "#0F0E0C", marginBottom: 4 }}>{m.name}</div>
            <div className="mono" style={{ fontSize: "0.7rem", color: "#A09D99", letterSpacing: "0.06em", textTransform: "uppercase" }}>{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

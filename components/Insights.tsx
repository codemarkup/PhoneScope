"use client";
import { useEffect, useRef } from "react";

const findings = [
  { num: "01", accent: "55%", title: "Check Phones While Studying", body: "55% of students check their phones Often or Very Often during study sessions. Only 4% report never checking — a significant academic distraction." },
  { num: "02", accent: "62%", title: "Self-Reported Addiction", body: "28% said Yes and 34% said Maybe to being addicted. Combined, 62% acknowledge some level of smartphone dependency." },
  { num: "03", accent: "±2.46", title: "High Usage Variability", body: "With a standard deviation of 2.46 hours, usage ranges from 1h to 11h per day — very different lifestyles within the same student population." },
  { num: "04", accent: "r≈0", title: "No Sleep Correlation", body: "Contrary to common belief, regression analysis found virtually zero correlation (r = -0.02) between daily phone usage and sleep hours." },
  { num: "05", accent: "57%", title: "Majority Aged 18–20", body: "57 of 100 respondents were aged 18–20, making early university years the prime demographic for high smartphone engagement." },
  { num: "06", accent: "0.46h", title: "Gender Gap Not Significant", body: "Males averaged 5.85h vs females 5.39h — a 0.46h difference our t-test confirms is statistically insignificant (p > 0.05)." },
];

export default function Insights() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
    }), { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="insights" ref={ref} className="section-pad" style={{ background: "#0D0C0A" }}>
      <div className="reveal header-flex">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <div style={{ width: 48, height: 2, background: "rgba(255,255,255,0.3)" }} />
            <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>04 — Key Findings</div>
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.9rem)", lineHeight: 1.1, color: "#FFFFFF" }}>What the Data <em style={{ color: "#FFFFFF" }}>Tells Us</em></h2>
        </div>
        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.3)", fontWeight: 300, maxWidth: 280, textAlign: "right", lineHeight: 1.7 }}>Six striking discoveries from our statistical analysis of 100 student responses.</p>
      </div>
      <div className="grid-3">
        {findings.map((f, i) => (
          <div key={f.num} className={`reveal d${(i % 3) + 1}`} style={{
            border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16,
            padding: "36px 28px", transition: "background 0.25s ease, border-color 0.25s ease",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(255,255,255,0.03)"; el.style.borderColor = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "transparent"; el.style.borderColor = "rgba(255,255,255,0.07)"; }}>
            <div className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>Finding {f.num}</div>
            <div className="serif" style={{ fontSize: "2.6rem", fontWeight: 600, color: "#FFFFFF", lineHeight: 1, marginBottom: 8 }}>{f.accent}</div>
            <div className="serif" style={{ fontSize: "1.15rem", fontStyle: "italic", color: "rgba(255,255,255,0.85)", marginBottom: 12, lineHeight: 1.3 }}>{f.title}</div>
            <div style={{ fontSize: "0.82rem", lineHeight: 1.8, color: "rgba(255,255,255,0.45)" }}>{f.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

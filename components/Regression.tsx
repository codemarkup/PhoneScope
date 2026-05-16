"use client";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const HOURS = [3,7,2,3,4,6,8,9,8,6,2,5,4,8,6,2,3,6,6,9,6,3,9,7,10,7,2,4,4,7,3,2,7,8,9,7,8,2,7,1,11,8,2,6,7,11,5,3,6,9,11,3,9,7,1,1,5,5,6,4,6,7,8,9,5,6,7,6,6,8,5,9,8,8,5,4,8,4,3,3,5,7,1,5,8,5,5,3,8,7,7,4,3,5,8,3,5,6,3,4];
const SLEEP = [8,6,2,6,4,8,4,5,9,6,4,7,8,5,4,7,8,6,6,7,9,9,7,5,4,9,9,9,5,5,4,5,9,4,4,4,4,7,4,9,8,5,8,8,6,5,4,4,7,5,6,6,7,7,6,6,9,5,5,9,4,4,8,8,7,6,7,8,8,7,9,7,8,8,8,9,4,9,6,5,5,8,6,6,8,4,8,5,8,5,5,9,6,3,8,3,4,8,6,4];

const pills = [
  { label: "Equation", val: "ŷ = 6.41 − 0.019x" },
  { label: "r", val: "−0.020" },
  { label: "R²", val: "0.0004" },
  { label: "n", val: "100" },
  { label: "Slope", val: "−0.019" },
  { label: "Intercept", val: "6.41" },
];

export default function Regression() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const created = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
    }), { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || created.current) return;
    created.current = true;
    new Chart(canvasRef.current, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Students",
            data: HOURS.map((h, i) => ({ x: h, y: SLEEP[i] })),
            backgroundColor: "rgba(61,53,128,0.4)",
            pointRadius: 5, pointHoverRadius: 7,
            pointBorderColor: "rgba(61,53,128,0.7)", pointBorderWidth: 1,
          },
          {
            label: "Regression Line (ŷ = 6.41 − 0.019x)",
            data: [{ x: 1, y: 6.39 }, { x: 11, y: 6.18 }],
            type: "line" as const,
            borderColor: "#0F0E0C", borderWidth: 2.5,
            pointRadius: 0, fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { usePointStyle: true, pointStyle: "circle", padding: 20, font: { family: "Geist, sans-serif", size: 12 } } }, datalabels: { display: false } },
        scales: {
          x: { title: { display: true, text: "Daily Phone Usage (hours)", font: { family: "Geist, sans-serif" } }, grid: { color: "#EEEAE2" }, border: { display: false }, min: 0, max: 12 },
          y: { title: { display: true, text: "Sleep Hours", font: { family: "Geist, sans-serif" } }, grid: { color: "#EEEAE2" }, border: { display: false }, min: 0, max: 12 },
        },
        animation: { duration: 1800 },
      },
    });
  }, []);

  return (
    <section id="regression" ref={sectionRef} className="section-pad" style={{ background: "#F8F7F4" }}>
      <div className="reveal header-flex">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <div style={{ width: 48, height: 2, background: "#0F0E0C" }} />
            <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A09D99" }}>05 — Scatter Plot & Regression</div>
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.9rem)", lineHeight: 1.1 }}>Phone Hours <em style={{ color: "#0F0E0C" }}>vs. Sleep</em></h2>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#A09D99", fontWeight: 300, maxWidth: 280, textAlign: "right", lineHeight: 1.7 }}>Full scatter plot of all 100 data points with fitted regression line and statistical summary.</p>
      </div>

      <div className="grid-reg">
        <div className="reveal">
          <p style={{ fontSize: "0.88rem", lineHeight: 1.9, color: "#6B6860", marginBottom: 24 }}>
            The regression model attempts to predict sleep hours from daily phone usage. The near-flat regression line visually confirms what the statistics show — almost no linear relationship exists.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {pills.map(p => (
              <div key={p.label} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFFFFF", border: "1px solid #ECECEA", borderRadius: 99, padding: "7px 16px", fontSize: "0.78rem", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                <span style={{ color: "#A09D99" }}>{p.label}</span>
                <strong className="mono" style={{ fontSize: "0.8rem", color: "#0F0E0C" }}>{p.val}</strong>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #ECECEA", borderRadius: 14, padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
            <div className="serif" style={{ fontSize: "1rem", fontWeight: 600, color: "#0F0E0C", marginBottom: 10 }}>Interpretation</div>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.8, color: "#6B6860" }}>
              For every extra hour of phone usage, predicted sleep decreases by just 0.019 hours (~1 minute). This negligible effect, combined with R² = 0.0004, confirms smartphone usage is not a meaningful predictor of sleep duration in our sample.
            </p>
          </div>
        </div>

        <div className="reveal d2 hover-card" style={{ background: "#FFFFFF", border: "1px solid #ECECEA", borderRadius: 20, padding: "32px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
          <div className="serif" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0F0E0C", marginBottom: 5 }}>Scatter: Phone Usage vs Sleep</div>
          <div style={{ fontSize: "0.76rem", color: "#A09D99", marginBottom: 24 }}>Each dot = one student. Black line = regression fit.</div>
          <div style={{ position: "relative", width: "100%", height: 400, minWidth: 0 }}><canvas ref={canvasRef} /></div>
        </div>
      </div>
    </section>
  );
}

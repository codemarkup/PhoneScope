"use client";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function Card({ tag, title, children }: { tag: string; title: string; children: React.ReactNode }) {
  return (
    <div className="reveal hover-card" style={{ background: "#FFFFFF", border: "1px solid #ECECEA", borderRadius: 20, padding: "40px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "inline-block", fontFamily: "Geist Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 2, background: "var(--bg2)", color: "var(--text3)", marginBottom: 18 }}>{tag}</div>
      <div className="serif" style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12, lineHeight: 1.3 }}>{title}</div>
      {children}
    </div>
  );
}

function Formula({ children }: { children: string }) {
  return (
    <div style={{ margin: "18px 0", background: "#F5F3F0", borderLeft: "2px solid #E0DDD9", borderRadius: "0 8px 8px 0", padding: "14px 16px", fontFamily: "Geist Mono, monospace", fontSize: "0.74rem", color: "#3D3580", lineHeight: 1.8, whiteSpace: "pre-line", wordBreak: "break-word" }}>{children}</div>
  );
}

function Result({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ padding: "14px 16px", background: "#F5F3F0", borderRadius: "0 8px 8px 0", borderLeft: `2px solid #0F0E0C` }}>
      <strong style={{ display: "block", fontSize: "0.8rem", color: "#0F0E0C", marginBottom: 4 }}>{title}</strong>
      <span style={{ fontSize: "0.77rem", color: "#A09D99" }}>{body}</span>
    </div>
  );
}

function CIVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const filled = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting && !filled.current) {
        filled.current = true;
        const fill = ref.current?.querySelector<HTMLDivElement>(".ci-fill");
        if (fill) fill.style.width = "40%";
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ margin: "18px 0", position: "relative", height: 70, background: "var(--bg2)", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "10%", right: "10%", height: 3, background: "#ECECEA", borderRadius: 2 }} />
      <div className="ci-fill" style={{ position: "absolute", top: 0, height: "100%", background: "linear-gradient(90deg,transparent,rgba(61,53,128,0.12),transparent)", width: 0, left: "25%", transition: "width 1.4s ease 0.4s" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 3, height: 36, background: "#3D3580", transform: "translate(-50%,-50%)", borderRadius: 1 }} />
      <div style={{ position: "absolute", top: "50%", left: "30%", width: 2, height: 24, background: "#3D3580", transform: "translate(-50%,-50%)", opacity: 0.5, borderRadius: 1 }} />
      <div style={{ position: "absolute", top: "50%", left: "70%", width: 2, height: 24, background: "#3D3580", transform: "translate(-50%,-50%)", opacity: 0.5, borderRadius: 1 }} />
      <div className="mono" style={{ position: "absolute", top: 10, left: "28%", transform: "translateX(-50%)", fontSize: "0.62rem", color: "#A09D99" }}>5.18h</div>
      <div className="mono" style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", fontSize: "0.62rem", color: "#3D3580" }}>5.67h</div>
      <div className="mono" style={{ position: "absolute", top: 10, left: "72%", transform: "translateX(-50%)", fontSize: "0.62rem", color: "#A09D99" }}>6.16h</div>
    </div>
  );
}

function HypTable() {
  const rows = [
    { param: "Male Mean", val: "5.85 hrs", badge: "Higher", bg: "#F8F7F4", color: "#6B6860" },
    { param: "Female Mean", val: "5.39 hrs", badge: "Lower", bg: "#F8F7F4", color: "#6B6860" },
    { param: "t-calculated", val: "0.91", badge: "|t| < t*", bg: "#F8F7F4", color: "#0F0E0C" },
    { param: "Decision", val: "Fail to Reject H₀", badge: "Accept H₀", bg: "#3D3580", color: "#FFFFFF" },
  ];
  return (
    <div style={{ width: "100%", overflowX: "auto", margin: "18px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 260 }}>
        <thead>
          <tr>
            {["Parameter","Value","Result"].map(h => (
              <th key={h} style={{ fontFamily: "Geist Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text3)", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid var(--border)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.param}>
              <td style={{ padding: "12px", fontSize: "0.83rem", fontWeight: 500, borderBottom: "1px solid var(--bg2)" }}>{r.param}</td>
              <td style={{ padding: "12px", fontSize: "0.83rem", color: "var(--text2)", borderBottom: "1px solid var(--bg2)" }}>{r.val}</td>
              <td style={{ padding: "12px", borderBottom: "1px solid var(--bg2)" }}>
                <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 3, fontSize: "0.7rem", fontFamily: "Geist Mono, monospace", background: r.bg, color: r.color }}>{r.badge}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RegressionMini() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const created = useRef(false);
  const hours = [3,7,2,3,4,6,8,9,8,6,2,5,4,8,6,2,3,6,6,9,6,3,9,7,10,7,2,4,4,7,3,2,7,8,9,7,8,2,7,1,11,8,2,6,7,11,5,3,6,9,11,3,9,7,1,1,5,5,6,4,6,7,8,9,5,6,7,6,6,8,5,9,8,8,5,4,8,4,3,3,5,7,1,5,8,5,5,3,8,7,7,4,3,5,8,3,5,6,3,4];
  const sleep = [8,6,2,6,4,8,4,5,9,6,4,7,8,5,4,7,8,6,6,7,9,9,7,5,4,9,9,9,5,5,4,5,9,4,4,4,4,7,4,9,8,5,8,8,6,5,4,4,7,5,6,6,7,7,6,6,9,5,5,9,4,4,8,8,7,6,7,8,8,7,9,7,8,8,8,9,4,9,6,5,5,8,6,6,8,4,8,5,8,5,5,9,6,3,8,3,4,8,6,4];
  useEffect(() => {
    if (!canvasRef.current || created.current) return;
    created.current = true;
    new Chart(canvasRef.current, {
      type: "scatter",
      data: { datasets: [
        { label: "Students", data: hours.map((h,i) => ({x:h,y:sleep[i]})), backgroundColor: "rgba(61,53,128,0.4)", pointRadius: 5 },
        { label: "Regression", data: [{x:1,y:6.39},{x:11,y:6.18}], type: "line" as const, borderColor: "#1A1A1A", borderWidth: 1.5, pointRadius: 0, fill: false }
      ]},
      options: { maintainAspectRatio: false, plugins: { legend: { display: false }, datalabels: { display: false } }, scales: { x: { title: { display: true, text: "Phone Hours" }, grid: { color: "rgba(0,0,0,0.04)" }, border: { display: false } }, y: { title: { display: true, text: "Sleep Hours" }, grid: { color: "rgba(0,0,0,0.04)" }, border: { display: false } } }, animation: { duration: 1500 } }
    });
  }, []);
  return <div style={{ position: "relative", width: "100%", height: 180, minWidth: 0, marginTop: 16 }}><canvas ref={canvasRef} style={{ borderRadius: 8, background: "var(--bg2)", padding: 8 }} /></div>;
}

export default function Analysis() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
    }), { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="analysis" ref={ref} className="section-pad" style={{ background: "#F8F7F4" }}>
      <div className="reveal header-flex">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <div style={{ width: 48, height: 2, background: "#0F0E0C" }} />
            <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A09D99" }}>03 — Post-Midterm Topics</div>
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.9rem)", lineHeight: 1.1 }}>Statistical <em style={{ color: "#0F0E0C" }}>Deep Dive</em></h2>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#A09D99", fontWeight: 300, maxWidth: 280, textAlign: "right", lineHeight: 1.7 }}>Three advanced techniques applied to real survey data — confidence intervals, hypothesis testing, and regression.</p>
      </div>
      <div className="grid-3">
        <Card tag="Confidence Interval" title="95% CI for Mean Daily Phone Usage">
          <p style={{ fontSize: "0.83rem", lineHeight: 1.8, color: "#6B6860" }}>We estimate the true population mean of daily smartphone usage with 95% confidence using Student&apos;s t-distribution.</p>
          <Formula>n = 100 | x̄ = 5.67 hrs
s = 2.46 | t* = 1.984 (df=99)
SE = s/√n = 2.46/10 = 0.246
ME = t* × SE = 1.984 × 0.246 = 0.49</Formula>
          <CIVisual />
          <Result title="95% CI: [5.18, 6.16]" body="We are 95% confident the true mean daily usage lies between 5.18 and 6.16 hours." />
        </Card>

        <Card tag="Hypothesis Testing" title="Do Males Use Phones More Than Females?">
          <p style={{ fontSize: "0.83rem", lineHeight: 1.8, color: "#6B6860" }}>Independent samples t-test to determine if the difference in phone usage between genders is statistically significant.</p>
          <Formula>H₀: μ_male = μ_female
H₁: μ_male ≠ μ_female | α = 0.05
x̄_male = 5.85h (n=59)
x̄_female = 5.39h (n=38)
t-calculated ≈ 0.91
t-critical (df≈95) = ±1.985</Formula>
          <HypTable />
          <Result title="No significant difference" body="t = 0.91 < t* = 1.985. Gender does not significantly affect phone usage (p > 0.05)." />
        </Card>

        <Card tag="Linear Regression" title="Does Phone Usage Predict Sleep Hours?">
          <p style={{ fontSize: "0.83rem", lineHeight: 1.8, color: "#6B6860" }}>Simple linear regression explores whether daily smartphone usage can predict the number of hours of sleep students get.</p>
          <Formula>r = -0.020 (near-zero correlation)
R² = 0.0004 (0.04% variance)
ŷ = 6.41 − 0.019x
Slope = -0.019 | Intercept = 6.41</Formula>
          <RegressionMini />
          <Result title="Surprising: No correlation!" body="r ≈ -0.02. Phone usage has virtually zero linear relationship with sleep hours in our sample." />
        </Card>
      </div>
    </section>
  );
}

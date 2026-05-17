"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const HOURS = [3,7,2,3,4,6,8,9,8,6,2,5,4,8,6,2,3,6,6,9,6,3,9,7,10,7,2,4,4,7,3,2,7,8,9,7,8,2,7,1,11,8,2,6,7,11,5,3,6,9,11,3,9,7,1,1,5,5,6,4,6,7,8,9,5,6,7,6,6,8,5,9,8,8,5,4,8,4,3,3,5,7,1,5,8,5,5,3,8,7,7,4,3,5,8,3,5,6,3,4];
const SLEEP = [8,6,2,6,4,8,4,5,9,6,4,7,8,5,4,7,8,6,6,7,9,9,7,5,4,9,9,9,5,5,4,5,9,4,4,4,4,7,4,9,8,5,8,8,6,5,4,4,7,5,6,6,7,7,6,6,9,5,5,9,4,4,8,8,7,6,7,8,8,7,9,7,8,8,8,9,4,9,6,5,5,8,6,6,8,4,8,5,8,5,5,9,6,3,8,3,4,8,6,4];

function Card({ tag, title, children }: { tag: string; title: string; children: React.ReactNode }) {
  return (
    <div className="reveal hover-card" style={{ background: "#FFFFFF", border: "1px solid #ECECEA", borderRadius: 20, padding: 36, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "inline-block", fontFamily: "Geist Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 2, background: "var(--bg2)", color: "var(--text3)", marginBottom: 18, alignSelf: "flex-start" }}>{tag}</div>
      <div className="serif" style={{ fontSize: "1.35rem", fontWeight: 600, marginBottom: 20, lineHeight: 1.2, color: "#0F0E0C" }}>{title}</div>
      {children}
    </div>
  );
}

function InteractiveCI() {
  const [level, setLevel] = useState<90 | 95 | 99>(95);
  const tVals = { 90: 1.660, 95: 1.984, 99: 2.626 };
  const SE = 0.246;
  const mean = 5.67;
  const ME = tVals[level] * SE;
  const left = mean - ME;
  const right = mean + ME;

  const min = 3;
  const max = 9;
  const scale = max - min;
  const leftPct = ((left - min) / scale) * 100;
  const widthPct = ((right - left) / scale) * 100;
  const meanPct = ((mean - min) / scale) * 100;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {[90, 95, 99].map(l => (
          <button key={l} onClick={() => setLevel(l as any)} style={{
            flex: 1, padding: "8px 0", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
            background: level === l ? "#3D3580" : "#F8F7F4",
            color: level === l ? "#FFFFFF" : "#6B6860",
            border: level === l ? "1px solid #3D3580" : "1px solid #ECECEA"
          }}>{l}%</button>
        ))}
      </div>
      
      <div style={{ position: "relative", height: 100, background: "#F8F7F4", borderRadius: 12, marginBottom: 24 }}>
        {/* Baseline */}
        <div style={{ position: "absolute", top: "50%", left: 20, right: 20, height: 2, background: "#E8E5E1", transform: "translateY(-50%)" }} />
        
        {/* Band */}
        <div style={{ position: "absolute", top: "50%", left: `calc(20px + (100% - 40px) * ${leftPct / 100})`, width: `calc((100% - 40px) * ${widthPct / 100})`, height: 32, background: "rgba(61,53,128,0.2)", transform: "translateY(-50%)", borderRadius: 4, transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
        
        {/* Mean Marker */}
        <div style={{ position: "absolute", top: "50%", left: `calc(20px + (100% - 40px) * ${meanPct / 100})`, width: 4, height: 44, background: "#3D3580", transform: "translate(-50%, -50%)", borderRadius: 2 }} />
        
        {/* Ticks & Labels */}
        <div className="mono" style={{ position: "absolute", bottom: 12, left: 20, transform: "translateX(-50%)", fontSize: "0.65rem", color: "#A09D99" }}>3</div>
        <div className="mono" style={{ position: "absolute", bottom: 12, left: `calc(20px + (100% - 40px) * ${meanPct / 100})`, transform: "translateX(-50%)", fontSize: "0.65rem", color: "#3D3580", fontWeight: 600 }}>{mean.toFixed(2)}</div>
        <div className="mono" style={{ position: "absolute", bottom: 12, right: 20, transform: "translateX(50%)", fontSize: "0.65rem", color: "#A09D99" }}>9</div>

        <div className="mono" style={{ position: "absolute", top: 12, left: `calc(20px + (100% - 40px) * ${leftPct / 100})`, transform: "translateX(-50%)", fontSize: "0.65rem", color: "#3D3580", transition: "left 0.5s cubic-bezier(0.4,0,0.2,1)" }}>{left.toFixed(2)}</div>
        <div className="mono" style={{ position: "absolute", top: 12, left: `calc(20px + (100% - 40px) * ${(leftPct+widthPct) / 100})`, transform: "translateX(-50%)", fontSize: "0.65rem", color: "#3D3580", transition: "left 0.5s cubic-bezier(0.4,0,0.2,1)" }}>{right.toFixed(2)}</div>
      </div>

      <div style={{ marginTop: "auto", padding: 16, background: "#F8F7F4", borderRadius: 12, borderLeft: "3px solid #3D3580" }}>
        <div style={{ fontSize: "0.75rem", color: "#6B6860", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{level}% Confidence Interval</div>
        <div className="serif" style={{ fontSize: "1.8rem", color: "#0F0E0C", lineHeight: 1 }}>[{left.toFixed(2)} — {right.toFixed(2)} hrs]</div>
      </div>
    </div>
  );
}

function InteractiveHypothesis() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if(e[0].isIntersecting) setShow(true);
    }, { threshold: 0.2 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: 6 }}><span style={{color:"#6B6860"}}>Male (n=59)</span><span className="mono" style={{color:"#0F0E0C"}}>5.85h</span></div>
        <div style={{ height: 12, background: "#F8F7F4", borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ height: "100%", background: "#3D3580", width: show ? `${(5.85/12)*100}%` : "0%", transition: "width 1.2s cubic-bezier(0.2,0.8,0.2,1)" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: 6 }}><span style={{color:"#6B6860"}}>Female (n=38)</span><span className="mono" style={{color:"#0F0E0C"}}>5.39h</span></div>
        <div style={{ height: 12, background: "#F8F7F4", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "#A09D99", width: show ? `${(5.39/12)*100}%` : "0%", transition: "width 1.2s cubic-bezier(0.2,0.8,0.2,1) 0.2s" }} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#F8F7F4", borderRadius: 8, marginBottom: 24 }}>
        <div style={{ fontSize: "0.8rem", color: "#6B6860" }}>Diff: <strong style={{color:"#0F0E0C"}}>0.46h</strong></div>
        <div className="mono" style={{ fontSize: "0.65rem", background: "#ECECEA", color: "#6B6860", padding: "4px 8px", borderRadius: 4 }}>NOT SIGNIFICANT (p &gt; 0.05)</div>
      </div>

      <div style={{ marginTop: "auto", position: "relative", height: 110, borderBottom: "1px solid #ECECEA" }}>
        <svg viewBox="0 0 400 110" style={{ width: "100%", height: "100%", overflow: "visible" }} preserveAspectRatio="none">
          <defs>
            <clipPath id="left-tail"><rect x="0" y="0" width="100" height="110" /></clipPath>
            <clipPath id="right-tail"><rect x="300" y="0" width="100" height="110" /></clipPath>
          </defs>
          
          <path d="M 0 109 C 100 109, 130 10, 200 10 C 270 10, 300 109, 400 109 L 400 110 L 0 110 Z" fill="rgba(236,236,234,0.3)" />
          <path clipPath="url(#left-tail)" d="M 0 109 C 100 109, 130 10, 200 10 C 270 10, 300 109, 400 109 L 400 110 L 0 110 Z" fill="rgba(220,53,69,0.15)" />
          <path clipPath="url(#right-tail)" d="M 0 109 C 100 109, 130 10, 200 10 C 270 10, 300 109, 400 109 L 400 110 L 0 110 Z" fill="rgba(220,53,69,0.15)" />

          <path d="M 0 109 C 100 109, 130 10, 200 10 C 270 10, 300 109, 400 109" fill="none" stroke="#A09D99" strokeWidth="2" strokeDasharray="500" strokeDashoffset={show ? 0 : 500} style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)" }} />
          
          <line x1="100" y1="20" x2="100" y2="110" stroke="rgba(220,53,69,0.5)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="300" y1="20" x2="300" y2="110" stroke="rgba(220,53,69,0.5)" strokeWidth="1" strokeDasharray="4 4" />
          
          <g style={{ transform: show ? "translateY(0)" : "translateY(-10px)", opacity: show ? 1 : 0, transition: "all 0.6s 1s" }}>
            <line x1="245.5" y1="10" x2="245.5" y2="110" stroke="#3D3580" strokeWidth="2" />
            <circle cx="245.5" cy="10" r="4" fill="#3D3580" />
            <text x="245.5" y="-3" textAnchor="middle" fill="#3D3580" fontSize="11" fontFamily="Geist Mono, monospace">t=0.91</text>
          </g>

          <text x="100" y="12" textAnchor="middle" fill="rgba(220,53,69,0.8)" fontSize="11" fontFamily="Geist Mono, monospace">-1.985</text>
          <text x="300" y="12" textAnchor="middle" fill="rgba(220,53,69,0.8)" fontSize="11" fontFamily="Geist Mono, monospace">+1.985</text>
        </svg>
      </div>
    </div>
  );
}

function InteractiveRegression() {
  const [val, setVal] = useState(6);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const pred = 6.41 - 0.019 * val;

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartInstance.current) {
      chartInstance.current.data.datasets[1].data = [{ x: val, y: pred }] as any;
      chartInstance.current.update('none');
      return;
    }

    chartInstance.current = new Chart(canvasRef.current, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Students",
            data: HOURS.map((h, i) => ({ x: h, y: SLEEP[i] })),
            backgroundColor: "rgba(160,157,153,0.3)",
            pointRadius: 3,
            animation: false,
          },
          {
            label: "Prediction",
            data: [{ x: val, y: pred }],
            backgroundColor: "#3D3580",
            pointRadius: 8,
            pointBorderColor: "#FFFFFF",
            pointBorderWidth: 2,
            animation: false,
          },
          {
            label: "Line",
            data: [{ x: 1, y: 6.39 }, { x: 12, y: 6.18 }],
            type: "line",
            borderColor: "#E8E5E1",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            animation: false,
          }
        ] as any
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, datalabels: { display: false } as any, tooltip: { enabled: false } },
        scales: {
          x: { min: 0, max: 12, grid: { display: false }, border: { display: false }, ticks: { display: false } },
          y: { min: 0, max: 12, grid: { display: false }, border: { display: false }, ticks: { display: false } },
        },
        animation: false,
      }
    } as any);

    return () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    }
  }, [val, pred]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "0.8rem", color: "#6B6860" }}>Usage: {val}h</span>
          <span style={{ fontSize: "0.8rem", color: "#3D3580", fontWeight: 600 }}>Sleep: {pred.toFixed(2)}h</span>
        </div>
        <input type="range" min="1" max="12" step="0.5" value={val} onChange={e => setVal(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#3D3580", cursor: "pointer" }} />
      </div>

      <div style={{ position: "relative", height: 140, background: "#F8F7F4", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>

      <div style={{ marginTop: "auto", fontSize: "0.8rem", lineHeight: 1.6, color: "#6B6860" }}>
        If <strong style={{color:"#0F0E0C"}}>r = -0.9</strong>, this would mean strong prediction. But since <strong style={{color:"#0F0E0C"}}>r = -0.02</strong>, moving the slider barely changes the sleep estimate. Smartphone usage explains almost nothing about sleep duration.
      </div>
    </div>
  );
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
          <InteractiveCI />
        </Card>

        <Card tag="Hypothesis Testing" title="Do Males Use Phones More Than Females?">
          <InteractiveHypothesis />
        </Card>

        <Card tag="Linear Regression" title="Does Phone Usage Predict Sleep Hours?">
          <InteractiveRegression />
        </Card>
      </div>
    </section>
  );
}

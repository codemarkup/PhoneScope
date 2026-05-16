"use client";
import { useEffect, useRef, useState } from "react";

const floaters = [
  { label: "Mean Usage", val: "5.67 hrs", style: { top: "8%", right: "0%" } },
  { label: "Social Media", val: "50%", style: { bottom: "12%", left: "0%" } },
  { label: "Study Distraction", val: "55%", style: { top: "52%", right: "0%" } },
];

function AnimatedNumber({ target, suffix = "", decimals = 0 }: { target: number, suffix?: string, decimals?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2500;
    const startTime = performance.now();
    let frameId: number;
    const update = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - p, 4);
      setVal(start + (end - start) * easeOut);
      if (p < 1) frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [target]);
  return <>{val.toFixed(decimals)}{suffix}</>;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = 300, H = 300;
    canvas.width = W; canvas.height = H;
    const cx = W / 2, cy = H / 2, r = 110, lw = 22;
    const data = [{ v: 28, c: "#3D3580" }, { v: 34, c: "#8B86C0" }, { v: 38, c: "#E0DEF4" }];
    let drawn = 0;
    let start = -Math.PI / 2;
    const total = 100;
    let frame = 0;
    const FRAMES = 80;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(238,234,226,0.5)";
      ctx.beginPath();
      ctx.arc(cx, cy, r + lw / 2 + 2, 0, Math.PI * 2);
      ctx.fill();
      const progress = Math.min(frame / FRAMES, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      let s = start;
      data.forEach((d, i) => {
        const angle = (d.v / total) * Math.PI * 2 * ease;
        ctx.beginPath();
        ctx.arc(cx, cy, r, s, s + angle);
        ctx.strokeStyle = d.c;
        ctx.lineWidth = lw;
        ctx.lineCap = "butt";
        ctx.stroke();
        
        // draw white gap
        if (i < data.length) {
           ctx.beginPath();
           ctx.arc(cx, cy, r, s + angle - 0.03, s + angle + 0.03);
           ctx.strokeStyle = "white";
           ctx.lineWidth = lw + 2;
           ctx.stroke();
        }
        
        s += angle;
      });
      ctx.beginPath();
      ctx.arc(cx, cy, r - lw / 2 - 4, 0, Math.PI * 2);
      ctx.fillStyle = "#F8F7F4";
      ctx.fill();
      frame++;
      if (frame <= FRAMES + 10) requestAnimationFrame(draw);
    }
    draw();
  }, []);

  return (
    <section className="hero-grid hero-pad">
      <div>
        <div className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A09D99", marginBottom: 22, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 36, height: 1, background: "#0F0E0C", display: "inline-block" }} />
          Probability & Statistics — Research Project
        </div>
        <h1 className="serif" style={{ fontSize: "clamp(2.8rem,4.5vw,4.8rem)", lineHeight: 1.06, letterSpacing: "-0.02em", marginBottom: 28 }}>
          How Students <em style={{ color: "#0F0E0C" }}>Really</em><br />Use Their Phones
        </h1>
        <p style={{ fontSize: "0.98rem", lineHeight: 1.85, color: "var(--text2)", maxWidth: 440, marginBottom: 48 }}>
          A data-driven investigation into smartphone behavior among university students — powered by 100 real survey responses and rigorous statistical analysis.
        </p>
        <div className="hero-stats-row" style={{ display: "flex", gap: 40, paddingTop: 36, borderTop: "1px solid #E8E5E1" }}>
          <div>
            <div className="serif" style={{ fontSize: "2.2rem", fontWeight: 600, lineHeight: 1, marginBottom: 4 }}><AnimatedNumber target={100} /></div>
            <div className="mono" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#A09D99" }}>Respondents</div>
          </div>
          <div>
            <div className="serif" style={{ fontSize: "2.2rem", fontWeight: 600, lineHeight: 1, marginBottom: 4 }}><AnimatedNumber target={14} /></div>
            <div className="mono" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#A09D99" }}>Questions</div>
          </div>
          <div>
            <div className="serif" style={{ fontSize: "2.2rem", fontWeight: 600, lineHeight: 1, marginBottom: 4 }}><AnimatedNumber target={5.67} decimals={2} suffix="h" /></div>
            <div className="mono" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#A09D99" }}>Avg Daily Usage</div>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minWidth: 0 }}>
        <div className="hero-circle" style={{ width: 340, height: 340, borderRadius: "50%", background: "linear-gradient(135deg,#FFFFFF,#F8F7F4)", position: "absolute" }} />
        <div className="hero-canvas-wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ position: "relative", width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <canvas ref={canvasRef} style={{ position: "absolute" }} />
            <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
              <div className="serif" style={{ fontSize: "3rem", fontWeight: 600, lineHeight: 1, color: "#0F0E0C" }}>62%</div>
              <div className="mono" style={{ fontSize: "0.72rem", color: "#A09D99", letterSpacing: "0.05em", marginTop: 4 }}>Phone-Dependent</div>
            </div>
          </div>
        </div>
        {floaters.map(f => (
          <div key={f.label} className="floater" style={{
            position: "absolute", background: "#FFFFFF", border: "1px solid #ECECEA",
            borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            zIndex: 3, animation: "floatY 4s ease-in-out infinite", ...f.style
          }}>
            <div className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A09D99", marginBottom: 3 }}>{f.label}</div>
            <div className="serif" style={{ fontSize: "1.3rem", fontWeight: 600, color: "#0F0E0C" }}>{f.val}</div>
          </div>
        ))}
      </div>

      <style>{`@keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }`}</style>
    </section>
  );
}

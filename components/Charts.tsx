"use client";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(...registerables, ChartDataLabels);

function SectionHeader() {
  return (
    <div className="reveal header-flex">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
          <div style={{ width: 48, height: 2, background: "#0F0E0C" }} />
          <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A09D99" }}>02 — Visual Analysis</div>
        </div>
        <h2 className="serif" style={{ fontSize: "clamp(1.9rem,3vw,2.9rem)", lineHeight: 1.1 }}>Data <em style={{ color: "#0F0E0C" }}>Visualized</em></h2>
      </div>
      <p style={{ fontSize: "0.82rem", color: "#A09D99", fontWeight: 300, maxWidth: 280, textAlign: "right", lineHeight: 1.7 }}>Interactive charts drawn from raw survey responses. Every segment represents real student data.</p>
    </div>
  );
}

function ChartCard({ title, subtitle, children, wide }: { title: string; subtitle: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`reveal hover-card ${wide ? 'chart-wide' : ''}`} style={{
      background: "#FFFFFF", border: "1px solid #ECECEA", borderRadius: 20,
      padding: "32px", gridColumn: wide ? "span 2" : undefined,
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
    }}>
      <div className="serif" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0F0E0C", marginBottom: 5 }}>{title}</div>
      <div style={{ fontSize: "0.76rem", color: "#A09D99", marginBottom: 24, lineHeight: 1.5 }}>{subtitle}</div>
      {children}
    </div>
  );
}

function DonutLegend({ items }: { items: { label: string; pct: string; color: string }[] }) {
  return (
    <div style={{ flex: 1 }}>
      {items.map(it => (
        <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: it.color, flexShrink: 0 }} />
          <span style={{ fontSize: "0.82rem", color: "var(--text2)", flex: 1 }}>{it.label}</span>
          <span className="mono" style={{ fontSize: "0.78rem", color: "var(--text3)" }}>{it.pct}</span>
        </div>
      ))}
    </div>
  );
}

function AnimatedBars({ rows }: { rows: { label: string; pct: number; color: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        ref.current?.querySelectorAll<HTMLDivElement>(".bar-fill").forEach(b => {
          b.style.width = b.dataset.w + "%";
        });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginTop: 8 }}>
      {rows.map(r => (
        <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <span style={{ fontSize: "0.76rem", color: "#6B6860", width: 96, textAlign: "right", flexShrink: 0, fontWeight: 500 }}>{r.label}</span>
          <div style={{ flex: 1, height: 8, background: "#F8F7F4", borderRadius: 99, overflow: "hidden" }}>
            <div className="bar-fill" data-w={r.pct} style={{ height: "100%", borderRadius: 99, width: 0, background: r.color, transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
          <span className="mono" style={{ fontSize: "0.72rem", color: "#A09D99", width: 36, flexShrink: 0 }}>{r.pct}%</span>
        </div>
      ))}
    </div>
  );
}

export default function Charts() {
  const usageRef = useRef<HTMLCanvasElement>(null);
  const useRef2 = useRef<HTMLCanvasElement>(null);
  const addRef = useRef<HTMLCanvasElement>(null);
  const demoRef = useRef<HTMLCanvasElement>(null);
  const sleepRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartsCreated = useRef(false);

  useEffect(() => {
    const createCharts = () => {
      if (chartsCreated.current) return;
      chartsCreated.current = true;

      const defaults = { font: { family: "'Geist', sans-serif" }, color: "#8A8278" };
      Chart.defaults.font.family = defaults.font.family;
      Chart.defaults.color = defaults.color;

    // Usage histogram
    if (usageRef.current) new Chart(usageRef.current, {
      type: "bar",
      data: {
        labels: ["1h","2h","3h","4h","5h","6h","7h","8h","9h","10h","11h"],
        datasets: [
          {
            type: "line",
            label: "Trend",
            data: [3,9,10,7,11,14,12,16,7,2,3],
            borderColor: "#0F0E0C",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            fill: false,
            datalabels: { display: false },
            animation: {
              duration: 1500,
              delay: (ctx: any) => ctx.dataIndex * 150
            }
          },
          { label: "Students", data: [3,9,10,7,11,14,12,16,7,2,3],
          backgroundColor: (ctx: any) => {
            const v = (ctx.parsed?.y ?? 0) as number;
            const a = 0.35 + (v/16)*0.65;
            return `rgba(61,53,128,${a})`;
          },
          borderRadius: 6, borderSkipped: false,
          animation: {
            duration: 1500,
            delay: (ctx: any) => ctx.dataIndex * 150
          } }
        ]
      },
      options: { maintainAspectRatio: false, plugins: { legend: { display: false }, datalabels: { color: '#0F0E0C', font: { family: 'Geist Mono, monospace', size: 9 }, anchor: 'end', align: 'end', formatter: (val) => val > 0 ? val : '' } }, scales: { x: { grid: { display: false }, border: { display: false } }, y: { grid: { color: "#ECECEA" }, border: { display: false }, suggestedMax: 18 } } }
    });

    // Use donut
    if (useRef2.current) new Chart(useRef2.current, {
      type: "doughnut",
      data: { labels: ["Social Media","Education","Communication","Gaming","Other"], datasets: [{ data: [50,21,13,12,5], backgroundColor: ["#3D3580","#574FA5","#736CCC","#8B86C0","#A6A3CC"], borderWidth: 0, hoverOffset: 8 }] },
      options: { maintainAspectRatio: false, cutout: "66%", plugins: { legend: { display: false }, datalabels: { display: false } }, animation: { duration: 1500 } }
    });

    // Addiction donut
    if (addRef.current) new Chart(addRef.current, {
      type: "doughnut",
      data: { labels: ["Yes","Maybe","No"], datasets: [{ data: [28,34,38], backgroundColor: ["#3D3580","#736CCC","#A6A3CC"], borderWidth: 0, hoverOffset: 8 }] },
      options: { maintainAspectRatio: false, cutout: "66%", plugins: { legend: { display: false }, datalabels: { display: false } }, animation: { duration: 1500 } }
    });

    // Demographics
    if (demoRef.current) new Chart(demoRef.current, {
      type: "bar",
      data: {
        labels: ["18–20 yrs","21–23 yrs","24–26 yrs","Above 26"],
        datasets: [
          { label: "Male", data: [35,19,4,4], backgroundColor: "#3D3580", borderRadius: 6, borderSkipped: false },
          { label: "Female", data: [20,11,5,2], backgroundColor: "#8B86C0", borderRadius: 6, borderSkipped: false }
        ]
      },
      options: { maintainAspectRatio: false, plugins: { legend: { labels: { usePointStyle: true, pointStyle: "circle", padding: 20 } }, datalabels: { color: '#0F0E0C', font: { family: 'Geist Mono, monospace', size: 9 }, anchor: 'end', align: 'end', formatter: (val) => val > 0 ? val : '' } }, scales: { x: { grid: { display: false }, border: { display: false } }, y: { grid: { color: "#ECECEA" }, border: { display: false }, suggestedMax: 40 } }, animation: { duration: 1500 } }
    });

    // Sleep histogram
    if (sleepRef.current) new Chart(sleepRef.current, {
      type: "bar",
      data: {
        labels: ["2h","3h","4h","5h","6h","7h","8h","9h"],
        datasets: [
          {
            type: "line",
            label: "Trend",
            data: [1,2,22,14,16,14,19,12],
            borderColor: "#0F0E0C",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            fill: false,
            datalabels: { display: false },
            animation: {
              duration: 1500,
              delay: (ctx: any) => ctx.dataIndex * 150
            }
          },
          { label: "Students", data: [1,2,22,14,16,14,19,12],
          backgroundColor: (ctx: any) => {
            const v = (ctx.parsed?.y ?? 0) as number;
            const a = 0.35 + (v/22)*0.65;
            return `rgba(61,53,128,${a})`;
          },
          borderRadius: 6, borderSkipped: false,
          animation: {
            duration: 1500,
            delay: (ctx: any) => ctx.dataIndex * 150
          } }
        ]
      },
      options: { maintainAspectRatio: false, plugins: { legend: { display: false }, datalabels: { color: '#0F0E0C', font: { family: 'Geist Mono, monospace', size: 9 }, anchor: 'end', align: 'end', formatter: (val) => val > 0 ? val : '' } }, scales: { x: { grid: { display: false }, border: { display: false } }, y: { grid: { color: "#ECECEA" }, border: { display: false }, suggestedMax: 25 } } }
    });
  };

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      entries[0].target.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
      createCharts();
    }
  }, { threshold: 0.1 });
  
  if (sectionRef.current) obs.observe(sectionRef.current);
  return () => obs.disconnect();
}, []);

  return (
    <section id="charts" ref={sectionRef} className="section-pad" style={{ background: "#F8F7F4" }}>
      <SectionHeader />
      <div className="grid-2">

        <ChartCard title="Daily Phone Usage Distribution" subtitle="Hours per day across all 100 students — mean 5.67h, SD ±2.46h">
          <div style={{ position: "relative", width: "100%", height: 260, minWidth: 0 }}><canvas ref={usageRef} /></div>
        </ChartCard>

        <ChartCard title="Primary Smartphone Use" subtitle="What students mostly use their phones for">
          <div className="donut-flex" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 170, height: 170, flexShrink: 0 }}><canvas ref={useRef2} /></div>
            <DonutLegend items={[
              { label: "Social Media", pct: "50%", color: "#3D3580" },
              { label: "Education", pct: "21%", color: "#574FA5" },
              { label: "Communication", pct: "13%", color: "#736CCC" },
              { label: "Gaming", pct: "12%", color: "#8B86C0" },
              { label: "Other", pct: "5%", color: "#A6A3CC" },
            ]} />
          </div>
        </ChartCard>

        <ChartCard title="Phone Checking During Study" subtitle="How often students check phones while studying — 55% do so often or very often">
          <AnimatedBars rows={[
            { label: "Very Often", pct: 25, color: "#3D3580" },
            { label: "Often", pct: 30, color: "#574FA5" },
            { label: "Sometimes", pct: 28, color: "#736CCC" },
            { label: "Rarely", pct: 12, color: "#8B86C0" },
            { label: "Never", pct: 4, color: "#A6A3CC" },
          ]} />
        </ChartCard>

        <ChartCard title="Self-Reported Addiction" subtitle="Do you feel addicted to your smartphone?">
          <div className="donut-flex" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 170, height: 170, flexShrink: 0 }}><canvas ref={addRef} /></div>
            <DonutLegend items={[
              { label: "Yes", pct: "28%", color: "#3D3580" },
              { label: "Maybe", pct: "34%", color: "#736CCC" },
              { label: "No", pct: "38%", color: "#A6A3CC" },
            ]} />
          </div>
        </ChartCard>

        <ChartCard title="Demographics — Age & Gender Breakdown" subtitle="Age group and gender distribution across all 100 respondents" wide>
          <div style={{ position: "relative", width: "100%", height: 250, minWidth: 0 }}><canvas ref={demoRef} /></div>
        </ChartCard>

        <ChartCard title="Sleep Hours Distribution" subtitle="Daily sleep reported — mean 6.3h, SD ±1.84h" wide>
          <div style={{ position: "relative", width: "100%", height: 250, minWidth: 0 }}><canvas ref={sleepRef} /></div>
        </ChartCard>

      </div>
    </section>
  );
}

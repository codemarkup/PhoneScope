export default function Footer() {
  return (
    <footer className="footer-flex section-pad" style={{ background: "#0D0C0A", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div>
        <div className="serif" style={{ fontSize: "1.1rem", color: "#F7F5F0", fontWeight: 600, marginBottom: 4 }}>PhoneScope</div>
        <div className="mono" style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>Smartphone Usage Study 2026</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>Probability & Statistics · Spring 2026</div>
        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.2)", marginTop: 4 }}>Lahore Garrison University · BSCS</div>
      </div>
      <div className="mono" style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", textAlign: "right" }}>
        n = 100 · April 2026<br />
        <span style={{ color: "rgba(255,255,255,0.15)" }}>Ms. Shumaila Nisar</span>
      </div>
    </footer>
  );
}

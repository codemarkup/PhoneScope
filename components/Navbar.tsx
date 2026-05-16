"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "Overview", href: "#overview" },
  { label: "Data", href: "#charts" },
  { label: "Analysis", href: "#analysis" },
  { label: "Insights", href: "#insights" },
  { label: "Team", href: "#team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="nav-pad" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: "rgba(248,247,244,0.88)",
      backdropFilter: "blur(14px)",
      boxShadow: scrolled ? "0 1px 0 #E8E5E1" : "none",
      transition: "box-shadow 0.2s ease"
    }}>
      <div className="serif" style={{ fontSize: "1.15rem", fontWeight: 600, letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0F0E0C", display: "inline-block" }} />
        PhoneScope
      </div>

      <ul className="nav-links" style={{ display: "flex", gap: 36, listStyle: "none" }}>
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={e => scrollTo(e, l.href)}
              style={{
                fontSize: "0.72rem", letterSpacing: "0.11em",
                textTransform: "uppercase", color: "var(--text2)",
                textDecoration: "none", fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0F0E0C")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text2)")}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mono" style={{
        fontSize: "0.7rem", color: "#A09D99",
        border: "1px solid #ECECEA", padding: "4px 14px", borderRadius: 2,
      }}>
        Spring 2026
      </div>
    </nav>
  );
}

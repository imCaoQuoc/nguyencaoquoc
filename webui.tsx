"use client";
import React, { useMemo, useState, useEffect } from "react";

// Single-file Next.js page with TS + JS + CSS (styled-jsx) — drop into app/page.tsx
// Works without external libraries. Includes:
// - Sticky Navbar with anchors
// - Light/Dark theme toggle (persists to localStorage)
// - Hero, Features, Gallery, CTA, and Footer sections
// - Responsive grid, CSS animations, and accessible semantics

export default function Page(): JSX.Element {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Restore theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") setTheme(saved);
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main>
      <a className="skip" href="#content">Skip to content</a>

      <nav className="nav">
        <div className="container nav-inner">
          <div className="brand">⚡️ OneFile UI</div>
          <ul className="links">
            <li><a href="#features">Features</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button
            aria-label="Toggle theme"
            className="toggle"
            onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      <header className="hero" id="content">
        <div className="container hero-inner">
          <h1>
            Ship a beautiful UI in <span className="accent">one file</span>.
          </h1>
          <p className="subtitle">
            TypeScript, JavaScript, CSS & Next.js — neatly packed into a single page.
          </p>
          <div className="cta">
            <a className="btn primary" href="#features">Explore Features</a>
            <a className="btn ghost" href="#contact">Get Started</a>
          </div>
        </div>
        <div className="hero-bg" aria-hidden="true" />
      </header>

      <section id="features" className="section">
        <div className="container">
          <h2>Features</h2>
          <p className="section-lead">What you get out-of-the-box.</p>
          <div className="grid features">
            {[
              {
                title: "Type-Safe by Default",
                desc: "Written in TypeScript with strict props and helpful hints.",
              },
              {
                title: "No Dependencies",
                desc: "Runs on pure React + Next.js. Zero extra packages.",
              },
              {
                title: "Responsive Grid",
                desc: "CSS Grid & Flexbox ensure a crisp layout on any screen.",
              },
              {
                title: "Accessible",
                desc: "Semantic HTML, focus styles, and skip links built-in.",
              },
              {
                title: "Dark Mode",
                desc: "Theme toggle with persistence via localStorage.",
              },
              {
                title: "Deploy Anywhere",
                desc: "Vercel, GitHub Pages (static export), or your own host.",
              },
            ].map((f, i) => (
              <article className="card" key={i}>
                <div className="card-icon" aria-hidden>
                  {"✨"}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section alt">
        <div className="container">
          <h2>Gallery</h2>
          <p className="section-lead">A minimal component set to start fast.</p>
          <div className="grid gallery">
            {["Card", "Stats", "Testimonial", "Pricing"].map((name, i) => (
              <div className="tile" key={i}>
                <div className="tile-header">{name}</div>
                <div className="tile-body">
                  <p>
                    This is a placeholder for your {name.toLowerCase()} block. Replace with
                    real content or components.
                  </p>
                  <button className="btn sm">Action</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container">
          <h2>FAQ</h2>
          <details className="faq">
            <summary>Can I use this on GitHub Pages?</summary>
            <p>
              Yes. Run <code>next build</code> then <code>next export</code> to generate a static
              <code>out/</code> folder. Push it to a <code>gh-pages</code> branch.
            </p>
          </details>
          <details className="faq">
            <summary>Is it really one file?</summary>
            <p>
              Yep — this page includes its own CSS via <code>styled-jsx</code> so you can keep a
              single source file in <code>app/page.tsx</code>.
            </p>
          </details>
          <details className="faq">
            <summary>How do I customize colors and spacing?</summary>
            <p>
              Tweak the CSS variables in the <code>:root</code> and <code>[data-theme="dark"]</code>
              blocks below.
            </p>
          </details>
        </div>
      </section>

      <section id="contact" className="section alt">
        <div className="container contact">
          <h2>Contact</h2>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Name
              <input required type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input required type="email" placeholder="you@example.com" />
            </label>
            <label className="full">
              Message
              <textarea rows={5} placeholder="Tell us what you need…" />
            </label>
            <button className="btn primary" type="submit">Send</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {year} OneFile UI</span>
          <a href="#content" className="back-to-top">Back to top ↑</a>
        </div>
      </footer>

      {/* ---- Styles (CSS-in-TSX with styled-jsx) ---- */}
      <style jsx>{`
        :root {
          --bg: #0b0c10;
          --surface: #0f1115;
          --text: #e6e6e6;
          --muted: #a1a1aa;
          --primary: #4f46e5; /* indigo-600 */
          --primary-2: #6366f1; /* indigo-500 */
          --ring: rgba(79, 70, 229, 0.5);
          --card: #111318;
          --accent: #22d3ee; /* cyan-400 */
        }

        [data-theme="light"] {
          --bg: #f7f7fb;
          --surface: #ffffff;
          --text: #0f172a;
          --muted: #475569;
          --primary: #4f46e5;
          --primary-2: #6366f1;
          --ring: rgba(79, 70, 229, 0.35);
          --card: #ffffff;
          --accent: #0ea5e9;
        }

        html, body, main { height: 100%; }
        body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"; background: var(--bg); color: var(--text); }

        .skip { position: absolute; left: -9999px; top: -9999px; }
        .skip:focus { left: 1rem; top: 1rem; background: var(--primary); color: white; padding: .5rem .75rem; border-radius: .5rem; }

        .container { width: min(1100px, 92vw); margin: 0 auto; }

        .nav { position: sticky; top: 0; z-index: 50; backdrop-filter: saturate(180%) blur(8px); background: color-mix(in srgb, var(--bg) 70%, transparent); border-bottom: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
        .nav-inner { display: flex; align-items: center; gap: 1rem; justify-content: space-between; padding: .75rem 0; }
        .brand { font-weight: 700; letter-spacing: .2px; }
        .links { display: none; gap: 1rem; list-style: none; padding: 0; margin: 0; }
        .links a { color: var(--text); text-decoration: none; opacity: .8; }
        .links a:hover { opacity: 1; }
        .toggle { background: var(--surface); color: var(--text); border: 1px solid color-mix(in srgb, var(--text) 12%, transparent); padding: .5rem .6rem; border-radius: .6rem; cursor: pointer; }

        @media (min-width: 800px) { .links { display: flex; } }

        .hero { position: relative; overflow: hidden; }
        .hero-inner { padding: 6rem 0 4rem; text-align: center; }
        h1 { font-size: clamp(2rem, 3vw + 1rem, 3.25rem); line-height: 1.1; margin: 0; }
        .accent { background: linear-gradient(90deg, var(--accent), var(--primary-2)); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .subtitle { margin: 1rem auto 2rem; max-width: 60ch; color: var(--muted); }
        .cta { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; }
        .hero-bg { position: absolute; inset: -20% -10% auto -10%; height: 60%; background: radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--primary) 16%, transparent) 0%, transparent 60%); pointer-events: none; animation: float 12s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(10px); } }

        .section { padding: 4rem 0; }
        .section.alt { background: var(--surface); }
        .section-lead { color: var(--muted); margin-top: .25rem; }

        .grid.features { margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
        .card { background: var(--card); border: 1px solid color-mix(in srgb, var(--text) 10%, transparent); border-radius: 1rem; padding: 1rem; transition: transform .2s ease, box-shadow .2s ease; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 10px 30px color-mix(in srgb, var(--ring) 30%, transparent); }
        .card-icon { font-size: 1.25rem; }
        .card h3 { margin: .5rem 0 .25rem; font-size: 1.05rem; }
        .card p { margin: 0; color: var(--muted); }

        .grid.gallery { margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
        .tile { border: 1px solid color-mix(in srgb, var(--text) 12%, transparent); border-radius: 1rem; overflow: hidden; background: var(--card); display: flex; flex-direction: column; }
        .tile-header { padding: .75rem 1rem; font-weight: 600; border-bottom: 1px solid color-mix(in srgb, var(--text) 10%, transparent); }
        .tile-body { padding: 1rem; color: var(--muted); display: grid; gap: .75rem; }

        .faq { background: var(--card); border-radius: .75rem; padding: 1rem; border: 1px solid color-mix(in srgb, var(--text) 10%, transparent); margin: .75rem 0; }
        .faq > summary { cursor: pointer; font-weight: 600; }
        .faq[open] { box-shadow: 0 10px 30px color-mix(in srgb, var(--ring) 30%, transparent); }

        .contact .form { margin-top: 1rem; display: grid; grid-template-columns: 1fr; gap: 1rem; }
        .form label { display: grid; gap: .35rem; font-size: .95rem; }
        input, textarea { background: var(--bg); color: var(--text); border: 1px solid color-mix(in srgb, var(--text) 20%, transparent); border-radius: .6rem; padding: .7rem .8rem; outline: none; }
        input:focus, textarea:focus { border-color: var(--primary); box-shadow: 0 0 0 4px var(--ring); }
        .form .full { grid-column: 1 / -1; }

        .btn { appearance: none; border: 1px solid transparent; background: var(--surface); color: var(--text); padding: .7rem 1rem; border-radius: .7rem; cursor: pointer; text-decoration: none; display: inline-block; font-weight: 600; }
        .btn:hover { transform: translateY(-1px); }
        .btn.primary { background: linear-gradient(90deg, var(--primary), var(--primary-2)); color: white; }
        .btn.ghost { background: transparent; border-color: color-mix(in srgb, var(--text) 18%, transparent); }
        .btn.sm { padding: .5rem .7rem; font-size: .9rem; }

        .footer { border-top: 1px solid color-mix(in srgb, var(--text) 12%, transparent); background: color-mix(in srgb, var(--bg) 70%, transparent); }
        .footer-inner { padding: 1rem 0; display: flex; justify-content: space-between; align-items: center; }
        .back-to-top { color: var(--muted); text-decoration: none; }
        .back-to-top:hover { color: var(--text); }
      `}</style>
    </main>
  );
}

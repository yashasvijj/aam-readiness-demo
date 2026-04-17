// ── HERO.JSX ──
// Full-width banner at the top of the report, below the header.
//
// Renders two side-by-side elements:
//   - Score ring   SVG circular progress graphic showing the overall readiness
//                  score (93/100) with an OPTIMAL badge at the centre
//   - Hero text    Airport readiness headline, supporting description, and three
//                  key-fact pills (VTOL ops, airspace class, grid headroom)
//
// All content is static — no props or state.
// Styles live in index.css under the ── HERO ── section.

export default function Hero() {
  return (
    <div className="hero">
      <div className="score-ring">
        <svg viewBox="0 0 180 180">
          <circle className="track" cx="90" cy="90" r="80" />
          <circle className="fill"  cx="90" cy="90" r="80" />
        </svg>
        <div className="score-center">
          <div className="num">93</div>
          <div className="denom">/ 100</div>
          <div className="badge">OPTIMAL</div>
        </div>
      </div>
      <div className="hero-text">
        <h1>Keystone Heights is ready for AAM.</h1>
        <p>
          42J demonstrates strong foundational readiness for Advanced Air Mobility operations —
          with proven military VTOL precedent, unconstrained Class G airspace, and sufficient
          grid capacity for a full Vertiport build-out.
        </p>
        <div className="hero-pills">
          <div className="hero-pill"><span className="dot"></span>3,294 Helicopter Ops — Proven VTOL Capability</div>
          <div className="hero-pill"><span className="dot"></span>Class G Uncontrolled Airspace</div>
          <div className="hero-pill"><span className="dot"></span>800kW Grid Headroom Available</div>
        </div>
      </div>
    </div>
  );
}

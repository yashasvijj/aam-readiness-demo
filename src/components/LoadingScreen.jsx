// LoadingScreen.jsx
// Shown after the user submits the UploadGate.
// Animates through the pipeline steps, then calls onDone.
//
// Props:
//   onDone {() => void}  called when the sequence finishes

import { useState, useEffect } from 'react';

const STEPS = [
  { label: 'Parsing Airport Operations CSV', duration: 1200 },
  { label: 'Analyzing operational baseline', duration: 1600 },
  { label: 'Building eVTOL demand network', duration: 2000 },
  { label: 'Running 90-day simulation', duration: 5000 },
  { label: 'Scoring gate checks', duration: 1400 },
  { label: 'Generating readiness report', duration: 1200 },
];

const TOTAL = STEPS.reduce((s, st) => s + st.duration, 0);

export default function LoadingScreen({ onDone }) {
  const [activeStep, setActiveStep] = useState(0);
  const [doneSteps, setDoneSteps] = useState([]);
  const [elapsed, setElapsed] = useState(0);

  // Tick elapsed time for the progress bar
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 50), 50);
    return () => clearInterval(id);
  }, []);

  // Advance through steps sequentially
  useEffect(() => {
    if (activeStep >= STEPS.length) return;
    const id = setTimeout(() => {
      setDoneSteps(p => [...p, activeStep]);
      if (activeStep + 1 >= STEPS.length) {
        setTimeout(onDone, 600);
      } else {
        setActiveStep(s => s + 1);
      }
    }, STEPS[activeStep].duration);
    return () => clearTimeout(id);
  }, [activeStep, onDone]);

  const progress = Math.min(100, Math.round((elapsed / TOTAL) * 100));

  return (
    <div className="ls-root">
      {/* Nav */}
      <nav className="ug2-nav">
        <div className="ug2-nav-left">
          <div className="ug2-nav-logo">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ug2-nav-plane">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <div>
              <div className="ug2-nav-title">AAM Readiness System</div>
              <div className="ug2-nav-sub">ADVANCED AIR MOBILITY · AIRPORT INTEGRATION</div>
            </div>
          </div>
        </div>
        <div className="ug2-nav-badge">v1.0 · Beta</div>
      </nav>

      <div className="ls-body">
        {/* Spinner + heading */}
        <div className="ls-spinner-wrap">
          <svg className="ls-spinner" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#e2e8f0" strokeWidth="4" />
            <circle cx="25" cy="25" r="20" fill="none" stroke="#6366f1" strokeWidth="4"
              strokeLinecap="round" strokeDasharray="90 36" />
          </svg>
        </div>

        <h1 className="ls-heading">Running your assessment…</h1>
        <p className="ls-sub">Keystone Heights Airport · 42J · Clay County, FL</p>

        {/* Progress bar */}
        <div className="ls-bar-wrap">
          <div className="ls-bar-track">
            <div className="ls-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="ls-bar-pct">{progress}%</span>
        </div>

        {/* Step list */}
        <div className="ls-steps">
          {STEPS.map((step, i) => {
            const done = doneSteps.includes(i);
            const active = activeStep === i && !done;
            return (
              <div key={i} className={`ls-step${done ? ' ls-step-done' : active ? ' ls-step-active' : ''}`}>
                <div className="ls-step-icon">
                  {done ? (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <polyline points="3 8 6.5 11.5 13 4.5" />
                    </svg>
                  ) : active ? (
                    <div className="ls-step-dot ls-step-dot-pulse" />
                  ) : (
                    <div className="ls-step-dot" />
                  )}
                </div>
                <span className="ls-step-label">{step.label}</span>
                {done && <span className="ls-step-badge ls-badge-done">done</span>}
                {active && <span className="ls-step-badge ls-badge-running">running</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

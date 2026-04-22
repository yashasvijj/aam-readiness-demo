// UploadGate.jsx
// Full-screen upload step shown after the landing page CTA is clicked.
// Props:
//   onSubmit {() => void}  called when the user confirms the upload

import { useState, useRef, useCallback } from 'react';

export default function UploadGate({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({
    icao: '',
    airportName: '',
    city: '',
    state: '',
    gridMW: '1.0',
  });
  const [military, setMilitary] = useState(false);
  const [milInstallations, setMilInstallations] = useState([]);
  const [milInput, setMilInput] = useState('');

  const addInstallation = () => {
    const val = milInput.trim();
    if (val && !milInstallations.includes(val)) {
      setMilInstallations(prev => [...prev, val]);
    }
    setMilInput('');
  };

  const removeInstallation = (entry) =>
    setMilInstallations(prev => prev.filter(e => e !== entry));
  const inputRef = useRef(null);

  const allFilled =
    file &&
    fields.icao.trim() &&
    fields.airportName.trim() &&
    fields.city.trim() &&
    fields.state.trim();

  const acceptFile = useCallback((f) => {
    if (!f) return;
    if (!f.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a CSV file (.csv).');
      return;
    }
    setError('');
    setFile(f);
  }, []);

  const onDrop = useCallback((e) => { e.preventDefault(); setDragging(false); acceptFile(e.dataTransfer.files[0]); }, [acceptFile]);
  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const set = (id, val) => setFields(p => ({ ...p, [id]: val }));

  return (
    <div className="ug2-root">

      {/* ── Top nav ─────────────────────────────────────── */}
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

      {/* ── Main content ────────────────────────────────── */}
      <div className="ug2-body">

        {/* Drop zone */}
        <div
          className={`ug2-dropzone${dragging ? ' ug2-dz-active' : ''}${file ? ' ug2-dz-done' : ''}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => !file && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && !file && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={e => acceptFile(e.target.files[0])}
          />
          {file ? (
            <div className="ug2-file-done">
              <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" width="18" height="18">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <polyline points="9 15 11 17 15 13" />
              </svg>
              <span className="ug2-file-name">{file.name}</span>
              <span className="ug2-file-size">{(file.size / 1024).toFixed(1)} KB · CSV accepted</span>
              <button className="ug2-file-remove" onClick={e => { e.stopPropagation(); setFile(null); }}>✕</button>
            </div>
          ) : (
            <>
              <div className="ug2-dz-label">Drop Airport Operations CSV here or <span className="ug2-dz-link">click to browse</span></div>
              <div className="ug2-dz-hint">Export Operation data from ADB-S</div>
            </>
          )}
        </div>
        {error && <p className="ug2-error">{error}</p>}

        {/* Airport Information */}
        <div className="ug2-section">
          <div className="ug2-section-header">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ug2-section-icon">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <span className="ug2-section-title">Airport Information</span>
          </div>

          <div className="ug2-fields">
            {/* Row 1 */}
            <div className="ug2-field">
              <label className="ug2-label">FAA Identifier (ICAO)</label>
              <input className="ug2-input" placeholder="e.g. TPA" value={fields.icao} onChange={e => set('icao', e.target.value)} />
            </div>
            <div className="ug2-field">
              <label className="ug2-label">Airport Name</label>
              <input className="ug2-input" placeholder="e.g. Tampa International Airport" value={fields.airportName} onChange={e => set('airportName', e.target.value)} />
            </div>

            {/* Row 2 */}
            <div className="ug2-field">
              <label className="ug2-label">City</label>
              <input className="ug2-input" placeholder="e.g. Tampa" value={fields.city} onChange={e => set('city', e.target.value)} />
            </div>
            <div className="ug2-field">
              <label className="ug2-label">State</label>
              <input className="ug2-input" placeholder="e.g. Florida" value={fields.state} onChange={e => set('state', e.target.value)} />
            </div>

            {/* Row 3 – full width */}
            <div className="ug2-field ug2-field-wide">
              <label className="ug2-label">Estimated Grid Headroom (MW)</label>
              <div className="ug2-row3">
                <input
                  className="ug2-input ug2-input-short"
                  type="number"
                  step="0.1"
                  min="0"
                  value={fields.gridMW}
                  onChange={e => set('gridMW', e.target.value)}
                />
                <label className="ug2-toggle-wrap">
                  <div
                    className={`ug2-toggle${military ? ' ug2-toggle-on' : ''}`}
                    onClick={() => setMilitary(v => !v)}
                    role="switch"
                    aria-checked={military}
                    tabIndex={0}
                    onKeyDown={e => e.key === ' ' && setMilitary(v => !v)}
                  >
                    <div className="ug2-toggle-thumb" />
                  </div>
                  <span className="ug2-toggle-label">Adjacent military installation</span>
                </label>
              </div>

              {military && (
                <div className="ug2-mil-panel">
                  <div className="ug2-mil-hint">Enter each installation and press Enter or Add:</div>
                  <div className="ug2-mil-input-row">
                    <input
                      className="ug2-input ug2-mil-input"
                      placeholder="e.g. MacDill AFB, Naval Air Station Jacksonville…"
                      value={milInput}
                      onChange={e => setMilInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addInstallation())}
                    />
                    <button type="button" className="ug2-mil-add-btn" onClick={addInstallation}>
                      Add
                    </button>
                  </div>
                  {milInstallations.length > 0 && (
                    <div className="ug2-mil-tags">
                      {milInstallations.map(entry => (
                        <span key={entry} className="ug2-mil-tag">
                          {entry}
                          <button
                            type="button"
                            className="ug2-mil-tag-remove"
                            onClick={() => removeInstallation(entry)}
                            aria-label={`Remove ${entry}`}
                          >✕</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="ug2-info-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" className="ug2-info-icon">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="ug2-info-text">
            <strong>What happens next: </strong>
            The system will analyze your Operations data, build a demand network from population hotspots
            within 50 mile range, run a 90-day discrete-event simulation across 9 infrastructure-traffic
            scenarios, score each scenario through a hierarchical gate system, and generate a PDF report.
            Typical run time: 30–60 seconds.
          </p>
        </div>

        {/* Submit */}
        <button
          className={`ug2-submit${allFilled ? ' ug2-submit-ready' : ''}`}
          disabled={!allFilled}
          onClick={() => allFilled && onSubmit()}
        >
          {allFilled ? 'Run assessment →' : 'Complete all fields to continue'}
        </button>

        {/* Demo shortcut */}
        <p className="ug2-demo-note">
          Exploring the demo?{' '}
          <button className="ug2-demo-link" onClick={onSubmit}>
            Skip to the sample assessment
          </button>{' '}
          using the pre-loaded dataset.
        </p>
      </div>
    </div>
  );
}

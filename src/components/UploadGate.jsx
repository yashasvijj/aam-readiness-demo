// UploadGate.jsx
// Full-screen upload step shown after the landing page CTA is clicked.
// User must supply a Virtower CSV before the "Run Assessment" button activates.
// The file is accepted but not processed — the demo dashboard is static.
//
// Props:
//   onSubmit {() => void}  called when the user confirms the upload

import { useState, useRef, useCallback } from 'react';

const REQUIRED_FIELDS = [
  { id: 'airport', label: 'Airport name', placeholder: 'e.g. Keystone Heights Airport' },
  { id: 'icao',    label: 'ICAO / FAA identifier', placeholder: 'e.g. 42J' },
  { id: 'county',  label: 'County', placeholder: 'e.g. Clay County, FL' },
  { id: 'utility', label: 'Utility provider', placeholder: 'e.g. Clay County Electric Cooperative' },
];

export default function UploadGate({ onSubmit }) {
  const [file, setFile]       = useState(null);
  const [dragging, setDragging] = useState(false);
  const [fields, setFields]   = useState({ airport: '', icao: '', county: '', utility: '' });
  const [error, setError]     = useState('');
  const inputRef = useRef(null);

  const allFilled = file && REQUIRED_FIELDS.every(f => fields[f.id].trim() !== '');

  const acceptFile = useCallback((f) => {
    if (!f) return;
    if (!f.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a CSV file (.csv).');
      return;
    }
    setError('');
    setFile(f);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    acceptFile(e.dataTransfer.files[0]);
  }, [acceptFile]);

  const onDragOver  = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = ()  => setDragging(false);

  const handleField = (id, value) => setFields(p => ({ ...p, [id]: value }));

  const handleSubmit = () => {
    if (!allFilled) return;
    onSubmit();
  };

  return (
    <div className="ug-root">

      {/* back link */}
      <button className="ug-back" onClick={() => window.location.reload()}>
        ← Back to overview
      </button>

      <div className="ug-card">

        {/* Header */}
        <div className="ug-header">
          <div className="ug-logo">
            <span className="lp-logo-dim">AAM</span>
            <span className="lp-logo-bright"> Readiness System</span>
          </div>
          <h1 className="ug-title">Upload your Virtower export</h1>
          <p className="ug-sub">
            Provide your Virtower CSV and a few airport identifiers to run the
            readiness assessment. No data leaves your browser.
          </p>
        </div>

        {/* Drop zone */}
        <div
          className={`ug-dropzone${dragging ? ' ug-dropzone-active' : ''}${file ? ' ug-dropzone-done' : ''}`}
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
            <div className="ug-file-done">
              <div className="ug-file-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <polyline points="9 15 11 17 15 13" />
                </svg>
              </div>
              <div>
                <div className="ug-file-name">{file.name}</div>
                <div className="ug-file-size">{(file.size / 1024).toFixed(1)} KB · CSV accepted</div>
              </div>
              <button
                className="ug-file-remove"
                onClick={e => { e.stopPropagation(); setFile(null); }}
                title="Remove file"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="ug-dropzone-idle">
              <div className="ug-dz-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="ug-dz-label">
                Drop your Virtower CSV here
              </div>
              <div className="ug-dz-sub">
                or <span className="ug-dz-link">browse files</span> · .csv only
              </div>
            </div>
          )}
        </div>
        {error && <p className="ug-error">{error}</p>}

        {/* Airport info fields */}
        <div className="ug-fields">
          {REQUIRED_FIELDS.map(f => (
            <div className="ug-field" key={f.id}>
              <label className="ug-label" htmlFor={`ug-${f.id}`}>{f.label}</label>
              <input
                id={`ug-${f.id}`}
                className="ug-input"
                type="text"
                placeholder={f.placeholder}
                value={fields[f.id]}
                onChange={e => handleField(f.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          className={`ug-submit${allFilled ? ' ug-submit-ready' : ''}`}
          disabled={!allFilled}
          onClick={handleSubmit}
        >
          {allFilled ? 'Run assessment →' : 'Complete all fields to continue'}
        </button>

        {/* Demo shortcut note */}
        <p className="ug-demo-note">
          Exploring the demo?{' '}
          <button className="ug-demo-link" onClick={onSubmit}>
            Skip to the sample assessment
          </button>{' '}
          using the pre-loaded Keystone Heights (42J) dataset.
        </p>
      </div>
    </div>
  );
}

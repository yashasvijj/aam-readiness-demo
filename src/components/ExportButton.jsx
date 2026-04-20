import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import PreliminaryReport from '../pdf/PreliminaryReport';
import StandardReport from '../pdf/StandardReport';
import PremiumReport from '../pdf/PremiumReport';

const TIERS = [
  {
    id: 'preliminary',
    label: 'Preliminary',
    desc: 'Overall score and gate status only',
    pages: '1 page',
  },
  {
    id: 'standard',
    label: 'Standard',
    desc: 'Score, methodology, and recommended config',
    pages: '2 pages',
  },
  {
    id: 'premium',
    label: 'Premium',
    desc: 'Score, methodology, and full simulation data',
    pages: '4 pages',
  },
];

export default function ExportButton() {
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(null);

  const handleExport = async (tierId) => {
    setLoading(tierId);
    setOpen(false);

    let doc;
    if (tierId === 'preliminary') doc = <PreliminaryReport />;
    else if (tierId === 'standard') doc = <StandardReport />;
    else doc = <PremiumReport />;

    const blob = await pdf(doc).toBlob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `42J-AAM-Readiness-${tierId}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    setLoading(null);
  };

  return (
    <div className="export-wrapper">
      <button
        className="export-btn"
        onClick={() => setOpen(!open)}
        disabled={!!loading}
      >
        {loading ? `Generating ${loading}…` : '↓ Export Report'}
      </button>

      {open && (
        <>
          <div className="export-backdrop" onClick={() => setOpen(false)} />
          <div className="export-dropdown">
            <div className="export-dropdown-label">Select report type</div>
            {TIERS.map((t) => (
              <button
                key={t.id}
                className="export-option"
                onClick={() => handleExport(t.id)}
              >
                <div className="export-option-top">
                  <span className="export-option-label">{t.label}</span>
                  <span className="export-option-pages">{t.pages}</span>
                </div>
                <div className="export-option-desc">{t.desc}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

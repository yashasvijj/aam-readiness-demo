import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import PreliminaryReport from '../pdf/PreliminaryReport';
import StandardReport from '../pdf/StandardReport';
import PremiumReport from '../pdf/PremiumReport';
import generateCharts from '../pdf/utils/generateCharts';

const TIERS = [
  {
    id: 'preliminary',
    label: 'Preliminary',
    desc: 'Score, key findings, and upgrade roadmap',
    pages: '~10 pages',
  },
  {
    id: 'standard',
    label: 'Standard',
    desc: 'Full baseline report with all sections and charts',
    pages: '~30 pages',
  },
  {
    id: 'premium',
    label: 'Premium',
    desc: 'Expanded report with grant language pack',
    pages: '~50 pages',
  },
];

export default function ExportButton() {
  const [open,     setOpen]     = useState(false);
  const [loading,  setLoading]  = useState(null);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handleExport = async (tierId) => {
    setLoading(tierId);
    setOpen(false);
    setProgress({ done: 0, total: 0 });

    try {
      // Pre-generate charts (preliminary has none — instant)
      const charts = await generateCharts(tierId, (done, total) => {
        setProgress({ done, total });
      });

      let doc;
      if (tierId === 'preliminary') doc = <PreliminaryReport />;
      else if (tierId === 'standard') doc = <StandardReport charts={charts} />;
      else doc = <PremiumReport charts={charts} />;

      const blob = await pdf(doc).toBlob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `42J-AAM-Readiness-${tierId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(null);
      setProgress({ done: 0, total: 0 });
    }
  };

  // Progress label during generation
  const loadingLabel = (() => {
    if (!loading) return null;
    if (progress.total > 0 && progress.done < progress.total) {
      return `Generating charts… ${progress.done}/${progress.total}`;
    }
    if (progress.total > 0 && progress.done >= progress.total) {
      return `Building PDF…`;
    }
    return `Generating ${loading}…`;
  })();

  return (
    <div className="export-wrapper">
      <button
        className="export-btn"
        onClick={() => setOpen(!open)}
        disabled={!!loading}
      >
        {loading ? loadingLabel : '↓ Export Report'}
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

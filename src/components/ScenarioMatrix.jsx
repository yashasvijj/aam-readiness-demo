import { useState } from 'react';
import { SCENARIOS } from '../data/scenarios';

const MATRIX = [
  [
    { key: 'lo-lo',  label: '✅ OPTIMAL',    sub: '92/100', cls: 'cell-green' },
    { key: 'lo-med', label: '✅ OPTIMAL',    sub: '86/100', cls: 'cell-green' },
    { key: 'lo-hi',  label: '❌ NOT READY',  sub: null,     cls: 'cell-red'   },
  ],
  [
    { key: 'med-lo',  label: '✔ READY',     sub: '73/100', cls: 'cell-teal'  },
    { key: 'med-med', label: '✅ OPTIMAL',   sub: '93/100', cls: 'cell-green cell-star', recommended: true },
    { key: 'med-hi',  label: '❌ NOT READY', sub: null,     cls: 'cell-red'   },
  ],
  [
    { key: 'hi-lo',  label: '❌ NOT READY', sub: null, cls: 'cell-red' },
    { key: 'hi-med', label: '❌ NOT READY', sub: null, cls: 'cell-red' },
    { key: 'hi-hi',  label: '❌ NOT READY', sub: null, cls: 'cell-red' },
  ],
];

const ROW_LABELS = ['Low\neVTOL', 'Medium\neVTOL', 'High\neVTOL'];

export default function ScenarioMatrix() {
  const [selected, setSelected] = useState(null);

  const scenario = selected ? SCENARIOS[selected] : null;

  return (
    <div className="card">
      <div className="section-label">Scenario Analysis</div>
      <h2>9-Scenario Results Matrix</h2>
      <div className="sub">Click any cell to see why it passed, failed, or was flagged as optimal</div>

      <div className="matrix-wrap">
        <table className="matrix-table">
          <thead>
            <tr>
              <th></th>
              <th>Vertistop<br /><small>(Low Infra)</small></th>
              <th>Vertiport<br /><small>(Med Infra)</small></th>
              <th>Vertihub<br /><small>(High Infra)</small></th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row, ri) => (
              <tr key={ri}>
                <td className="row-label">{ROW_LABELS[ri].split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}</td>
                {row.map((cell) => (
                  <td
                    key={cell.key}
                    className={`${cell.cls} clickable${selected === cell.key ? ' selected' : ''}`}
                    style={{ position: 'relative' }}
                    onClick={() => setSelected(selected === cell.key ? null : cell.key)}
                  >
                    {cell.recommended && (
                      <span className="star-badge">★ RECOMMENDED</span>
                    )}
                    {cell.label}
                    {cell.sub && <><br /><small>{cell.sub}</small></>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {scenario && (
        <div className={`scenario-panel show ${scenario.panelClass}`}>
          <div className="panel-header">
            <span className={`panel-verdict ${scenario.verdictClass}`}>{scenario.verdict}</span>
            <span className="panel-title">{scenario.title}</span>
          </div>
          <div className="panel-reason" dangerouslySetInnerHTML={{ __html: scenario.reason }} />
          <div className="panel-metrics">
            {scenario.metrics.map((m, i) => (
              <div key={i} className="panel-metric">
                <div className="pm-val">{m.val}</div>
                <div className="pm-lbl">{m.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── SCENARIO MATRIX INTERACTION ──
// Handles click events on the 9-cell scenario matrix.
// Populates the detail panel below the grid with simulation results.

let selectedCell = null;

function showScenario(key) {
  const s = SCENARIOS[key];
  const panel = document.getElementById('scenario-panel');

  // Deselect previous cell
  if (selectedCell) selectedCell.classList.remove('selected');

  // Find and select the clicked cell
  document.querySelectorAll('.matrix-table td.clickable').forEach(cell => {
    if (cell.getAttribute('onclick') === `showScenario('${key}')`) {
      cell.classList.add('selected');
      selectedCell = cell;
    }
  });

  // Populate verdict and title
  document.getElementById('panel-verdict').textContent = s.verdict;
  document.getElementById('panel-verdict').className   = 'panel-verdict ' + s.verdictClass;
  document.getElementById('panel-title').textContent   = s.title;

  // Populate reason text (supports HTML for color spans)
  document.getElementById('panel-reason').innerHTML = s.reason;

  // Populate metrics row
  const metricsEl = document.getElementById('panel-metrics');
  metricsEl.innerHTML = s.metrics.map(m =>
    `<div class="panel-metric">
       <div class="pm-val">${m.val}</div>
       <div class="pm-lbl">${m.lbl}</div>
     </div>`
  ).join('');

  // Show panel with correct color theme
  panel.className = 'scenario-panel show ' + s.panelClass;
}

// ── RESOURCE SCALING VISUALIZATION ──
// Manages the traffic tier toggle, summary stats, Chart.js charts,
// resource table highlighting, and grant callout text.

let demandChart, infraChart;

function initCharts() {
  const demandCtx = document.getElementById('demandChart').getContext('2d');
  const infraCtx  = document.getElementById('infraChart').getContext('2d');

  demandChart = new Chart(demandCtx, {
    type: 'bar',
    data: {
      labels: ['Low (0.8%)', 'Medium (2.5%)', 'High (5.8%)'],
      datasets: [
        {
          label: 'Annual Passengers',
          data: [24528, 131400, 327680],
          backgroundColor: ['rgba(13,148,136,0.2)', 'rgba(99,102,241,0.2)', 'rgba(59,130,246,0.2)'],
          borderColor:     ['#0d9488', '#6366f1', '#3b82f6'],
          borderWidth: 2, borderRadius: 6, yAxisID: 'y',
        },
        {
          label: 'Daily Ops',
          data: [42, 128, 288],
          backgroundColor: ['rgba(13,148,136,0.6)', 'rgba(99,102,241,0.6)', 'rgba(59,130,246,0.6)'],
          borderColor:     ['#0d9488', '#6366f1', '#3b82f6'],
          borderWidth: 2, borderRadius: 6, yAxisID: 'y1', type: 'line',
          tension: 0.4, pointRadius: 6, pointHoverRadius: 8,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
      scales: {
        y:  { type: 'linear', position: 'left',  title: { display: true, text: 'Annual Passengers', font: { size: 10 } }, grid: { color: '#f1f5f9' } },
        y1: { type: 'linear', position: 'right', title: { display: true, text: 'Daily Ops', font: { size: 10 } }, grid: { drawOnChartArea: false } }
      }
    }
  });

  infraChart = new Chart(infraCtx, {
    type: 'bar',
    data: {
      labels: ['Low (Vertistop)', 'Medium (Vertiport)', 'High (Vertihub)'],
      datasets: [
        {
          label: 'Landing Pads',
          data: [2, 4, 8],
          backgroundColor: ['rgba(13,148,136,0.7)', 'rgba(99,102,241,0.7)', 'rgba(59,130,246,0.7)'],
          borderRadius: 6, yAxisID: 'y',
        },
        {
          label: 'Peak Power (×10 kW)',
          data: [19.4, 38.7, 77.4],
          backgroundColor: ['rgba(13,148,136,0.2)', 'rgba(99,102,241,0.2)', 'rgba(59,130,246,0.2)'],
          borderColor:     ['#0d9488', '#6366f1', '#3b82f6'],
          borderWidth: 2, borderRadius: 6, yAxisID: 'y', type: 'line',
          tension: 0.4, pointRadius: 6, pointHoverRadius: 8,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              if (ctx.datasetIndex === 1) return ` Peak Power: ${(ctx.raw * 10).toFixed(0)} kW`;
              return ` Landing Pads: ${ctx.raw}`;
            }
          }
        }
      },
      scales: {
        y: { title: { display: true, text: 'Pads / Power ÷10 kW', font: { size: 10 } }, grid: { color: '#f1f5f9' }, beginAtZero: true }
      }
    }
  });
}

function setTier(tier) {
  const d = TIERS[tier];
  const tierIndex = { low: 0, medium: 1, high: 2 };
  const idx = tierIndex[tier];

  // Update toggle buttons
  document.querySelectorAll('.tier-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + tier).classList.add('active');

  // Update summary stats
  document.getElementById('stat-ops').textContent    = d.ops;
  document.getElementById('stat-pax').textContent    = d.pax;
  document.getElementById('stat-adopt').textContent  = d.adopt;
  document.getElementById('stat-infra').textContent  = d.infra;
  document.getElementById('stat-power').textContent  = d.power;
  document.getElementById('stat-status').textContent = d.status;
  document.querySelectorAll('.ts-val').forEach(el => el.style.color = d.color);

  // Update grant callout
  document.getElementById('grant-callout').innerHTML = d.grantText;

  // Highlight correct column in resource table
  const bgColors  = { low: '#f0fdfa', medium: '#f5f3ff', high: '#eff6ff' };
  const txtColors = { low: '#0f766e', medium: '#6366f1', high: '#1d4ed8' };

  document.querySelectorAll('.resource-table tbody tr').forEach(tr => {
    tr.classList.remove('highlight');
    tr.style.background = '';
    tr.querySelectorAll('td').forEach(td => td.style.color = '');
  });

  document.querySelectorAll('.resource-table tbody tr').forEach(tr => {
    const cell = tr.cells[idx + 1]; // +1 to skip label column
    if (cell) {
      tr.classList.add('highlight');
      tr.style.background = bgColors[tier];
      tr.querySelectorAll('td').forEach(td => td.style.color = txtColors[tier]);
    }
  });
}

// ── RESOURCE TABLE DROPDOWN ──
function toggleResourceTable(btn) {
  const body = btn.nextElementSibling;
  const isOpen = body.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
}

// Initialise on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  setTier('low');
});

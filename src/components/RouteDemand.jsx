const ROUTES = [
  { dest: 'Jacksonville SW Corridor', badge: 'PRIMARY', primary: true, dist: '47 mi', time: '47 min', fare: '$144', vs: '+21 min saved', saved: true, daily: '26' },
  { dest: 'Orange Park / Fleming Island', dist: '34 mi', time: '42 min', fare: '$104', vs: '+9 min saved',   saved: true,  daily: '14' },
  { dest: 'Lake City',                   dist: '39 mi', time: '44 min', fare: '$118', vs: '+10 min saved',  saved: true,  daily: '4'  },
  { dest: 'Gainesville',                 dist: '25 mi', time: '39 min', fare: '$78',  vs: '−1 min (cost play)',  saved: false, daily: '18' },
  { dest: 'Palatka',                     dist: '21 mi', time: '38 min', fare: '$65',  vs: '−7 min (cost play)',  saved: false, daily: '1'  },
  { dest: 'Starke',                      dist: '18 mi', time: '37 min', fare: '$55',  vs: '−11 min (cost play)', saved: false, daily: '1'  },
];

export default function RouteDemand() {
  return (
    <div className="card">
      <div className="section-label">Market Opportunity</div>
      <h2>eVTOL Route Demand Analysis</h2>
      <div className="sub">6 population centers modeled within 50-mile range envelope</div>
      <table className="route-table">
        <thead>
          <tr>
            <th>Destination</th>
            <th>Distance</th>
            <th>Flight Time</th>
            <th>eVTOL Fare</th>
            <th>Time vs. Car</th>
            <th>Daily Flights</th>
          </tr>
        </thead>
        <tbody>
          {ROUTES.map((r, i) => (
            <tr key={i} className={r.primary ? 'route-primary' : ''}>
              <td>
                {r.dest}
                {r.badge && <span className="route-badge">{r.badge}</span>}
              </td>
              <td>{r.dist}</td>
              <td>{r.time}</td>
              <td>{r.fare}</td>
              <td className={r.saved ? 'time-saved' : 'time-lost'}>{r.vs}</td>
              <td><strong>{r.daily}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

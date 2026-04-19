const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function Header() {
  return (
    <header>
      <div className="logo">AAM<span>Readiness</span></div>
      <div className="airport-tag">
        Assessment for <strong>Keystone Heights Airport (42J)</strong> · {today}
      </div>
    </header>
  );
}

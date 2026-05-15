import ExportButton from './ExportButton';

const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function Header({ onHome, onLogout }) {
  return (
    <header>
      <div className="header-left">
        <button className="home-btn" onClick={onHome} title="Back to home">
          ← Home
        </button>
        <div className="logo">AAM<span>Readiness</span></div>
      </div>
      <div className="header-right">
        <div className="airport-tag">
          Assessment for <strong>Keystone Heights Airport (42J)</strong> · {today}
        </div>
        <ExportButton />
        {onLogout && (
          <button className="logout-btn" onClick={onLogout} title="Sign out">
            Sign out
          </button>
        )}
      </div>
    </header>
  );
}

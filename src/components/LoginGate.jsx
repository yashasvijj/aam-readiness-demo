// LoginGate.jsx
// Full-screen login shown before any other view.
// Uses Supabase Auth — email + password sign-in.
// Props:
//   onLogin {() => void}  called after successful auth

import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginGate({ onLogin }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [showPass, setShowPass] = useState(false);

  const canSubmit = email.trim() && password.length >= 6 && !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message === 'Invalid login credentials'
        ? 'Incorrect email or password.'
        : authError.message);
    } else {
      onLogin();
    }
  }

  return (
    <div className="lg-root">
      <div className="lg-card">

        {/* Logo */}
        <div className="lg-logo">
          <svg viewBox="0 0 24 24" fill="currentColor" className="lg-plane">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
          <div>
            <div className="lg-product">AAM Readiness System</div>
            <div className="lg-tagline">ADVANCED AIR MOBILITY · AIRPORT INTEGRATION</div>
          </div>
        </div>

        <h1 className="lg-heading">Sign in to your account</h1>
        <p className="lg-sub">Access is restricted to authorised clients.</p>

        <form className="lg-form" onSubmit={handleSubmit} noValidate>
          <div className="lg-field">
            <label className="lg-label" htmlFor="lg-email">Email address</label>
            <input
              id="lg-email"
              className="lg-input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="lg-field">
            <label className="lg-label" htmlFor="lg-pass">Password</label>
            <div className="lg-pass-wrap">
              <input
                id="lg-pass"
                className="lg-input lg-pass-input"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="lg-pass-toggle"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="lg-error" role="alert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`lg-submit${canSubmit ? ' lg-submit-ready' : ''}`}
            disabled={!canSubmit}
          >
            {loading ? (
              <span className="lg-spinner" />
            ) : (
              'Sign in →'
            )}
          </button>
        </form>

        <p className="lg-footer-note">
          Need access?{' '}
          <a href="mailto:yashasvi.jj@gmail.com" className="lg-contact-link">
            Contact your administrator
          </a>
        </p>
      </div>
    </div>
  );
}

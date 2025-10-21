import { useEffect, useState } from 'react';
import { getCompanies, login } from '../lib/api';

export default function Login() {
  const [companies, setCompanies] = useState([]);
  const [username, setUsername] = useState('alice');
  const [password, setPassword] = useState('Passw0rd!');
  const [companyCode, setCompanyCode] = useState('PPK-FARMS');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const reason = params.get('reason'); // show "session expired" banner if present

  useEffect(() => {
    (async () => {
      try {
        const list = await getCompanies();
        setCompanies(list ?? []);
      } catch (e) {
        // ignore – UI will still render the form
      }
    })();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ username, password, company_code: companyCode });
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 p-6">
      <div className="max-w-3xl mx-auto grid gap-6">
        {/* Palette preview box (unchanged visual aid) */}
        <div className="rounded-xl border border-white/5 bg-neutral-800/50 p-4 shadow">
          <div className="text-lg font-semibold mb-2">Palette Preview</div>
          <div className="flex items-center gap-5 text-xs opacity-80">
            <span className="inline-flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#191A19]" /> #191A19 (bg)</span>
            <span className="inline-flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#1E5128]" /> #1E5128 (primary)</span>
            <span className="inline-flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#4E9F3D]" /> #4E9F3D (muted)</span>
            <span className="inline-flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#D8E9A8]" /> #D8E9A8 (accent)</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-xl border border-white/5 bg-neutral-800/50 p-5 shadow max-w-xl">
          <div className="text-lg font-semibold mb-3">Login</div>

          {reason === 'expired' && (
            <div className="mb-3 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 px-3 py-2 text-sm">
              Your session expired. Please sign in again.
            </div>
          )}

          {error && (
            <div className="mb-3 rounded bg-red-500/10 border border-red-500/30 text-red-200 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <label className="block mb-2 text-sm">Username</label>
          <input
            className="w-full rounded bg-neutral-900/70 border border-white/10 px-3 py-2 mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            className="w-full rounded bg-neutral-900/70 border border-white/10 px-3 py-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <label className="block mb-2 text-sm">Company</label>
          <select
            className="w-full rounded bg-neutral-900/70 border border-white/10 px-3 py-2 mb-4"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
          >
            {companies.map((c) => (
              <option key={c.id} value={c.code}>{c.name}</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60 px-4 py-2"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="mt-3 text-xs opacity-60">
            Sample credentials (from seed): alice / Passw0rd! (PPK Farms), bob / Passw0rd! (PPK Fisheries)
          </div>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompanies, login } from "../lib/api";

const defaultPalette = {
  primary: "#1E5128",
  accent: "#D8E9A8",
};

function applyTheme(company) {
  const p = company?.primary_color || defaultPalette.primary;
  const a = company?.accent_color || defaultPalette.accent;
  document.documentElement.style.setProperty("--primary", p);
  document.documentElement.style.setProperty("--accent", a);
}

export default function Login() {
  const [companies, setCompanies] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const list = await getCompanies();
        setCompanies(list);
        if (list.length && !companyCode) setCompanyCode(list[0].code);
      } catch (e) {
        console.error(e);
        setCompanies([]);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const resp = await login({ username, password, company_code: companyCode });
      // Persist
      localStorage.setItem("ppk_token", resp.token);
      localStorage.setItem("ppk_user", JSON.stringify(resp.user || {}));
      localStorage.setItem("ppk_company", JSON.stringify(resp.company || {}));
      // Theme for selected company
      applyTheme(resp.company);
      // Go to dashboard shell (protected)
      navigate("/dashboard", { replace: true });
    } catch (e) {
      console.error(e);
      setErr("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card" style={{ maxWidth: 520 }}>
      <h2 className="text-xl font-semibold mb-2">Login</h2>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="search-input"
            placeholder="alice"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="search-input"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Company</label>
          <select
            className="search-input"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
          >
            {companies.map((c) => (
              <option key={c.id} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={loading}
          className="px-3 py-2 rounded-md border"
          type="submit"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {err && <div className="tree-note">Error: {err}</div>}

        <div className="opacity-70 text-xs mt-2">
          Sample credentials (from seed):<br />
          Username: <b>alice</b>, Password: <b>Passw0rd!</b>, Company: <b>PPK Farms</b><br />
          Username: <b>bob</b>, Password: <b>Passw0rd!</b>, Company: <b>PPK Fisheries</b>
        </div>
      </form>
    </section>
  );
}

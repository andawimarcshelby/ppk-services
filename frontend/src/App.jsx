import { useMemo } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./index.css";

function RequireAuth({ children }) {
  const authed = useMemo(() => {
    try {
      return !!localStorage.getItem("ppk_token");
    } catch {
      return false;
    }
  }, []);
  return authed ? children : <Navigate to="/" replace />;
}

function HeaderBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("ppk_token");
      localStorage.removeItem("ppk_user");
      localStorage.removeItem("ppk_company");
      localStorage.removeItem("ppk_open_sys");
      localStorage.removeItem("ppk_open_mod");
    } catch {}
    // reset theme to defaults
    document.documentElement.style.setProperty("--primary", "#1E5128");
    document.documentElement.style.setProperty("--accent", "#D8E9A8");
    navigate("/", { replace: true });
  };

  return (
    <header className="app-header">
      <div className="brand">PPK Services INC</div>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 rounded-md border"
          onClick={() => navigate("/dashboard")}
          title="Go to dashboard"
        >
          Dashboard
        </button>
        <button
          className="px-3 py-1 rounded-md border"
          onClick={handleLogout}
          title="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <HeaderBar />
      <main className="px-4 pb-10">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />

          {/* Protected: send everything else to Dashboard */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          {/* Deep links (e.g., /ops/logistics/deliveries) should also be protected */}
          <Route
            path="/*"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

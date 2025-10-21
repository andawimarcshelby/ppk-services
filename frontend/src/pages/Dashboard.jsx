import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getModules } from "../lib/api";
import AdminUsers from "../routes/AdminUsers";
import OpsLogisticsDeliveries from "../routes/OpsLogisticsDeliveries";
import OpsInventoryStocks from "../routes/OpsInventoryStocks";
import OpsProductionSchedules from "../routes/OpsProductionSchedules"; // <-- NEW
import OpsProductionReports from "../routes/OpsProductionReports";   // <-- NEW

/* ---------- Filter ---------- */
function filterTree(tree, q) {
  if (!q) return tree;
  const ql = q.toLowerCase();
  return tree
    .map((sys) => {
      const modules = sys.modules
        .map((mod) => {
          const subs = (mod.submodules || []).filter((s) =>
            s.name?.toLowerCase().includes(ql)
          );
          const modMatches = mod.module_name?.toLowerCase().includes(ql);
          return { ...mod, submodules: subs, _modMatches: !!modMatches };
        })
        .filter((m) => m._modMatches || (m.submodules && m.submodules.length > 0))
        .map(({ _modMatches, ...m }) => m);

      const sysMatches = sys.system_name?.toLowerCase().includes(ql);
      if (sysMatches || modules.length > 0) return { ...sys, modules };
      return null;
    })
    .filter(Boolean);
}

/* ---------- Persist open/closed sets ---------- */
function usePersistedOpenSet(key) {
  const [setState, setSetState] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); }
    catch { return new Set(); }
  });

  const save = (next) => {
    try { localStorage.setItem(key, JSON.stringify([...next])); } catch {}
    return next;
  };

  const toggle = (id) => {
    setSetState((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return save(next);
    });
  };

  const open = (id) => {
    setSetState((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return save(next);
    });
  };

  const has = (id) => setState.has(id);
  const clear = () => { setSetState(new Set()); try { localStorage.removeItem(key); } catch {} };

  return { setState, toggle, has, clear, open };
}

/* ---------- Skeleton ---------- */
function SkeletonNav() {
  return (
    <div className="skeleton-wrap">
      {[0, 1].map((i) => (
        <div key={i} className="skeleton-system">
          <div className="skel skel-title" />
          <div className="skel skel-line" />
          <div className="skel skel-line w-5/6" />
          <div className="skel skel-line w-4/6" />
        </div>
      ))}
    </div>
  );
}

/* ---------- Route helpers ---------- */
const norm = (p = "") => (p.startsWith("/") ? p : `/${p}`).toLowerCase().replace(/\/+/g, "/");
const slug = (s = "") =>
  s.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function buildPath(sysName, modName, sm) {
  if (sm.route) {
    const r = sm.route.trim();
    return norm(r.startsWith("/") ? r : `/${r}`);
  }
  return norm(`/${slug(sysName)}/${slug(modName)}/${slug(sm.name)}`);
}

/* ---------- Simple route map ---------- */
function RoutedPanel({ pathname }) {
  const path = norm(pathname);
  const routes = {
    "/admin/users": <AdminUsers />,
    "/ops/logistics/deliveries": <OpsLogisticsDeliveries />,
    "/ops/inventory/stocks": <OpsInventoryStocks />,
    "/ops/production/schedules": <OpsProductionSchedules />, // <-- NEW
    "/ops/production/reports": <OpsProductionReports />,     // <-- NEW
  };
  return routes[path] || null;
}

export default function Dashboard() {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // persisted open states
  const sysOpen = usePersistedOpenSet("ppk_open_sys");
  const modOpen = usePersistedOpenSet("ppk_open_mod");

  // Load modules
  useEffect(() => {
    const token = localStorage.getItem("ppk_token");
    if (!token) {
      setErr("Missing token. Please log in again.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const data = await getModules(token);
        setTree(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        const msg = String(e.message || e);
        setErr(msg);
        if (msg.includes("401")) {
          try {
            localStorage.removeItem("ppk_token");
            localStorage.removeItem("ppk_user");
            localStorage.removeItem("ppk_company");
          } catch {}
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Deep-link: select based on URL whenever tree ready or URL changes
  useEffect(() => {
    if (loading || err || !tree?.length) return;
    const path = norm(location.pathname);
    if (path === "/" || path === "") return;

    let matched = false;
    for (const sys of tree) {
      for (const mod of sys.modules) {
        for (const sm of mod.submodules || []) {
          const smPath = buildPath(sys.system_name, mod.module_name, sm);
          if (smPath === path) {
            setSelected({ ...sm, module: mod.module_name, system: sys.system_name });
            sysOpen.open(sys.system_id);
            modOpen.open(mod.module_id);
            matched = true;
            break;
          }
        }
        if (matched) break;
      }
      if (matched) break;
    }
  }, [location.pathname, loading, err, tree]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => filterTree(tree, query), [tree, query]);
  const searching = query.trim().length > 0;

  const routedEl = <RoutedPanel pathname={location.pathname} />;

  return (
    <section className="layout">
      {/* Left pane */}
      <aside className="sidebar">
        <div className="tree-header">Navigation</div>

        {/* Search box */}
        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="Search modules or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search navigation"
          />
        </div>

        {/* Skeleton while loading */}
        {loading && <SkeletonNav />}

        {/* Error (if any) */}
        {err && !loading && <div className="tree-note">Error: {err}</div>}

        {/* Tree */}
        {!loading && !err && (
          <nav className="tree">
            {filtered.map((sys) => {
              const isSysOpen = searching ? true : sysOpen.has(sys.system_id);
              return (
                <div key={sys.system_id} className="tree-system">
                  <button
                    className={`tree-row ${searching ? "disabled" : ""}`}
                    onClick={() => !searching && sysOpen.toggle(sys.system_id)}
                    title={searching ? "Disable toggles while searching" : "Expand/Collapse"}
                  >
                    <span className="chev">{isSysOpen ? "▾" : "▸"}</span>
                    <span>{sys.system_name}</span>
                  </button>

                  {isSysOpen &&
                    sys.modules.map((mod) => {
                      const isModOpen = searching ? true : modOpen.has(mod.module_id);
                      return (
                        <div key={mod.module_id} className="tree-module">
                          <button
                            className={`tree-row mod ${searching ? "disabled" : ""}`}
                            onClick={() => !searching && modOpen.toggle(mod.module_id)}
                            title={searching ? "Disable toggles while searching" : "Expand/Collapse"}
                          >
                            <span className="chev">{isModOpen ? "▾" : "▸"}</span>
                            <span>{mod.module_name}</span>
                          </button>

                          {isModOpen && (
                            <ul className="tree-submodules">
                              {mod.submodules.map((sm) => {
                                const smPath = buildPath(sys.system_name, mod.module_name, sm);
                                return (
                                  <li key={sm.id}>
                                    <button
                                      className={`tree-link ${selected?.id === sm.id ? "is-active" : ""}`}
                                      onClick={() => {
                                        const sel = { ...sm, module: mod.module_name, system: sys.system_name };
                                        setSelected(sel);
                                        navigate(smPath);
                                      }}
                                      title={sm.route || ""}
                                    >
                                      {sm.name}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="tree-note">No results for "{query}".</div>
            )}
          </nav>
        )}
      </aside>

      {/* Right pane */}
      <article className="content">
        {routedEl ? (
          routedEl
        ) : (
          <div className="card">
            <h2 className="text-xl font-semibold mb-2">Content</h2>
            {!selected ? (
              <p className="opacity-80">
                Select a submodule on the left to load its placeholder content.
              </p>
            ) : (
              <div className="space-y-2">
                <div className="opacity-80 text-sm">
                  <span className="badge">System</span> {selected.system} &nbsp;
                  <span className="badge">Module</span> {selected.module}
                </div>
                <h3 className="text-lg font-semibold">{selected.name}</h3>
                <p className="opacity-80 text-sm">
                  Route: <code>{selected.route || "(no route set)"}</code>
                </p>
                <div className="mt-4 opacity-75">
                  This is placeholder content. We'll wire real pages later.
                </div>
              </div>
            )}
          </div>
        )}
      </article>
    </section>
  );
}

// Apply company-driven theme to CSS variables
export function applyTheme(company) {
  const root = document.documentElement;
  const primary = company?.primary_color || "#1E5128";
  const accent  = company?.accent_color  || "#D8E9A8";

  // keep bg & muted from base palette unless you want per-company too
  root.style.setProperty("--primary", primary);
  root.style.setProperty("--accent",  accent);
}

export function resetTheme() {
  const root = document.documentElement;
  root.style.removeProperty("--primary");
  root.style.removeProperty("--accent");
}

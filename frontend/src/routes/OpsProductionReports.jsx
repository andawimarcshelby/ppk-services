export default function OpsProductionReports() {
  const kpis = [
    { label: "Output (units)", value: "12,480", delta: "+3.2%" },
    { label: "Yield", value: "94.1%", delta: "+0.6%" },
    { label: "Downtime", value: "1h 20m", delta: "-14m" },
  ];

  const lots = [
    { lot: "BATCH-5401", line: "Feed Mill A", result: "OK", remarks: "Moisture 11.8%" },
    { lot: "BATCH-5402", line: "Feed Mill B", result: "OK", remarks: "Moisture 12.2%" },
    { lot: "PK-1123", line: "Packing 2", result: "REVIEW", remarks: "Carton seals off" },
  ];

  return (
    <div className="card" style={{ maxWidth: "unset" }}>
      <h2 className="text-xl font-semibold mb-2">Production Reports</h2>
      <p className="opacity-80 text-sm mb-4">
        Placeholder page for <b>Operations → Production → Reports</b>.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: ".75rem",
        }}
        className="mb-3"
      >
        {kpis.map((k) => (
          <div key={k.label} className="card" style={{ margin: 0 }}>
            <div className="text-xs opacity-75">{k.label}</div>
            <div className="text-2xl font-semibold">{k.value}</div>
            <div className="text-xs opacity-70 mt-1">{k.delta} vs prev</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ margin: 0 }}>
        <div className="text-sm opacity-80 mb-2">Recent Lots / Checks</div>
        <div style={{ overflowX: "auto" }}>
          <table className="text-sm" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: ".5rem" }}>Lot</th>
                <th style={{ padding: ".5rem" }}>Line</th>
                <th style={{ padding: ".5rem" }}>Result</th>
                <th style={{ padding: ".5rem" }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {lots.map((r) => (
                <tr key={r.lot} style={{ borderTop: "1px solid rgba(216,233,168,0.15)" }}>
                  <td style={{ padding: ".5rem" }}>{r.lot}</td>
                  <td style={{ padding: ".5rem" }}>{r.line}</td>
                  <td style={{ padding: ".5rem" }}>{r.result}</td>
                  <td style={{ padding: ".5rem" }}>{r.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="opacity-70 text-xs mt-3">
        * KPIs and lots shown are dummy data.
      </div>
    </div>
  );
}

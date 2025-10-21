export default function OpsProductionSchedules() {
  const upcoming = [
    { id: "SCH-2301", line: "Feed Mill A", start: "08:00", end: "12:00", task: "Batch #54 - Grower" },
    { id: "SCH-2302", line: "Packing Line 2", start: "09:30", end: "13:00", task: "Egg Grading" },
    { id: "SCH-2303", line: "Cold Room", start: "11:00", end: "16:00", task: "Fish packing run" },
  ];

  return (
    <div className="card" style={{ maxWidth: "unset" }}>
      <h2 className="text-xl font-semibold mb-2">Production Schedules</h2>
      <p className="opacity-80 text-sm mb-4">
        Placeholder page for <b>Operations → Production → Schedules</b>. Wire this to API later.
      </p>

      <div className="card" style={{ margin: 0 }}>
        <div className="text-sm opacity-80 mb-2">Today</div>
        <div style={{ overflowX: "auto" }}>
          <table className="text-sm" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: ".5rem" }}>Schedule ID</th>
                <th style={{ padding: ".5rem" }}>Line/Area</th>
                <th style={{ padding: ".5rem" }}>Start</th>
                <th style={{ padding: ".5rem" }}>End</th>
                <th style={{ padding: ".5rem" }}>Task</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((r) => (
                <tr key={r.id} style={{ borderTop: "1px solid rgba(216,233,168,0.15)" }}>
                  <td style={{ padding: ".5rem" }}>{r.id}</td>
                  <td style={{ padding: ".5rem" }}>{r.line}</td>
                  <td style={{ padding: ".5rem" }}>{r.start}</td>
                  <td style={{ padding: ".5rem" }}>{r.end}</td>
                  <td style={{ padding: ".5rem" }}>{r.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="opacity-70 text-xs mt-3">
        * Sample content only.
      </div>
    </div>
  );
}

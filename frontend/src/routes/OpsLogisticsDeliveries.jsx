export default function OpsLogisticsDeliveries() {
  const items = [
    { id: "DLV-1001", truck: "TRK-12", status: "On route", eta: "13:45" },
    { id: "DLV-1002", truck: "TRK-07", status: "Loaded",  eta: "15:10" },
    { id: "DLV-1003", truck: "TRK-03", status: "Delivered", eta: "11:20" },
  ];

  return (
    <div className="card" style={{ maxWidth: "unset" }}>
      <h2 className="text-xl font-semibold mb-2">Deliveries</h2>

      <p className="opacity-80 text-sm mb-4">
        Placeholder page for <b>Operations → Logistics → Deliveries</b>. Replace with real data later.
      </p>

      <div className="card" style={{ margin: 0 }}>
        <div className="text-sm opacity-80 mb-2">Today’s Schedule</div>
        <div style={{ overflowX: "auto" }}>
          <table className="text-sm" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: ".5rem" }}>Delivery ID</th>
                <th style={{ padding: ".5rem" }}>Truck</th>
                <th style={{ padding: ".5rem" }}>Status</th>
                <th style={{ padding: ".5rem" }}>ETA</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} style={{ borderTop: "1px solid rgba(216,233,168,0.15)" }}>
                  <td style={{ padding: ".5rem" }}>{r.id}</td>
                  <td style={{ padding: ".5rem" }}>{r.truck}</td>
                  <td style={{ padding: ".5rem" }}>{r.status}</td>
                  <td style={{ padding: ".5rem" }}>{r.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="opacity-70 text-xs mt-3">
        * This is sample content; wire to API later.
      </div>
    </div>
  );
}

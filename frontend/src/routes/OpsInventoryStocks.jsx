export default function OpsInventoryStocks() {
  const rows = [
    { sku: "FARM-001", name: "Feed Corn (50kg)", qty: 320, loc: "WH-A1", status: "OK" },
    { sku: "FARM-014", name: "Organic Fertilizer", qty: 90, loc: "WH-B2", status: "Low" },
    { sku: "FISH-021", name: "Net Repair Kit", qty: 18, loc: "WH-C3", status: "Reorder" },
  ];

  return (
    <div className="card" style={{ maxWidth: "unset" }}>
      <h2 className="text-xl font-semibold mb-2">Stocks</h2>

      <p className="opacity-80 text-sm mb-4">
        Placeholder page for <b>Operations → Inventory → Stocks</b>. Replace this with a real table and filters later.
      </p>

      <div className="card" style={{ margin: 0 }}>
        <div className="text-sm opacity-80 mb-2">Current Inventory</div>
        <div style={{ overflowX: "auto" }}>
          <table className="text-sm" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: ".5rem" }}>SKU</th>
                <th style={{ padding: ".5rem" }}>Item</th>
                <th style={{ padding: ".5rem" }}>Qty</th>
                <th style={{ padding: ".5rem" }}>Location</th>
                <th style={{ padding: ".5rem" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sku} style={{ borderTop: "1px solid rgba(216,233,168,0.15)" }}>
                  <td style={{ padding: ".5rem" }}>{r.sku}</td>
                  <td style={{ padding: ".5rem" }}>{r.name}</td>
                  <td style={{ padding: ".5rem" }}>{r.qty}</td>
                  <td style={{ padding: ".5rem" }}>{r.loc}</td>
                  <td style={{ padding: ".5rem" }}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="opacity-70 text-xs mt-3">
        * Sample data. Hook this up to the API later.
      </div>
    </div>
  );
}

export default function AdminUsers() {
  return (
    <div className="card" style={{ maxWidth: "unset" }}>
      <h2 className="text-xl font-semibold mb-2">Users</h2>

      <p className="opacity-80 text-sm mb-4">
        Placeholder page for <b>Admin → User Management → Users</b>. Replace this with a real table later.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
        }}
      >
        <div className="card" style={{ margin: 0 }}>
          <div className="text-sm opacity-80 mb-2">Quick Stats</div>
          <ul className="text-sm space-y-1">
            <li>Active users: 12</li>
            <li>Pending invites: 3</li>
            <li>Deactivated: 1</li>
          </ul>
        </div>

        <div className="card" style={{ margin: 0 }}>
          <div className="text-sm opacity-80 mb-2">Actions</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md border">New User</button>
            <button className="px-3 py-1 rounded-md border">Export</button>
          </div>
        </div>
      </div>
    </div>
  );
}

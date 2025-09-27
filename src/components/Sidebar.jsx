export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-4">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/dashboard/expenses">Expenses</a></li>
      </ul>
    </aside>
  );
}

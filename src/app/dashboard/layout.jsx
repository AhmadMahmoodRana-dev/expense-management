import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-full bg-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

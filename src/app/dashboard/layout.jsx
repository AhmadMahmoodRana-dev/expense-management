import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children}) {
  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <Sidebar />
      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import Sidebar from "@/components/navbar/Sidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen bg-amber-50">
      <DashboardNavbar />
      <Sidebar />
      <main className="ml-56 pt-[65px] p-6">
        {children}
      </main>
    </div>
  );
}
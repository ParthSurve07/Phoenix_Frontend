import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import Sidebar from "@/components/navbar/Sidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen bg-amber-50 overflow-x-hidden">
      <DashboardNavbar />
      <Sidebar />
      <main
        className="relative z-10 pb-28 md:pb-8 md:ml-56 px-4 sm:px-6 lg:px-8 transition-all duration-300"
        style={{ paddingTop: "80px" }}
      >
        {children}
      </main>
    </div>
  );
}
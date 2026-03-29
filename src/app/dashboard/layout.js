import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import Sidebar from "@/components/navbar/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-amber-50 overflow-x-hidden">
      <DashboardNavbar />
      <Sidebar />

      {/* 1. Swapped pl-56 back to ml-56 (Margin is safer here).
        2. Removed w-full (so it naturally fits the remaining screen width).
        3. Now px-4/px-6/px-8 only control the INSIDE spacing and won't conflict with the margin! 
      */}
      <main
        className="relative z-10 pb-28 md:pb-8 md:ml-56 px-4 sm:px-6 lg:px-8 transition-all duration-300"
        style={{ paddingTop: "80px" }}
      >
        {children}
      </main>
    </div>
  );
}
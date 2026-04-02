import { Outlet } from "react-router-dom";
import AdminSidebar from "../../modules/admin/components/AdminSidebar";
import AdminTopbar from "../../modules/admin/components/AdminTopbar";
export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
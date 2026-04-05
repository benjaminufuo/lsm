import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../modules/admin/components/AdminSidebar";
import AdminTopbar from "../modules/admin/components/AdminTopbar";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="flex min-h-screen">
        <AdminSidebar open={open} onClose={() => setOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar onMenuClick={() => setOpen(true)} />

          <main className="flex-1 px-3 pb-4 sm:px-4 md:px-6 xl:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
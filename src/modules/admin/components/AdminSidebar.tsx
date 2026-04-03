import { NavLink } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2";
import { cn } from "../../../shared/utils/cn";
import logo from "../../../assets/LearnFlow_Logo lockup V1 PB-cropped.svg";

type Props = {
  open: boolean;
  onClose: () => void;
};

const navItems = [
  {
    label: "Dashboard",
    path: "/learnflow/admin/dashboard",
    icon: HiOutlineSquares2X2,
  },
  {
    label: "Courses",
    path: "/learnflow/admin/courses",
    icon: HiOutlineBookOpen,
  },
  {
    label: "Assignments",
    path: "/learnflow/admin/assignments",
    icon: HiOutlineClipboardDocumentList,
  },
  {
    label: "Users",
    path: "/learnflow/admin/users",
    icon: HiOutlineUsers,
  },
];

export default function AdminSidebar({ open, onClose }: Props) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/40 transition lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="LearnFlow logo"
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-lg font-bold text-slate-900">LEARNFLOW</h1>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-violet-500 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-6 rounded-xl border border-slate-200 px-3 py-4 text-xs text-slate-500">
          © 2026 TalentFlow
        </div>
      </aside>
    </>
  );
}
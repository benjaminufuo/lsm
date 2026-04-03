import { useState } from "react";
import {
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineBars3,
} from "react-icons/hi2";
import { toast } from "react-toastify";

type Props = {
  onMenuClick: () => void;
};

export default function AdminTopbar({ onMenuClick }: Props) {
  const [q, setQ] = useState("");

  const handleBellClick = () => {
    toast.info("Notifications feature coming next.");
  };

  const handleProfileClick = () => {
    toast.info("Profile settings coming next.");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) {
      toast.info("Type something to search.");
      return;
    }
    toast.success(`Searching for "${q}"`);
  };

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 xl:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <HiOutlineBars3 className="h-5 w-5" />
          </button>

          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses..."
              className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm outline-none transition focus:border-violet-400 focus:bg-white"
            />
          </form>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleBellClick}
            className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
          >
            <HiOutlineBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] text-white">
              3
            </span>
          </button>

          <button
            type="button"
            onClick={handleProfileClick}
            className="flex items-center gap-3 rounded-2xl px-2 py-1 hover:bg-slate-50"
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">Sarah Chen</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
              SC
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
import { HiOutlineBell, HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function AdminTopbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
      <div className="relative w-full max-w-md">
        <HiOutlineMagnifyingGlass className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search courses..."
          className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pr-4 pl-10 text-sm outline-none transition focus:border-violet-400 focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
        >
          <HiOutlineBell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">Sarah Chen</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
            SC
          </div>
        </div>
      </div>
    </header>
  );
}
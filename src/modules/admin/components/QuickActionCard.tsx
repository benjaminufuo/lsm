import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  text: string;
  buttonText: string;
  onClick: () => void;
};

export default function QuickActionCard({
  icon,
  title,
  text,
  buttonText,
  onClick,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200/60 bg-white/90 p-6 text-center backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-8">
      <div className="mb-6 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
          {icon}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{text}</p>

      <button
        type="button"
        onClick={onClick}
        className="mt-6 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
      >
        {buttonText}
      </button>
    </section>
  );
}
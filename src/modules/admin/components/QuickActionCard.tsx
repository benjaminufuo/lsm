import type { ReactNode } from "react";
import Button from "../../../shared/Button/Index";

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
    <section className="rounded-3xl border border-slate-200/60 bg-white p-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-6 lg:p-8">
      <div className="mb-4 flex justify-center sm:mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 sm:h-12 sm:w-12">
          {icon}
        </div>
      </div>

      <h3 className="text-base font-semibold text-slate-900 sm:text-xl">
        {title}
      </h3>

      <p className="mt-2 text-xs text-slate-500 sm:text-sm">{text}</p>

      <div className="mt-5 sm:mt-6">
        <Button
          onClick={onClick}
          size="large"
          fullWidth
          className="rounded-full"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
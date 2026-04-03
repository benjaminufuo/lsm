import type { Assignment } from "../types/admin";

type Props = {
  assignment: Assignment;
  onView: (id: string) => void;
};

export default function AssignmentCard({ assignment, onView }: Props) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white/90 p-4 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center">
      <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
        <img
          src={assignment.image}
          alt={assignment.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-2 text-sm font-semibold text-slate-900">
          {assignment.title}
        </h4>
        <p className="text-sm text-slate-500">{assignment.course}</p>
        <p className="mt-2 text-xs text-slate-400">Due {assignment.dueDate}</p>
      </div>

      <button
        type="button"
        onClick={() => onView(assignment.id)}
        className="self-start rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 active:scale-[0.98] sm:self-auto"
      >
        View Submissions
      </button>
    </article>
  );
}
import type { Assignment } from "../types/admin";
import Button from "../../../shared/Button/Index";

type Props = {
  assignment: Assignment;
  onView: (id: string) => void;
};

export default function AssignmentCard({ assignment, onView }: Props) {
  return (
    <article className="rounded-2xl border border-slate-200/60 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:flex sm:items-center sm:gap-4 sm:p-4">
      <div className="flex gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-16 sm:w-16">
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
          <p className="text-xs text-slate-500 sm:text-sm">
            {assignment.course}
          </p>
          <p className="mt-2 text-[11px] text-slate-400 sm:text-xs">
            Due {assignment.dueDate}
          </p>
        </div>
      </div>

      <div className="mt-3 sm:mt-0 sm:ml-auto sm:shrink-0">
        <Button
          onClick={() => onView(assignment.id)}
          size="small"
          fullWidth
          className="rounded-full sm:w-auto"
        >
          View Submissions
        </Button>
      </div>
    </article>
  );
}
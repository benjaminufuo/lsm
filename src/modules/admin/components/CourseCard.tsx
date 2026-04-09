import type { Course } from "../types/admin";

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  return (
    <article className="flex gap-3 rounded-2xl border border-slate-200/60 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:gap-4 sm:p-4">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-16 sm:w-16">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h4 className="line-clamp-2 text-sm font-semibold text-slate-900">
            {course.title}
          </h4>
          <span className="shrink-0 text-[10px] text-slate-400 sm:text-xs">
            {course.progress}%
          </span>
        </div>

        <p className="text-xs text-slate-500 sm:text-sm">
          {course.instructor}
        </p>

        <div className="mt-2 h-2 rounded-full bg-slate-100 sm:mt-3">
          <div
            className="h-2 rounded-full bg-violet-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>

        <p className="mt-2 text-[11px] text-slate-400 sm:text-xs">
          {course.status}
        </p>
      </div>
    </article>
  );
}
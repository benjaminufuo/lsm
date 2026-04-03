import type { Course } from "../types/admin";

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  return (
    <article className="flex gap-4 rounded-2xl border border-slate-200/60 bg-white/90 p-4 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h4 className="line-clamp-2 text-sm font-semibold text-slate-900">
            {course.title}
          </h4>
          <span className="shrink-0 text-xs text-slate-400">
            {course.progress}%
          </span>
        </div>

        <p className="text-sm text-slate-500">{course.instructor}</p>

        <div className="mt-3 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-slate-400">{course.status}</p>
      </div>
    </article>
  );
}
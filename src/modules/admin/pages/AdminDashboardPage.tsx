import {
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import AssignmentCard from "../components/AssignmentCard";
import CourseCard from "../components/CourseCard";
import QuickActionCard from "../components/QuickActionCard";
import { recentAssignments, recentCourses } from "../data/dashboardData";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Welcome back, Miracle 👋
        </h1>
        <p className="mt-2 text-base text-slate-500">
          Upload and manage your course and assignments.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <QuickActionCard
          icon={<HiOutlineBookOpen className="h-6 w-6" />}
          title="Upload New Course"
          text="Create and upload new courses for students"
          buttonText="+ New Course"
        />

        <QuickActionCard
          icon={<HiOutlineClipboardDocumentList className="h-6 w-6" />}
          title="Upload New Assignment"
          text="Add and assign new assignment to courses"
          buttonText="+ New Assignment"
        />
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Course
            </h2>
            <button
              type="button"
              className="text-sm font-medium text-violet-500 hover:text-violet-600"
            >
              View All →
            </button>
          </div>

          <div className="space-y-4">
            {recentCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Assignment
            </h2>
            <button
              type="button"
              className="text-sm font-medium text-violet-500 hover:text-violet-600"
            >
              View All →
            </button>
          </div>

          <div className="space-y-4">
            {recentAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
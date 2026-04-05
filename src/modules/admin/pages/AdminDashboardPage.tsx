import { useNavigate } from "react-router-dom";
import {
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import AssignmentCard from "../components/AssignmentCard";
import CourseCard from "../components/CourseCard";
import QuickActionCard from "../components/QuickActionCard";
import { recentAssignments, recentCourses } from "../data/dashboardData";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const goToCourses = () => navigate("/learnflow/admin/courses");
  const goToAssignments = () => navigate("/learnflow/admin/assignments");

  const handleViewSubmissions = (id: string) => {
    toast.success(`Open submissions for assignment ${id}`);
    navigate("/learnflow/admin/assignments");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pt-3 sm:space-y-8 sm:pt-6">
      <section className="hidden sm:block">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Welcome back, Miracle 👋
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Upload and manage your course and assignments.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
        <QuickActionCard
          icon={<HiOutlineBookOpen className="h-5 w-5 sm:h-6 sm:w-6" />}
          title="Upload New Course"
          text="Create and upload new courses for students"
          buttonText="+ New Course"
          onClick={goToCourses}
        />

        <QuickActionCard
          icon={<HiOutlineClipboardDocumentList className="h-5 w-5 sm:h-6 sm:w-6" />}
          title="Upload New Assignment"
          text="Add and assign new assignment to courses"
          buttonText="+ New Assignment"
          onClick={goToAssignments}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <div className="mb-3 flex items-center justify-between gap-4 sm:mb-4">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Recent Course
            </h2>
            <button
              type="button"
              onClick={goToCourses}
              className="shrink-0 text-xs font-medium text-violet-500 hover:text-violet-600 sm:text-sm"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {recentCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4 sm:mb-4">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Recent Assignment
            </h2>
            <button
              type="button"
              onClick={goToAssignments}
              className="shrink-0 text-xs font-medium text-violet-500 hover:text-violet-600 sm:text-sm"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {recentAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onView={handleViewSubmissions}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
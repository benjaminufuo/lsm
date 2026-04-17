import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import AssignmentCard from "../components/AssignmentCard";
import CourseCard from "../components/CourseCard";
import QuickActionCard from "../components/QuickActionCard";
import { getAdminDashboard } from "../data/dashboardApi";
import {
  mapDashboardAssignmentToAssignment,
  mapDashboardCourseToCourse,
} from "../data/dashboardMapper";
import type { Assignment, Course } from "../types/admin";
import type { AdminDashboardStats } from "../types/dashboard";
import Loading from "../../../components/Loading";
import { useSelector } from "react-redux";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state?.learnFlow?.userInfo);
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [recentAssignments, setRecentAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const goToCourses = () => navigate("/learnflow/admin/courses");
  const goToAssignments = () => navigate("/learnflow/admin/assignments");

  const handleViewSubmissions = (id: string) => {
    navigate(`/learnflow/admin/adminSubmissions/${id}`);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminDashboard();

        setStats(data.stats);
        setRecentCourses(data.recentCourses.map(mapDashboardCourseToCourse));
        setRecentAssignments(
          data.recentAssignments.map(mapDashboardAssignmentToAssignment),
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load dashboard";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl pt-6">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 pt-3 sm:space-y-8 sm:pt-6">
      <section className="hidden sm:block">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Welcome back, {userInfo?.fullName?.split(" ")[0] || "Admin"} 👋
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Upload and manage your course and assignments.
        </p>
      </section>

      {stats && (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            <p className="text-xs text-slate-500">Users</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {stats.totalUsers}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            <p className="text-xs text-slate-500">Students</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {stats.totalStudents}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            <p className="text-xs text-slate-500">Courses</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {stats.totalCourses}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            <p className="text-xs text-slate-500">Assignments</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {stats.totalAssignments}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            <p className="text-xs text-slate-500">Submissions</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {stats.totalSubmissions}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            <p className="text-xs text-slate-500">Pending Grading</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {stats.pendingGrading}
            </p>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
        <QuickActionCard
          icon={<HiOutlineBookOpen className="h-5 w-5 sm:h-6 sm:w-6" />}
          title="Upload New Course"
          text="Create and upload new courses for students"
          buttonText="+ New Course"
          onClick={goToCourses}
        />

        <QuickActionCard
          icon={
            <HiOutlineClipboardDocumentList className="h-5 w-5 sm:h-6 sm:w-6" />
          }
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
            {recentCourses.length > 0 ? (
              recentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="text-sm text-slate-500">No recent courses found.</p>
            )}
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
            {recentAssignments.length > 0 ? (
              recentAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onView={handleViewSubmissions}
                />
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No recent assignments found.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

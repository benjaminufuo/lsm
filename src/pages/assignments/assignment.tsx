import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { LuClipboardList, LuClock, LuSend, LuTrendingUp, LuStar } from "react-icons/lu";

interface Assignment {
  id: number;
  title: string;
  course: string;
  description: string;
  status: "pending" | "completed" | "submitted";
  dueDate: string;
  daysLeft: number;
  submittedDate?: string;
  score?: string;
}

const assignmentsData: Assignment[] = [
  {
    id: 1,
    title: "React Component Architecture",
    course: "Advanced React Development",
    description: "Design and implement a scalable component architecture for a complex application.",
    status: "pending",
    dueDate: "Mar 22, 2026",
    daysLeft: 3,
  },
  {
    id: 2,
    title: "User Research Report",
    course: "UI/UX Design Fundamentals",
    description: "Conduct user research and create a comprehensive report with insights.",
    status: "pending",
    dueDate: "Mar 25, 2026",
    daysLeft: 6,
  },
  {
    id: 3,
    title: "State Management Implementation",
    course: "Advanced React Development",
    description: "Implement Redux for state management in a medium-sized application.",
    status: "pending",
    dueDate: "Mar 28, 2026",
    daysLeft: 9,
  },
  {
    id: 4,
    title: "Data Analysis Project",
    course: "Data Science with Python",
    description: "Analyze a dataset and present findings with visualizations.",
    status: "submitted",
    dueDate: "Mar 10, 2026",
    daysLeft: 0,
    submittedDate: "Mar 10, 2026",
  },
  {
    id: 5,
    title: "Design System Documentation",
    course: "UI/UX Design Fundamentals",
    description: "Create comprehensive documentation for a design system.",
    status: "completed",
    dueDate: "Mar 14, 2026",
    daysLeft: 0,
    submittedDate: "Mar 14, 2026",
    score: "95/100",
  },
  {
    id: 6,
    title: "Python Data Structures Quiz",
    course: "Data Science with Python",
    description: "Complete quiz on advanced Python data structures.",
    status: "completed",
    dueDate: "Mar 10, 2026",
    daysLeft: 0,
    submittedDate: "Mar 10, 2026",
    score: "88/100",
  },
];

const Assignments = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");

  const pendingCount = assignmentsData.filter((a) => a.status === "pending").length;
  const completedCount = assignmentsData.filter(
    (a) => a.status === "completed" || a.status === "submitted"
  ).length;

  const filteredAssignments = assignmentsData.filter((a) =>
    activeTab === "pending"
      ? a.status === "pending"
      : a.status === "completed" || a.status === "submitted"
  );

  return (
    <div className="p-2 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ptext">Assignments</h1>
        <p className="text-stext mt-1 text-sm">
          Track and manage all your course assignments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-bordercolor flex items-center justify-between">
          <div>
            <p className="text-xs text-stext mb-1">Total Assignments</p>
            <p className="text-2xl font-bold text-ptext">6</p>
          </div>
          <LuClipboardList size={22} className="text-stext opacity-50" />
        </div>
        <div className="bg-white rounded-xl p-4 border border-bordercolor flex items-center justify-between">
          <div>
            <p className="text-xs text-stext mb-1">Pending</p>
            <p className="text-2xl font-bold text-ptext">3</p>
          </div>
          <LuClock size={22} className="text-stext opacity-50" />
        </div>
        <div className="bg-white rounded-xl p-4 border border-bordercolor flex items-center justify-between">
          <div>
            <p className="text-xs text-stext mb-1">Submitted</p>
            <p className="text-2xl font-bold text-ptext">1</p>
          </div>
          <LuSend size={22} className="text-stext opacity-50" />
        </div>
        <div className="bg-white rounded-xl p-4 border border-bordercolor flex items-center justify-between">
          <div>
            <p className="text-xs text-stext mb-1">Average Grade</p>
            <p className="text-2xl font-bold text-ptext">91.5%</p>
          </div>
          <LuTrendingUp size={22} className="text-stext opacity-50" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-4 bg-gray-100 rounded-full p-1 w-fit">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-5 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer ${activeTab === "pending"
              ? "bg-white text-ptext shadow-sm"
              : "text-stext hover:text-ptext"
            }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-5 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer ${activeTab === "completed"
              ? "bg-white text-ptext shadow-sm"
              : "text-stext hover:text-ptext"
            }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Assignment List */}
      <div className="flex flex-col gap-3">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-xl border border-bordercolor p-4 flex items-start gap-4 hover:shadow-sm transition-shadow"
          >
            {/* Circle indicator */}
            <div
              className={`mt-1 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${assignment.status === "pending"
                  ? "border-[#CBD5E1]"
                  : "border-primary bg-primary"
                }`}
            >
              {assignment.status !== "pending" && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-ptext leading-snug">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-0.5">
                    {assignment.course}
                  </p>
                  <p className="text-sm text-stext mt-1 leading-relaxed">
                    {assignment.description}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {activeTab === "completed" ? (
                    <>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-50 text-blue-600">
                        submitted
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-amber-50 text-amber-600">
                        Pending
                      </span>
                    </>
                  ) : (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-amber-50 text-amber-600 capitalize">
                      {assignment.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-4 mt-3 text-xs text-stext">
                {activeTab === "completed" ? (
                  <>
                    <span className="flex items-center gap-1">
                      <IoCalendarOutline size={13} />
                      Submitted {assignment.submittedDate}
                    </span>
                    {assignment.score && (
                      <span className="flex items-center gap-1">
                        <LuStar size={13} />
                        Score: {assignment.score}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1">
                      <IoCalendarOutline size={13} />
                      Due {assignment.dueDate}
                    </span>
                    {assignment.daysLeft > 0 && (
                      <span className="flex items-center gap-1">
                        {assignment.daysLeft} days left
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12 text-stext">
            <p className="text-sm">No {activeTab} assignments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
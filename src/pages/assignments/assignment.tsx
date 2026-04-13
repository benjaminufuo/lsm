import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { LuClipboardList, LuClock, LuSend, LuTrendingUp, LuStar, LuInfo } from "react-icons/lu";
import Loading from "../../components/Loading";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  status: "pending" | "completed" | "submitted";
  dueDate: string;
  daysLeft: number;
  submittedDate?: string;
  score?: string;
}

const Assignments = () => {
  const userToken = useSelector((state: any) => state.learnFlow.userToken);
  const [assignmentsData, setAssignmentsData] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!userToken) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}assignments`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const data = response.data?.data || response.data;
        setAssignmentsData(data);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [userToken]);

  const pendingCount = assignmentsData.filter((a) => a.status === "pending").length;
  const completedCount = assignmentsData.filter(
    (a) => a.status === "completed" || a.status === "submitted"
  ).length;

  const filteredAssignments = assignmentsData.filter((a) =>
    activeTab === "pending"
      ? a.status === "pending"
      : a.status === "completed" || a.status === "submitted"
  );

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen pb-10">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-ptext">Assignments</h1>
        <p className="text-stext mt-1 text-sm">
          Track and manage all your course assignments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 md:p-5 border border-bordercolor flex flex-col justify-between gap-4 min-h-[100px]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stext">Total Assignments</p>
            <LuClipboardList size={16} className="text-primary shrink-0" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-ptext">{assignmentsData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-5 border border-bordercolor flex flex-col justify-between gap-4 min-h-[100px]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stext">Pending</p>
            <LuClock size={16} className="text-primary shrink-0" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-ptext">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-5 border border-bordercolor flex flex-col justify-between gap-4 min-h-[100px]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stext">Submitted</p>
            <LuSend size={16} className="text-primary shrink-0" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-ptext">
            {assignmentsData.filter((a) => a.status === "submitted").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-5 border border-bordercolor flex flex-col justify-between gap-4 min-h-[100px]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stext">Average Grade</p>
            <LuTrendingUp size={16} className="text-primary shrink-0" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-ptext">91.5%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-4 bg-gray-100 rounded-full p-1 w-fit">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 md:px-5 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer ${activeTab === "pending"
              ? "bg-primary text-white shadow-sm"
              : "text-stext hover:text-ptext"
            }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 md:px-5 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer ${activeTab === "completed"
              ? "bg-primary text-white shadow-sm"
              : "text-stext hover:text-ptext"
            }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Assignment List */}
      <div className="flex flex-col gap-3">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12 text-stext">
            <p className="text-sm">No {activeTab} assignments found.</p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white rounded-xl border border-bordercolor p-4 md:p-5 flex items-start gap-3 md:gap-4 hover:shadow-sm transition-shadow"
            >
              <LuInfo size={20} className="mt-1 shrink-0 text-primary" />

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-ptext leading-snug text-sm md:text-base">
                      {assignment.title}
                    </h3>
                    <p className="text-xs md:text-sm text-stext font-medium mt-0.5">
                      {assignment.course}
                    </p>
                    <p className="text-xs md:text-sm text-stext mt-1 leading-relaxed">
                      {assignment.description}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1.5 shrink-0">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${assignment.status === "pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-green-50 text-green-600"
                        }`}
                    >
                      {assignment.status === "pending" ? "Pending" : "Submitted"}
                    </span>

                    {activeTab === "pending" ? (
                      <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0.5 text-xs text-stext">
                        <span className="flex items-center gap-1">
                          <IoCalendarOutline size={12} />
                          Due {assignment.dueDate}
                        </span>
                        {assignment.daysLeft > 0 && (
                          <span className="flex items-center gap-1">
                            <IoTimeOutline size={12} />
                            {assignment.daysLeft} days left
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0.5 text-xs text-stext">
                        <span className="flex items-center gap-1">
                          <IoCalendarOutline size={12} />
                          Submitted {assignment.submittedDate}
                        </span>
                        {assignment.score && (
                          <span className="flex items-center gap-1">
                            <LuStar size={12} />
                            Score: {assignment.score}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assignments;
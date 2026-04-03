import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function AdminAssignmentsPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
      <button
        type="button"
        onClick={() => navigate("/learnflow/admin/dashboard")}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-violet-500 transition-colors hover:text-violet-600"
      >
        <MdOutlineArrowBack className="h-4 w-4" />
        Back to Dashboard
      </button>       
      </div>
      
      <div className="rounded-3xl bg-white p-6 shadow-sm">

        <h1 className="text-2xl font-bold text-slate-900">Assignments</h1>
        <p className="mt-2 text-sm text-slate-500">
          Assignments management page coming next.
        </p>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../shared/Button/Index";
import Loading from "../../../components/Loading";
import {
  getAssignmentSubmissions,
  gradeSubmission,
  type Submission,
} from "../data/assignmentsApi";

type ApiErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiErrorResponse;
    const message = apiError.response?.data?.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

export default function AdminSubmissionsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState<string>("");
  const [feedbackInput, setFeedbackInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const data = await getAssignmentSubmissions(id);
        const submissionsList = Array.isArray(data.data) ? data.data : [];
        setSubmissions(submissionsList);
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, "Failed to load submissions."));
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [id]);

  const handleGradeSubmit = async (submissionId: string) => {
    if (!gradeInput || isNaN(Number(gradeInput))) {
      toast.error("Please enter a valid numeric grade.");
      return;
    }

    setIsSubmitting(true);
    try {
      await gradeSubmission(submissionId, {
        grade: Number(gradeInput),
        feedback: feedbackInput,
      });
      toast.success("Grade submitted successfully!");

      // Update the local state instantly to reflect the new grade
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub._id === submissionId
            ? {
                ...sub,
                grade: Number(gradeInput),
                feedback: feedbackInput,
                status: "graded",
              }
            : sub,
        ),
      );

      // Close the grading inputs
      setGradingId(null);
      setGradeInput("");
      setFeedbackInput("");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to submit grade."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-7xl space-y-6 pt-3 sm:space-y-8 sm:pt-6">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-violet-500 transition-colors hover:text-violet-600"
        >
          <MdOutlineArrowBack className="h-4 w-4" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">
          Assignment Submissions
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Review and grade student submissions.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm overflow-hidden">
        {submissions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No submissions found for this assignment yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Submission
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {submissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-slate-50/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">
                        {submission.student?.fullName || "Unknown Student"}
                      </div>
                      <div className="text-sm text-slate-500">
                        {submission.student?.email}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${submission.grade !== undefined || submission.status === "graded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {submission.grade !== undefined ||
                        submission.status === "graded"
                          ? "Graded"
                          : "Pending"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {submission.fileUrl ? (
                        <a
                          href={submission.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-violet-600 hover:underline font-medium"
                        >
                          View Attachment
                        </a>
                      ) : submission.content ? (
                        <button
                          onClick={() => toast.info(submission.content)}
                          className="text-violet-600 hover:underline font-medium"
                        >
                          View Text
                        </button>
                      ) : (
                        <span className="text-slate-400">
                          No content provided
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {gradingId === submission._id ? (
                        <div className="flex flex-col gap-2 min-w-[200px]">
                          <input
                            type="number"
                            placeholder="Score (0-100)"
                            value={gradeInput}
                            onChange={(e) => setGradeInput(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                          />
                          <textarea
                            placeholder="Feedback (optional)"
                            value={feedbackInput}
                            onChange={(e) => setFeedbackInput(e.target.value)}
                            rows={2}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
                          />
                        </div>
                      ) : (
                        <div className="text-sm text-slate-900">
                          <span className="font-semibold">
                            {submission.grade !== undefined
                              ? `${submission.grade}/100`
                              : "-"}
                          </span>
                          {submission.feedback && (
                            <p
                              className="text-xs text-slate-500 truncate max-w-[150px] mt-1"
                              title={submission.feedback}
                            >
                              "{submission.feedback}"
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      {gradingId === submission._id ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="small"
                            className="!px-3 !py-1.5"
                            onClick={() => setGradingId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="small"
                            className="!px-3 !py-1.5"
                            loading={isSubmitting}
                            onClick={() => handleGradeSubmit(submission._id)}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="small"
                          className="!px-3 !py-1.5"
                          onClick={() => {
                            setGradingId(submission._id);
                            setGradeInput(submission.grade?.toString() || "");
                            setFeedbackInput(submission.feedback || "");
                          }}
                        >
                          {submission.grade !== undefined
                            ? "Update Grade"
                            : "Grade"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

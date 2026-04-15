import { useEffect, useState } from "react";
import { MdOutlineArrowBack, MdLayers } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../shared/Button/Index";
import Input from "../../../shared/Input/Index";
import { assignmentApi } from "../api/assignmentApi";
import { courseApi } from "../api/courseApi";
import type { AssignmentCreatePayload, CourseResponse } from "../types/admin";

export default function AdminAssignmentsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [formData, setFormData] = useState<AssignmentCreatePayload>({
    title: "",
    description: "",
    course: "",
    dueDate: "",
    totalMarks: undefined,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseApi.getAll();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDescriptionInput = (
    event: React.FormEvent<HTMLTextAreaElement>,
  ) => {
    const target = event.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalMarks" ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleCancel = () => {
    navigate("/learnflow/admin/dashboard");
  };

  const handleCreate = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Assignment title is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Assignment description is required");
      return;
    }
    if (!formData.course) {
      toast.error("Please select a course");
      return;
    }
    if (!formData.dueDate) {
      toast.error("Due date is required");
      return;
    }

    setLoading(true);
    try {
      const payload: AssignmentCreatePayload = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
        attachment: attachment || undefined,
      };

      const created = await assignmentApi.create(payload);
      
      toast.success(`Assignment "${created.title}" created successfully!`);
      navigate("/learnflow/admin/dashboard");
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Failed to create assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-slate-900">
          Upload New Assignment
        </h1>
        <p className="mt-2 mb-4 text-sm text-slate-500">
          Create and assign new assignments to courses
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mt-10 text-2xl text-slate-900">Assignment Details</h1>
        <label
          htmlFor="assignment-attachment"
          className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition-colors hover:border-violet-400"
        >
          <MdLayers className="h-10 w-10 text-slate-500" />
          <p className="mt-4 text-lg font-medium text-slate-800">
            {attachment ? attachment.name : "Click to upload an assignment file"}
          </p>
          <p className="mt-2 text-sm text-slate-500">or drag and drop</p>
          <p className="mt-2 text-sm text-slate-400">Max 5mb</p>
        </label>
        <input
          id="assignment-attachment"
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleAttachmentChange}
        />

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-lg font-medium text-slate-800">Assignment Title *</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter assignment title"
              className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-slate-800">Select Course *</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              disabled={loadingCourses}
              className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] hover:bg-white focus:border-[#7300ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7300ff]/10 disabled:opacity-50"
            >
              <option value="">{loadingCourses ? "Loading courses..." : "Choose a course"}</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-lg font-medium text-slate-800">Due Date *</label>
              <Input
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
              />
            </div>

            <div>
              <label className="text-lg font-medium text-slate-800">Total Marks</label>
              <Input
                name="totalMarks"
                type="number"
                value={formData.totalMarks ?? ""}
                onChange={handleInputChange}
                placeholder="e.g. 100"
                className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-lg font-medium text-slate-800">Assignment Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write a brief description of the assignment"
              rows={1}
              onInput={handleDescriptionInput}
              className="w-full overflow-hidden resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
            />
          </div>

          <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-12">
            <Button
              variant="outline"
              label="Cancel"
              size="large"
              onClick={handleCancel}
              className="w-full rounded-2xl text-gray-500 sm:flex-1"
            />
            <Button
              label={loading ? "Creating..." : "Create Assignment"}
              size="large"
              onClick={handleCreate}
              disabled={loading || loadingCourses}
              className="w-full rounded-2xl bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 sm:flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

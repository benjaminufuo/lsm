import { useState } from "react";
import { MdLayers, MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../shared/Button/Index";
import Input from "../../../shared/Input/Index";
import { courseApi } from "../api/courseApi";
import type { CourseCreatePayload } from "../types/admin";

export default function AdminCoursesPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [formData, setFormData] = useState<CourseCreatePayload>({
    title: "",
    description: "",
    category: "",
    duration: 0,
    difficulty: "beginner",
    instructorName: "",
    instructorBio: "",
    lessons: "[]",
  });

  const handleDescriptionInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? parseFloat(value) : value,
    }));
  };

  const handleCancel = () => {
    navigate("/learnflow/admin/dashboard");
  };

  const handlePublish = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Course title is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Course description is required");
      return;
    }
    if (!thumbnail) {
      toast.error("Course thumbnail is required");
      return;
    }

    setLoading(true);
    try {
      const payload: CourseCreatePayload = {
        ...formData,
        thumbnail,
        lessons: formData.lessons || "[]",
      };

      const course = await courseApi.create(payload);
      
      toast.success(`Course "${course.courseTitle}" created successfully!`);
      navigate("/learnflow/admin/dashboard");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course. Please try again.");
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
        <h1 className="text-2xl font-bold text-slate-900">Upload New Course</h1>
        <p className="mt-2 mb-4 text-sm text-slate-500">
          Manage and organise all courses
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl mt-10 text-slate-900">Course Details</h1>
        <label
          htmlFor="cover-image"
          className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition-colors hover:border-violet-400"
        >
          <MdLayers className="h-10 w-10 text-slate-500" />
          <p className="mt-4 text-lg font-medium text-slate-800">
            {thumbnail ? thumbnail.name : "Click to upload a cover image"}
          </p>
          <p className="mt-2 text-sm text-slate-500">or drag and drop</p>
          <p className="mt-2 text-sm text-slate-400">1200x600px...Max 2mb</p>
        </label>
        <input
          id="cover-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleThumbnailChange}
        />

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-lg font-medium text-slate-800">Course Title *</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter course title"
              className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-slate-800">Instructor Name</label>
            <Input
              name="instructorName"
              value={formData.instructorName}
              onChange={handleInputChange}
              placeholder="Enter instructor name"
              className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-slate-800">Instructor Bio</label>
            <textarea
              name="instructorBio"
              value={formData.instructorBio}
              onChange={handleInputChange}
              placeholder="Brief biography of the instructor"
              rows={3}
              onInput={handleDescriptionInput}
              className="w-full overflow-hidden resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-lg font-medium text-slate-800">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
              >
                <option value="">Select category</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-lg font-medium text-slate-800">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-lg font-medium text-slate-800">Duration (hours)</label>
            <Input
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Enter course duration in hours"
              className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-slate-800">Course Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write brief description of the course"
              rows={1}
              onInput={handleDescriptionInput}
              className="w-full overflow-hidden resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label className="text-lg font-medium text-slate-800">
                Lessons (JSON)
              </label>
            </div>
            <textarea
              name="lessons"
              value={formData.lessons}
              onChange={handleInputChange}
              placeholder='[{"title": "Intro", "content": "..."}]'
              rows={4}
              className="w-full overflow-hidden resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] font-mono transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
            />
            <p className="text-xs text-slate-500">JSON stringified array of lesson objects</p>
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
              label={loading ? "Publishing..." : "Publish Course"}
              size="large"
              onClick={handlePublish}
              disabled={loading}
              className="w-full rounded-2xl bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 sm:flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
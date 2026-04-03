import { MdLayers, MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/Button/Index";
import Input from "../../../shared/Input/Index";

export default function AdminCoursesPage() {
  const navigate = useNavigate();

  const handleDescriptionInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
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
            Click to upload a cover image
          </p>
          <p className="mt-2 text-sm text-slate-500">or drag and drop</p>
          <p className="mt-2 text-sm text-slate-400">1200x600px...Max 2mb</p>
        </label>
        <input id="cover-image" type="file" accept="image/*" className="hidden" />

        <div className="mt-6 space-y-5">
          <label className="text-lg font-medium text-slate-800">Course Title</label>
          <Input
            placeholder="Enter course title"
            className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
          />

          <label className="text-lg font-medium text-slate-800">Instructor Name</label>
          <Input
            placeholder="Enter"
            className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
          />

          <div className="space-y-2">
            <label className="text-lg font-medium text-slate-800">Lesson</label>
            <select
              defaultValue=""
              className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
            >
              <option value="" disabled>
                Select numbers of lesson
              </option>
              <option value="1">1 Lesson</option>
              <option value="2">2 Lessons</option>
              <option value="3">3 Lessons</option>
              <option value="4">4 Lessons</option>
              <option value="5">5 Lessons</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-slate-800  ">
              Course Description
            </label>
            <textarea
              placeholder="Write bried of the description of the course"
              rows={1}
              onInput={handleDescriptionInput}
              className="w-full overflow-hidden resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label className="text-lg font-medium text-slate-800">
                Course Content
              </label>
              <button
                type="button"
                className="text-sm font-medium text-violet-500 transition-colors hover:text-violet-600"
              >
                Add New +
              </button>
            </div>
            <Input
              placeholder="Enter course content"
              className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
            />
          </div>

          <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-12">
            <Button
              variant="outline"
              label="Cancel"
              size="large"
              className="w-full rounded-2xl text-gray-500 sm:flex-1"
            />
            <Button
              label="Publish Course"
              size="large"
              className="w-full rounded-2xl bg-violet-500 text-white hover:bg-violet-600 sm:flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
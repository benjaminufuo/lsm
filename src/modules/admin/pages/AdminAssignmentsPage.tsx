import { MdOutlineArrowBack, MdOutlineMessage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/Button/Index";
import Input from "../../../shared/Input/Index";

export default function AdminAssignmentsPage() {
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
        <h1 className="text-2xl font-bold text-slate-900">Upload New Assignment</h1>
        <p className="mt-2 mb-4 text-sm text-slate-500">
          Upload and manage assignments.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl mt-10 text-slate-900">Assignment Details</h1>

        <label
          htmlFor="assignment-attachment"
          className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition-colors hover:border-violet-400"
        >
          <MdOutlineMessage className="mt-3 h-10 w-10 text-slate-500" />
          <p className="mt-4 text-lg font-medium text-slate-800">
            Click to upload an attachment
          </p>
          <p className="mt-2 text-sm text-slate-500">or drag and drop</p>
          <p className="mt-2 text-sm text-slate-400">PDF, DOCX... Max 20mb</p>
        </label>
        <input
          id="assignment-attachment"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
        />

        <div className="mt-6 space-y-5">
          <label className="text-lg font-medium text-slate-800">Assignment Title</label>
          <Input
            placeholder="Enter assignment title"
            className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <label className="text-lg font-medium text-slate-800">Assign to Course</label>
            <label className="text-lg font-medium text-slate-800">Due Date</label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              defaultValue=""
              className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
            >
              <option value="" disabled>
                Select course
              </option>
              <option value="frontend">Frontend Development</option>
              <option value="backend">Backend Development</option>
              <option value="uiux">UI/UX Design</option>
            </select>

            <input
              type="text"
              placeholder="Select date"
              onFocus={(event) => {
                event.currentTarget.type = "date";
              }}
              onBlur={(event) => {
                if (!event.currentTarget.value) {
                  event.currentTarget.type = "text";
                }
              }}
              className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] hover:bg-white focus:outline-none focus:border-[#7300ff] focus:bg-white focus:ring-2 focus:ring-[#7300ff]/10"
              aria-label="Select date"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-slate-800">Description</label>
            <textarea
              placeholder="Write brief of the description of the assignment"
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
              className="w-full rounded-2xl text-gray-500 sm:flex-1"
            />
            <Button
              label="Create Assignment"
              size="large"
              className="w-full rounded-2xl bg-violet-500 text-white hover:bg-violet-600 sm:flex-1"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
import { useState } from "react";
import { MdLayers, MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../shared/Button/Index";
import Input from "../../../shared/Input/Index";
import { courseApi } from "../api/courseApi";
import type { CourseCreatePayload, LessonCreatePayload } from "../types/admin";

type LessonResourceDraft = {
  title: string;
  url: string;
  type: string;
};

type LessonDraft = {
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  duration: string;
  isPreviewable: boolean;
  resources: LessonResourceDraft[];
  attachmentsText: string;
};

const createEmptyResource = (): LessonResourceDraft => ({
  title: "",
  url: "",
  type: "",
});

const createEmptyLesson = (): LessonDraft => ({
  title: "",
  description: "",
  content: "",
  videoUrl: "",
  duration: "",
  isPreviewable: false,
  resources: [],
  attachmentsText: "",
});

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
  });
  const [lessons, setLessons] = useState<LessonDraft[]>([]);

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

  const addLesson = () => {
    setLessons((prev) => [...prev, createEmptyLesson()]);
  };

  const removeLesson = (lessonIndex: number) => {
    setLessons((prev) => prev.filter((_, index) => index !== lessonIndex));
  };

  const updateLessonField = (
    lessonIndex: number,
    field: keyof Omit<LessonDraft, "resources">,
    value: string | boolean,
  ) => {
    setLessons((prev) =>
      prev.map((lesson, index) =>
        index === lessonIndex ? { ...lesson, [field]: value } : lesson,
      ),
    );
  };

  const addResource = (lessonIndex: number) => {
    setLessons((prev) =>
      prev.map((lesson, index) =>
        index === lessonIndex
          ? { ...lesson, resources: [...lesson.resources, createEmptyResource()] }
          : lesson,
      ),
    );
  };

  const removeResource = (lessonIndex: number, resourceIndex: number) => {
    setLessons((prev) =>
      prev.map((lesson, index) =>
        index === lessonIndex
          ? {
              ...lesson,
              resources: lesson.resources.filter((_, rIndex) => rIndex !== resourceIndex),
            }
          : lesson,
      ),
    );
  };

  const updateResourceField = (
    lessonIndex: number,
    resourceIndex: number,
    field: keyof LessonResourceDraft,
    value: string,
  ) => {
    setLessons((prev) =>
      prev.map((lesson, index) => {
        if (index !== lessonIndex) return lesson;

        return {
          ...lesson,
          resources: lesson.resources.map((resource, rIndex) =>
            rIndex === resourceIndex ? { ...resource, [field]: value } : resource,
          ),
        };
      }),
    );
  };

  const buildLessonsPayload = (): LessonCreatePayload[] => {
    return lessons.map((lesson, index) => {
      const title = lesson.title.trim();
      const description = lesson.description.trim();
      const content = lesson.content.trim();
      const videoUrl = lesson.videoUrl.trim();
      const duration = Number(lesson.duration);

      if (!title || !description || !content || !videoUrl || Number.isNaN(duration)) {
        throw new Error(
          `Lesson ${index + 1} is missing required fields: title, description, content, video URL, duration`,
        );
      }

      const payload: LessonCreatePayload = {
        title,
        description,
        content,
        videoUrl,
        duration,
      };

      if (lesson.isPreviewable) {
        payload.isPreviewable = true;
      }

      if (lesson.resources.length > 0) {
        const resources = lesson.resources
          .map((resource) => ({
            title: resource.title.trim(),
            url: resource.url.trim(),
            type: resource.type.trim(),
          }))
          .filter((resource) => resource.title || resource.url || resource.type);

        const hasIncompleteResource = resources.some(
          (resource) => !resource.title || !resource.url || !resource.type,
        );
        if (hasIncompleteResource) {
          throw new Error(
            `Lesson ${index + 1} has an incomplete resource. Fill title, URL, and type or remove it.`,
          );
        }

        if (resources.length > 0) {
          payload.resources = JSON.stringify(resources);
        }
      }

      const attachments = lesson.attachmentsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      if (attachments.length > 0) {
        payload.attachments = attachments;
      }

      return payload;
    });
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
      const lessonsPayload = buildLessonsPayload();

      const payload: CourseCreatePayload = {
        ...formData,
        thumbnail,
      };

      const course = await courseApi.create(payload);

      if (!course.courseId) {
        throw new Error("Course created but courseId is missing in response");
      }

      if (lessonsPayload.length > 0) {
        await Promise.all(
          lessonsPayload.map((lesson) => courseApi.createLesson(course.courseId, lesson)),
        );
      }
      
      toast.success(`Course "${course.courseTitle}" created successfully!`);
      navigate("/learnflow/admin/dashboard");
    } catch (error) {
      console.error("Error creating course:", error);
      const message =
        error instanceof Error ? error.message : "Failed to create course. Please try again.";
      toast.error(message);
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
                Lessons
              </label>
              <button
                type="button"
                onClick={addLesson}
                className="rounded-lg border border-violet-200 px-3 py-1 text-sm font-medium text-violet-600 hover:bg-violet-50"
              >
                + Add Lesson
              </button>
            </div>
            {lessons.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                No lessons added yet. Click "Add Lesson" to include lessons in this course.
              </p>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-slate-800">
                        Lesson {lessonIndex + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeLesson(lessonIndex)}
                        className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Title *</label>
                        <Input
                          value={lesson.title}
                          onChange={(event) => updateLessonField(lessonIndex, "title", event.target.value)}
                          placeholder="Lesson title"
                          className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700">Description *</label>
                        <textarea
                          value={lesson.description}
                          onChange={(event) => updateLessonField(lessonIndex, "description", event.target.value)}
                          rows={2}
                          onInput={handleDescriptionInput}
                          className="w-full overflow-hidden resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[12px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] focus:outline-none focus:border-[#7300ff] focus:ring-2 focus:ring-[#7300ff]/10"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700">Content *</label>
                        <textarea
                          value={lesson.content}
                          onChange={(event) => updateLessonField(lessonIndex, "content", event.target.value)}
                          rows={3}
                          onInput={handleDescriptionInput}
                          className="w-full overflow-hidden resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[12px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] focus:outline-none focus:border-[#7300ff] focus:ring-2 focus:ring-[#7300ff]/10"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-slate-700">Video URL *</label>
                          <Input
                            value={lesson.videoUrl}
                            onChange={(event) => updateLessonField(lessonIndex, "videoUrl", event.target.value)}
                            placeholder="https://..."
                            className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700">Duration (minutes) *</label>
                          <Input
                            type="number"
                            value={lesson.duration}
                            onChange={(event) => updateLessonField(lessonIndex, "duration", event.target.value)}
                            placeholder="10"
                            className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
                          />
                        </div>
                      </div>

                      <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={lesson.isPreviewable}
                          onChange={(event) => updateLessonField(lessonIndex, "isPreviewable", event.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-violet-500 focus:ring-violet-500"
                        />
                        Allow preview without enrollment
                      </label>

                      <div className="space-y-2 rounded-xl bg-slate-50 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm font-medium text-slate-700">Resources (optional)</label>
                          <button
                            type="button"
                            onClick={() => addResource(lessonIndex)}
                            className="rounded-md border border-violet-200 px-3 py-1 text-xs font-medium text-violet-600 hover:bg-violet-50"
                          >
                            + Add Resource
                          </button>
                        </div>

                        {lesson.resources.length === 0 ? (
                          <p className="text-xs text-slate-500">No resources added.</p>
                        ) : (
                          <div className="space-y-2">
                            {lesson.resources.map((resource, resourceIndex) => (
                              <div key={resourceIndex} className="rounded-lg border border-slate-200 bg-white p-3">
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                  <Input
                                    value={resource.title}
                                    onChange={(event) =>
                                      updateResourceField(lessonIndex, resourceIndex, "title", event.target.value)
                                    }
                                    placeholder="Resource title"
                                    className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
                                  />
                                  <Input
                                    value={resource.url}
                                    onChange={(event) =>
                                      updateResourceField(lessonIndex, resourceIndex, "url", event.target.value)
                                    }
                                    placeholder="https://..."
                                    className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
                                  />
                                  <Input
                                    value={resource.type}
                                    onChange={(event) =>
                                      updateResourceField(lessonIndex, resourceIndex, "type", event.target.value)
                                    }
                                    placeholder="pdf, link, video..."
                                    className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
                                  />
                                </div>
                                <div className="mt-2 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => removeResource(lessonIndex, resourceIndex)}
                                    className="text-xs font-medium text-red-600 hover:text-red-700"
                                  >
                                    Remove resource
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          Attachments (optional, one URL per line)
                        </label>
                        <textarea
                          value={lesson.attachmentsText}
                          onChange={(event) => updateLessonField(lessonIndex, "attachmentsText", event.target.value)}
                          rows={2}
                          className="w-full resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[12px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] focus:outline-none focus:border-[#7300ff] focus:ring-2 focus:ring-[#7300ff]/10"
                          placeholder="https://example.com/file1.pdf"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
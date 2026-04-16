import { useEffect, useState } from "react";
import { MdOutlineArrowBack, MdLayers } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../shared/Button/Index";
import Input from "../../../shared/Input/Index";
import Loading from "../../../components/Loading";
import { courseApi, type LessonResponse } from "../api/courseApi";
import type { CourseCreatePayload, CourseResponse, LessonCreatePayload } from "../types/admin";

type LessonEditDraft = LessonResponse & { isEditing?: boolean };

export default function AdminCourseEditPage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [lessons, setLessons] = useState<LessonEditDraft[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [formData, setFormData] = useState<Partial<CourseCreatePayload>>({});
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    fetchCourseAndLessons();
  }, [courseId]);

  const fetchCourseAndLessons = async () => {
    setLoading(true);
    try {
      if (!courseId) throw new Error("Course ID missing");

      const courseData = await courseApi.getById(courseId);
      setCourse(courseData);
      setFormData({
        title: courseData.courseTitle,
        description: courseData.description,
        category: courseData.category,
        duration: courseData.duration,
        difficulty: courseData.difficulty as "beginner" | "intermediate" | "advanced",
        instructorName: courseData.instructorName,
        instructorBio: courseData.instructorBio,
      });

      const lessonsData = await courseApi.getLessonsByCourse(courseId);
      setLessons(lessonsData);
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Failed to load course details");
    } finally {
      setLoading(false);
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

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSaveCourse = async () => {
    if (!courseId || !course) return;

    if (!formData.title?.trim()) {
      toast.error("Course title is required");
      return;
    }

    if (!formData.description?.trim()) {
      toast.error("Course description is required");
      return;
    }

    setSaving(true);
    try {
      const payload: CourseCreatePayload = {
        title: formData.title || "",
        description: formData.description || "",
        category: formData.category,
        duration: formData.duration,
        difficulty: formData.difficulty as "beginner" | "intermediate" | "advanced",
        instructorName: formData.instructorName,
        instructorBio: formData.instructorBio,
        ...(thumbnail && { thumbnail }),
      };

      const updated = await courseApi.update(courseId, payload);
      setCourse(updated);
      setThumbnail(null);
      toast.success("Course updated successfully");
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!courseId) return;

    setSaving(true);
    try {
      const updated = await courseApi.publish(courseId);
      setCourse(updated);
      toast.success("Course published successfully");
    } catch (error) {
      console.error("Error publishing course:", error);
      toast.error("Failed to publish course");
    } finally {
      setSaving(false);
    }
  };

  const handleUnpublish = async () => {
    if (!courseId) return;

    setSaving(true);
    try {
      const updated = await courseApi.unpublish(courseId);
      setCourse(updated);
      toast.success("Course unpublished successfully");
    } catch (error) {
      console.error("Error unpublishing course:", error);
      toast.error("Failed to unpublish course");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!courseId || !window.confirm("Delete this course and all lessons? This cannot be undone.")) return;

    setSaving(true);
    try {
      await courseApi.delete(courseId);
      toast.success("Course deleted successfully");
      navigate("/learnflow/admin/dashboard");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!window.confirm("Delete this lesson?")) return;

    try {
      await courseApi.deleteLesson(lessonId);
      toast.success("Lesson deleted successfully");
      setLessons((prev) => prev.filter((l) => l.lessonId !== lessonId));
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("Failed to delete lesson");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl pt-6">
        <p className="text-sm text-red-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate("/learnflow/admin/dashboard")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-violet-500 transition-colors hover:text-violet-600"
        >
          <MdOutlineArrowBack className="h-4 w-4" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Edit Course</h1>
        <p className="mt-2 text-sm text-slate-500">Manage course details and lessons</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Course Details</h2>

        {course.courseImg && (
          <div className="mb-6">
            <img src={course.courseImg} alt={course.courseTitle} className="h-40 w-full rounded-lg object-cover" />
          </div>
        )}

        <label htmlFor="course-thumbnail" className="mb-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition-colors hover:border-violet-400">
          <MdLayers className="h-10 w-10 text-slate-500" />
          <p className="mt-4 text-lg font-medium text-slate-800">
            {thumbnail ? thumbnail.name : "Change course cover image"}
          </p>
          <p className="mt-2 text-sm text-slate-500">or drag and drop</p>
        </label>
        <input
          id="course-thumbnail"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleThumbnailChange}
        />

        <div className="space-y-5">
          <div>
            <label className="text-lg font-medium text-slate-800">Course Title *</label>
            <Input
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              placeholder="Enter course title"
              className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-slate-800">Instructor Name</label>
            <Input
              name="instructorName"
              value={formData.instructorName || ""}
              onChange={handleInputChange}
              placeholder="Enter instructor name"
              className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-slate-800">Instructor Bio</label>
            <textarea
              name="instructorBio"
              value={formData.instructorBio || ""}
              onChange={handleInputChange}
              placeholder="Brief biography of the instructor"
              rows={3}
              className="w-full resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] focus:outline-none focus:border-[#7300ff] focus:ring-2 focus:ring-[#7300ff]/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-lg font-medium text-slate-800">Category</label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleInputChange}
                className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] focus:outline-none focus:border-[#7300ff] focus:ring-2 focus:ring-[#7300ff]/10"
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
                value={formData.difficulty || "beginner"}
                onChange={handleInputChange}
                className="w-full rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out hover:border-[#667085] focus:outline-none focus:border-[#7300ff] focus:ring-2 focus:ring-[#7300ff]/10"
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
              value={formData.duration || 0}
              onChange={handleInputChange}
              placeholder="Enter course duration in hours"
              className="[&_input]:bg-white [&_input]:hover:bg-white [&_input]:focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-slate-800">Course Description *</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Write brief description of the course"
              rows={4}
              className="w-full overflow-hidden resize-none rounded-[15px] border border-[#98a2b3] bg-white px-[17px] py-[14px] text-sm text-[#011a2a] transition-all duration-200 ease-in-out placeholder:text-[#727a86] hover:border-[#667085] focus:outline-none focus:border-[#7300ff] focus:ring-2 focus:ring-[#7300ff]/10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${course.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
              {course.status === "published" ? "Published" : "Draft"}
            </span>
            <Button
              label="Save Changes"
              onClick={handleSaveCourse}
              disabled={saving}
              className="rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50"
            />
            {course.status === "draft" && (
              <Button
                label={saving ? "Publishing..." : "Publish"}
                onClick={handlePublish}
                disabled={saving}
                className="rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
              />
            )}
            {course.status === "published" && (
              <Button
                label={saving ? "Unpublishing..." : "Unpublish"}
                onClick={handleUnpublish}
                disabled={saving}
                className="rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors disabled:opacity-50"
              />
            )}
            <Button
              label={saving ? "Deleting..." : "Delete Course"}
              onClick={handleDeleteCourse}
              disabled={saving}
              className="rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">Lessons ({lessons.length})</h2>
          <Button
            label="+ Add Lesson"
            onClick={() => setShowLessonModal(true)}
            className="rounded-lg bg-violet-500 text-white hover:bg-violet-600"
          />
        </div>

        {lessons.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-slate-500">
            No lessons added yet. Click "Add Lesson" to add lessons to this course.
          </p>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <div key={lesson.lessonId} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{lesson.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{lesson.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                    <span>{lesson.duration} min</span>
                    {lesson.isPreviewable && <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">Previewable</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    label="Delete"
                    onClick={() => handleDeleteLesson(lesson.lessonId)}
                    className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

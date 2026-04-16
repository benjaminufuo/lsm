import { api } from "../../../lib/api";
import { store } from "../../../global/store";
import type {
  CourseResponse,
  CourseCreatePayload,
  CourseUpdatePayload,
  LessonCreatePayload,
} from "../types/admin";

type LessonApi = {
  _id?: string;
  lessonId?: string;
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  duration?: number;
  order?: number;
  isPreviewable?: boolean;
  course?: string;
  attachments?: unknown[];
  createdAt?: string;
  updatedAt?: string;
};

export type LessonResponse = {
  lessonId: string;
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  duration: number;
  order: number;
  isPreviewable: boolean;
  course: string;
  attachments: unknown[];
  createdAt: string;
  updatedAt: string;
};

const mapLesson = (lesson: LessonApi): LessonResponse => ({
  lessonId: lesson.lessonId || lesson._id || lesson.id || "",
  title: lesson.title || "",
  description: lesson.description || "",
  content: lesson.content || "",
  videoUrl: lesson.videoUrl || "",
  duration: lesson.duration || 0,
  order: lesson.order || 0,
  isPreviewable: lesson.isPreviewable || false,
  course: lesson.course || "",
  attachments: lesson.attachments || [],
  createdAt: lesson.createdAt || "",
  updatedAt: lesson.updatedAt || "",
});

type CourseListApi = {
  id?: string;
  _id?: string;
  courseId?: string;
  name?: string;
  title?: string;
  courseTitle?: string;
  description?: string;
  category?: string;
  instructorName?: string;
  instructorBio?: string;
  createdBy?: string;
  courseImg?: string;
  difficulty?: string;
  duration?: number;
  status?: "draft" | "published";
  lessons?: string[];
  enrollmentCount?: number;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
};

const mapCourse = (course: CourseListApi): CourseResponse => ({
  courseId: course.courseId || course._id || course.id || "",
  courseTitle: course.courseTitle || course.title || course.name || "",
  description: course.description || "",
  category: course.category || "",
  instructorName: course.instructorName || "",
  instructorBio: course.instructorBio || "",
  createdBy: course.createdBy || "",
  courseImg: course.courseImg || "",
  difficulty: course.difficulty || "beginner",
  duration: course.duration || 0,
  status: course.status || "draft",
  lessons: course.lessons || [],
  enrollmentCount: course.enrollmentCount || 0,
  rating: course.rating || 0,
  createdAt: course.createdAt || "",
  updatedAt: course.updatedAt || "",
});

const getCoursesFromData = (data: unknown): CourseListApi[] => {
  if (Array.isArray(data)) return data as CourseListApi[];
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.courses)) return record.courses as CourseListApi[];
    if (Array.isArray(record.items)) return record.items as CourseListApi[];
    if (Array.isArray(record.results)) return record.results as CourseListApi[];
    if (Array.isArray(record.docs)) return record.docs as CourseListApi[];
    if (record.data && Array.isArray(record.data)) return record.data as CourseListApi[];
    if (record.data && typeof record.data === "object") {
      const nested = record.data as Record<string, unknown>;
      if (Array.isArray(nested.courses)) return nested.courses as CourseListApi[];
      if (Array.isArray(nested.items)) return nested.items as CourseListApi[];
      if (Array.isArray(nested.results)) return nested.results as CourseListApi[];
      if (Array.isArray(nested.docs)) return nested.docs as CourseListApi[];
    }
  }
  return [];
};

const getAuthConfig = () => {
  const token = store.getState().learnFlow.userToken;
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const courseApi = {
  // Create new course
  create: async (payload: CourseCreatePayload): Promise<CourseResponse> => {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    if (payload.category) formData.append("category", payload.category);
    if (payload.duration) formData.append("duration", payload.duration.toString());
    if (payload.difficulty) formData.append("difficulty", payload.difficulty);
    if (payload.instructorName) formData.append("instructorName", payload.instructorName);
    if (payload.instructorBio) formData.append("instructorBio", payload.instructorBio);
    if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail);

    const token = store.getState().learnFlow.userToken;
    const response = await api.post<{ success: boolean; data: CourseResponse }>("/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.data.data;
  },

  // Get all courses
  getAll: async (): Promise<CourseResponse[]> => {
    const response = await api.get<{ success?: boolean; data?: unknown; courses?: unknown[] }>("/admin/courses", getAuthConfig());
    const payload = response.data.data ?? response.data;
    return getCoursesFromData(payload).map(mapCourse);
  },

  // Get course by ID
  getById: async (courseId: string): Promise<CourseResponse> => {
    const response = await api.get<{ success: boolean; data: CourseResponse }>(`/courses/${courseId}`, getAuthConfig());
    return response.data.data;
  },

  // Update course
  update: async (courseId: string, payload: CourseUpdatePayload): Promise<CourseResponse> => {
    const formData = new FormData();
    if (payload.title) formData.append("title", payload.title);
    if (payload.description) formData.append("description", payload.description);
    if (payload.category) formData.append("category", payload.category);
    if (payload.duration) formData.append("duration", payload.duration.toString());
    if (payload.difficulty) formData.append("difficulty", payload.difficulty);
    if (payload.instructorName) formData.append("instructorName", payload.instructorName);
    if (payload.instructorBio) formData.append("instructorBio", payload.instructorBio);
    if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail);

    const token = store.getState().learnFlow.userToken;
    const response = await api.put<{ success: boolean; data: CourseResponse }>(
      `/courses/${courseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.data.data;
  },

  // Delete course
  delete: async (courseId: string): Promise<void> => {
    await api.delete(`/courses/${courseId}`, getAuthConfig());
  },

  // Publish course
  publish: async (courseId: string): Promise<CourseResponse> => {
    const response = await api.post<{ success: boolean; data: CourseResponse }>(`/courses/${courseId}/publish`, undefined, getAuthConfig());
    return response.data.data;
  },

  // Unpublish course
  unpublish: async (courseId: string): Promise<CourseResponse> => {
    const response = await api.post<{ success: boolean; data: CourseResponse }>(`/courses/${courseId}/unpublish`, undefined, getAuthConfig());
    return response.data.data;
  },

  // Create lesson for a course
  createLesson: async (courseId: string, payload: LessonCreatePayload) => {
    const response = await api.post(
      `/courses/${courseId}/lessons`,
      payload,
      getAuthConfig(),
    );
    return response.data;
  },

  // Get all lessons for a course
  getLessonsByCourse: async (courseId: string): Promise<LessonResponse[]> => {
    const response = await api.get<{ success?: boolean; data?: unknown; lessons?: unknown[] }>(
      `/courses/${courseId}/lessons`,
      getAuthConfig(),
    );
    const payload = response.data.data ?? response.data;

    let lessons: LessonApi[] = [];
    if (Array.isArray(payload)) {
      lessons = payload as LessonApi[];
    } else if (payload && typeof payload === "object") {
      const record = payload as Record<string, unknown>;
      if (Array.isArray(record.lessons)) lessons = record.lessons as LessonApi[];
      else if (Array.isArray(record.items)) lessons = record.items as LessonApi[];
      else if (Array.isArray(record.results)) lessons = record.results as LessonApi[];
      else if (Array.isArray(record.docs)) lessons = record.docs as LessonApi[];
    }

    return lessons.map(mapLesson);
  },

  // Get lesson by ID
  getLessonById: async (lessonId: string): Promise<LessonResponse> => {
    const response = await api.get<{ success: boolean; data: LessonApi }>(
      `/lesson/${lessonId}`,
      getAuthConfig(),
    );
    return mapLesson(response.data.data);
  },

  // Update lesson
  updateLesson: async (lessonId: string, payload: Partial<LessonCreatePayload>): Promise<LessonResponse> => {
    const response = await api.put<{ success: boolean; data: LessonApi }>(
      `/lesson/${lessonId}`,
      payload,
      getAuthConfig(),
    );
    return mapLesson(response.data.data);
  },

  // Delete lesson
  deleteLesson: async (lessonId: string): Promise<void> => {
    await api.delete(`/lesson/${lessonId}`, getAuthConfig());
  },
};

import { apiFetch } from "./api";

export interface ActiveEnrolledCourseData {
  courseId: string;
  courseTitle: string;
  courseImg: string;
  instructorName: string;
  duration: string;
  enrollmentCount: number;
  rating: number;
  category: string;
  difficulty: string;
  progress: number;
  status: string;
  enrollmentDate: string;
  enrollmentId: string;
}

export interface ActiveEnrolledCourse {
  success: string;
  message: string;
  data: ActiveEnrolledCourseData[];
}

export interface Assignment {
  success: string;
  message: string;
  data: ActiveEnrolledCourseData[];
}

export interface UserProps {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatar: string;
  token: string;
}

export const getActiveEnrolledCourse = async (token: string) => {
  return apiFetch<ActiveEnrolledCourse>(
    "/api/enrollments/my-courses?status=active",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEnrolledCourse = async (token: string) => {
  return apiFetch<ActiveEnrolledCourse>(
    "/api/enrollments/my-courses",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAssignments = async (token: string) => {
  return apiFetch<Assignment>(
    "/api/assignments?page=1&limit=20",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
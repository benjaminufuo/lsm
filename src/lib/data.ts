import api from "./api";

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

export const getActiveEnrolledCourse = async () => {
  const response = await api.get<ActiveEnrolledCourse>(
    "enrollments/my-courses?status=active",
  );
  return response.data;
};

export const getEnrolledCourse = async () => {
  const response = await api.get<ActiveEnrolledCourse>(
    "enrollments/my-courses",
  );
  return response.data;
};

export const getAssignments = async () => {
  const response = await api.get<Assignment>("assignments?page=1&limit=20");
  return response.data;
};

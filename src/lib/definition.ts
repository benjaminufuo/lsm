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
  _id: string;
  fullName: string;
  email: string;
  role: string;
  avatar: string;
  token: string;
}

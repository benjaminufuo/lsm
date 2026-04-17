export interface CourseCardType {
  courseId: string;
  courseTitle: string;
  description: string;
  duration: number;
  progress: string;
  courseImg: string;
  rating: number;
  instructorName: string;
  enrollmentCount: string;
}

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
}

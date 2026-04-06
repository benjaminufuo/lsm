export interface CourseCardType {
  id: string;
  courseImage?: string;
  courseTitle: string;
  courseDescription?: string;
  lessonCount?: string;
  instructor: { name: string; description: string; image: string };
  timeDetail: string;
  peopleDetail: string;
  ratingDetail: string;
  courseProgress: string;
}

export interface TopicList {
  title: string;
  timeDetail: string;
}

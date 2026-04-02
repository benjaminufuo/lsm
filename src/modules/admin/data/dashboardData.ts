import reactCourseImg from "../../../assets/course-react.jpg";
import uiuxCourseImg from "../../../assets/course-uiux.jpg";
import researchAssignmentImg from "../../../assets/assignment-uiux.jpg";
import reactAssignmentImg from "../../../assets/assignment-react.jpg";
import type { Assignment, Course } from "../types/admin";

export const recentCourses: Course[] = [
  {
    id: "1",
    title: "Advanced React Development",
    instructor: "Dr. Nimmi Mike",
    progress: 100,
    status: "Published",
    image: reactCourseImg,
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    instructor: "Dr. Nimmi Mike",
    progress: 90,
    status: "Published",
    image: uiuxCourseImg,
  },
];

export const recentAssignments: Assignment[] = [
  {
    id: "1",
    title: "User Research Report",
    course: "UI/UX Design Fundamentals",
    dueDate: "Apr 17, 2026",
    image: researchAssignmentImg,
  },
  {
    id: "2",
    title: "React Component Architecture",
    course: "Advanced React Development",
    dueDate: "Apr 17, 2026",
    image: reactAssignmentImg,
  },
];
import type { Assignment, Course } from "../types/admin";
import type {
  AdminDashboardAssignment,
  AdminDashboardCourse,
} from "../types/dashboard";

const COURSE_FALLBACK_IMAGE =
  "https://via.placeholder.com/150?text=Course";

const ASSIGNMENT_FALLBACK_IMAGE =
  "https://via.placeholder.com/150?text=Assignment";

export function mapDashboardCourseToCourse(course: AdminDashboardCourse): Course {
  return {
    id: course._id,
    title: course.category || "Untitled Course",
    instructor: course.instructor || "No instructor",
    progress: course.status === "published" ? 100 : 0,
    status: course.status || "unknown",
    image: course.thumbnail?.trim() ? course.thumbnail : COURSE_FALLBACK_IMAGE,
  };
}

export function mapDashboardAssignmentToAssignment(
  assignment: AdminDashboardAssignment
): Assignment {
  return {
    id: assignment._id,
    title: assignment.title || "Untitled Assignment",
    course: assignment.course || "Unknown Course",
    dueDate: assignment.dueDate || "No due date",
    image: assignment.image?.trim()
      ? assignment.image
      : ASSIGNMENT_FALLBACK_IMAGE,
  };
}
import type { Assignment, Course } from "../types/admin";
import type {
  AdminDashboardAssignment,
  AdminDashboardCourse,
} from "../types/dashboard";

type MappableDashboardCourse = Omit<AdminDashboardCourse, "instructor"> & {
  courseId?: string;
  courseTitle?: string;
  title?: string;
  courseImg?: string;
  thumbnail?: string;
  instructorName?: string;
  instructor?:
    | string
    | {
        name?: string;
        fullName?: string;
      }
    | null;
};

type MappableDashboardAssignment = Omit<AdminDashboardAssignment, "course"> & {
  image?: string;
  course?:
    | string
    | {
        title?: string;
        thumbnail?: string;
      };
};

const COURSE_FALLBACK_IMAGE = "https://via.placeholder.com/150?text=Course";

const ASSIGNMENT_FALLBACK_IMAGE =
  "https://via.placeholder.com/150?text=Assignment";

export function mapDashboardCourseToCourse(
  course: AdminDashboardCourse,
): Course {
  const c: MappableDashboardCourse = course;

  // Defensively handle cases where the backend populates the instructor object
  const instructorName =
    c.instructorName ||
    (typeof c.instructor === "object" && c.instructor !== null
      ? c.instructor.name || c.instructor.fullName
      : c.instructor);

  return {
    id: c.courseId || c._id || "",
    title: c.courseTitle || c.title || c.category || "Untitled Course",
    instructor: instructorName || "No instructor",
    progress: c.status === "published" ? 100 : 0,
    status: c.status || "unknown",
    image: c.courseImg?.trim()
      ? c.courseImg
      : c.thumbnail?.trim()
        ? c.thumbnail
        : COURSE_FALLBACK_IMAGE,
  };
}

export function mapDashboardAssignmentToAssignment(
  assignment: AdminDashboardAssignment,
): Assignment {
  const a: MappableDashboardAssignment = assignment;

  // Extract the title if the backend populated the course object
  const courseTitle =
    typeof a.course === "object" && a.course !== null
      ? a.course.title
      : a.course;

  const courseThumbnail =
    typeof a.course === "object" && a.course !== null
      ? a.course.thumbnail
      : null;

  // Format date to look nicer if possible
  let formattedDate = a.dueDate || "No due date";
  if (a.dueDate) {
    const dateObj = new Date(a.dueDate);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }

  return {
    id: a._id || "",
    title: a.title || "Untitled Assignment",
    course: courseTitle || "Unknown Course",
    dueDate: formattedDate,
    image: a.image?.trim()
      ? a.image
      : courseThumbnail?.trim()
        ? courseThumbnail
        : ASSIGNMENT_FALLBACK_IMAGE,
  };
}

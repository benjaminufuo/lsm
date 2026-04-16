// src/modules/admin/types/admin.ts
import type { IconType } from "react-icons";

export type AdminNavItem = {
  label: string;
  path: string;
  icon: IconType;
};

// Course types matching backend schema
export type CourseResponse = {
  courseId: string;
  courseTitle: string;
  description: string;
  category: string;
  instructorName: string;
  instructorBio: string;
  createdBy: string;
  courseImg: string;
  difficulty: string;
  duration: number;
  status: "draft" | "published";
  lessons: string[];
  enrollmentCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseCreatePayload = {
  title: string;
  description: string;
  category?: string;
  duration?: number;
  difficulty?: string;
  instructorName?: string;
  instructorBio?: string;
  thumbnail?: File;
};

export type CourseUpdatePayload = Partial<CourseCreatePayload>;

export type LessonResourcePayload = {
  title: string;
  url: string;
  type: string;
};

export type LessonCreatePayload = {
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  duration: number;
  isPreviewable?: boolean;
  resources?: string;
  attachments?: string[];
};

export type Course = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  status: string;
  image: string;
};

// Assignment types
export type AssignmentResponse = {
  assignmentId: string;
  title: string;
  description: string;
  course: string;
  dueDate: string;
  totalMarks?: number;
  attachment?: string;
  createdAt: string;
  updatedAt: string;
};

export type AssignmentCreatePayload = {
  title: string;
  description: string;
  course: string;
  dueDate: string;
  totalMarks?: number;
  attachment?: File;
};

export type AssignmentUpdatePayload = Partial<AssignmentCreatePayload>;

export type Assignment = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  image: string;
};

// User types
export type UserTab = "students" | "admins";

export type StudentUser = {
  id: string;
  name: string;
  role: string;
  enrolledCourse: string;
  progress: number;
  joined: string;
  avatar: string;
};

export type AdminUser = {
  id: string;
  name: string;
  role: string;
  email: string;
  joined: string;
  avatar: string;
};

export type UserCreatePayload = {
  name: string;
  email: string;
  role: "student" | "admin";
};

export type UserProfile = {
  _id: string;
  fullName: string;
  email: string;
  role: "student" | "admin";
  avatar: string;
  bio: string;
  location: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
};

// src/modules/admin/types/admin.ts
import type { IconType } from "react-icons";

export type AdminNavItem = {
  label: string;
  path: string;
  icon: IconType;
};

export type Course = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  status: string;
  image: string;
};

export type Assignment = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  image: string;
};

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
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
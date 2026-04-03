import type { NavItemType } from "../data/types";
import ProfileIcon from '../assets/icons/profile.svg?react'
import DashBoardIIcon from '../assets/icons/dashboard.svg?react'
import AssignmentIcon from '../assets/icons/assignment.svg?react'
import CourseIcon from '../assets/icons/course.svg?react'


export const navItems: NavItemType[] = [
  { name: "Dashboard", path: "/learnflow/dashboard", icon: DashBoardIIcon },
  { name: "Courses", path: "/learnflow/courses",  icon: CourseIcon },
  { name: "Assignments", path: "/learnflow/assignments", icon:AssignmentIcon },
  { name: "Profile", path: "/learnflow/profile", icon: ProfileIcon },
];
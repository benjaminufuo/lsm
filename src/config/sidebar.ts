import { LuLayoutDashboard } from "react-icons/lu";
import type { NavItemType } from "../data/types";
import { PiBookOpenThin } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

export const navItems: NavItemType[] = [
  { name: "Dashboard", path: "/learnflow/dashboard", icon: LuLayoutDashboard },
  { name: "Courses", path: "/learnflow/courses",  icon: PiBookOpenThin },
  { name: "Assignments", path: "/learnflow/assignments", icon:IoDocumentTextOutline },
  { name: "Profile", path: "/learnflow/profile", icon: MdOutlineAccountCircle },
];
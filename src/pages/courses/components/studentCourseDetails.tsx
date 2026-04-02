import { NavLink } from "react-router-dom";
import type { CourseDetailButton } from "../types/type";

interface Props {
  btn: CourseDetailButton;
}

const CourseDetailItem = ({ btn }: Props) => {
  return (
    <NavLink
      to={btn.path}
      className={({ isActive }) =>
        `
          transition-all duration-200 flex items-center justify-center px-20 py-1 
          ${
            isActive
              ? "text-white bg-primary rounded-2xl"
              : "text-[#64748B] hover:bg-primary/20 rounded-2xl"
          }`
      }
    >
      <span className="text-[14px]">{btn.name}</span>
    </NavLink>
  );
};

export default CourseDetailItem;

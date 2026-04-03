import { LuGraduationCap } from "react-icons/lu";
import { navItems } from "../config/sidebar";
import { cn } from "../lib/utils";
import SideItems from "./sideitems";
import type { IconType } from "react-icons";

const SideBar = () => {
  const Icon = LuGraduationCap as IconType;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen z-40 bg-white group",
        "flex flex-col",
        "transition-all duration-300 ease-in-out",
        "w-16",
        "md:w-16 md:hover:w-44",
        "lg:w-44",
      )}
    >
      <div className="flex flex-col w-full px-2">
        <div className="flex items-center gap-2 border-b border-[#64748B] py-4 my-6">
          <div className="bg-primary text-white p-2 rounded-2xl shrink-0">
            <Icon size={20} />
          </div>

          <h2
            className="
              text-xl text-black whitespace-nowrap overflow-hidden
              transition-all duration-200
              
              w-0 opacity-0
              md:w-0 md:opacity-0
              md:group-hover:w-auto md:group-hover:opacity-100

              lg:w-auto lg:opacity-100 
            "
          >
            LearnFlow
          </h2>
        </div>
        {navItems.map((item) => (
          <SideItems key={item.path} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;

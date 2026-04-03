import { navItems } from "../config/sidebar";
import { cn } from "../lib/utils";
import SideItems from "./sideitems";
import LogoIcon from "../assets/icons/logo.svg?react";
import LearnFlowIcon from "../assets/icons/learnflow.svg?react";

const SideBar = () => {

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen z-40 bg-white group",
        "hidden md:flex flex-col",
        "transition-all duration-300 ease-in-out",
        "w-16",
        "md:w-16 md:hover:w-52",
        "lg:w-52",
      )}
    >
      <div className="flex flex-col w-full px-2">
        <div className="flex items-center gap-2 border-b-2 border-[#64748B] my-4 py-4">
          <div className="flex flex-row items-center justify-between gap-2 text-white px-2 rounded-2xl shrink-0 overflow-hidden">
            <LogoIcon />
            <div className="
              text-xl text-black whitespace-nowrap overflow-hidden
              transition-all duration-200
              
              w-0 opacity-0
              md:w-0 md:opacity-0
              md:group-hover:w-auto md:group-hover:opacity-100

              lg:w-auto lg:opacity-100
            ">
              <LearnFlowIcon />
            </div>
          </div>

        </div>
        {navItems.map((item) => (
          <SideItems key={item.path} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;

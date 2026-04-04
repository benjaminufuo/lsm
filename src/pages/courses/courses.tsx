import CoursesCard from "./components/coursesCard";
import filterIcon from "../../assets/filter-icon-svg.svg";
import { Outlet } from "react-router-dom";

const Cousrse = () => {
  return (
    <div className="pb-8">
      <div className="">
        {" "}
        <h1 className="text-[24px] text-[#0A2540] font-bold mb-2">
          My Courses
        </h1>
        <p className="text-[18px] text-[#64748B]">
          continue learning and track your progress
        </p>
        {/* Search Courses */}
        <div className="flex items-center justify-between gap-4 mt-3 w-[96%]">
          <input
            className="text-[14px] bg-white border-2 border-[#E2E8F0] focus:outline-none rounded-[10px] pl-[44px] pr-[16px] py-2 w-full"
            placeholder="Search courses..."
            type="search"
          />
          <div className="bg-[#E5E5E5E5] border border-[#E2E8F0] px-4 py-2 rounded-[10px] flex items-center justify-center gap-2">
            <img className="w-[16px]" src={filterIcon} alt="filter icon" />
            <span className="text-[#64748B] text-[14px] font-medium">
              Filter
            </span>
          </div>
        </div>
      </div>
      <CoursesCard />
      <Outlet />
    </div>
  );
};

export default Cousrse;

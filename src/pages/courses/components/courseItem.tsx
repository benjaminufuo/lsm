import type { CourseCardType } from "../types/type";
import { Link } from "react-router-dom";
import dot from "../../../assets/TFStatusBadge.png";
import timeIcon from "../../../assets/clock-icon-svg.svg";
import peopleIcon from "../../../assets/people-icon-svg.svg";
import ratingIcon from "../../../assets/rating-icon-svg.svg";
import { MdDelete } from "react-icons/md";
interface Props {
  item: CourseCardType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CourseItem = ({ item, onClick }: Props) => {
  return (
    <Link
      key={item.courseId}
      to={item.courseId}
      className="bg-[#F1f5f9] p-4 text-[#0A2540] group"
    >
      {/* Image */}
      <div className="relative w-full h-[180px] rounded-[8px]">
        <img
          className="w-full h-full object-cover rounded-[8px]"
          src={item.courseImg}
          alt={`Img`}
        />
        <div className="absolute top-6 right-6 text-[#7B61FF] text-[14px] rounded-[6px] border border-[#A5B4FC] py-1 px-3 bg-[#E0E7FF] flex items-center justify-between gap-1">
          <img className="" src={dot} alt="In progress" />
          In Progress
        </div>
        <button
          className="absolute bottom-6 right-6 text-white border-2 border-white/30 lg:opacity-0 lg:invisible group-hover:opacity-100 group-hover:visible cursor-pointer transition-all delay-75 duration-250 bg-[#F1F5F9]/20 lg:hover:bg-[#F1f5f9]/90 active:bg-[#F1f5f9] p-1 lg:p-1 rounded-lg"
          data-id={item.courseId}
          onClick={onClick}
          title="Drop Course"
        >
          <MdDelete className="text-red-500 text-[20px]" />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[18px]  mt-2 ">{item.courseTitle}</h3>

      {/* Tutor Name */}
      <span className="text-[14px]">{item.instructorName}</span>

      {/* extra details */}
      <div className="text-[14px] flex items-center justify-between my-2">
        <div className="flex items-center justify-center gap-1">
          <img src={timeIcon} alt="time-icon" />
          {item.duration} hours
        </div>
        <div className="flex items-center justify-center gap-1">
          <img src={peopleIcon} alt="people-icon" />
          {item.enrollmentCount}
        </div>
        <div className="flex items-center justify-center gap-1">
          <img src={ratingIcon} alt="rating-icon" />
          {item.rating}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-2 text-[14px]">
        <span>Progress</span>
        <span className="font-medium">{item.progress.toString()}%</span>
      </div>

      {/* Progress bar */}
      <div className="bg-white h-2">
        <div
          className={`bg-[#7B61FF] h-full `}
          style={{ width: `${item.progress}%` }}
        ></div>
      </div>
    </Link>
  );
};

export default CourseItem;

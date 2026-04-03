import type { CourseCardType } from "../types/type";
import { Link } from "react-router-dom";
import dot from "../../../assets/TFStatusBadge.png";
import timeIcon from "../../../assets/clock-icon-svg.svg";
import peopleIcon from "../../../assets/people-icon-svg.svg";
import ratingIcon from "../../../assets/rating-icon-svg.svg";

interface Props {
  item: CourseCardType;
}

const CourseItem = ({ item }: Props) => {
  return (
    <Link to={item.id} className="bg-[#E5E5E5] p-4 text-[#0A2540]">
      {/* Image */}
      <div className="relative w-full h-[180px] rounded-[8px]">
        <img
          className="w-full h-full object-cover rounded-[8px]"
          src={item.courseImage}
          alt={`${item.courseTitle}-Img`}
        />
        <div className="absolute top-6 right-6 text-[#7B61FF] text-[14px] rounded-[6px] border border-[#A5B4FC] py-1 px-3 bg-[#E0E7FF] flex items-center justify-between gap-1">
          <img className="" src={dot} alt="In progress" />
          In Progress
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[18px]  mt-2 ">{item.courseTitle}</h3>

      {/* Tutor Name */}
      <span className="text-[14px]">{item.instructor.name}</span>

      {/* extra details */}
      <div className="text-[14px] flex items-center justify-between my-2">
        <div className="flex items-center justify-center gap-1">
          <img src={timeIcon} alt="time-icon" />
          {item.timeDetail}
        </div>
        <div className="flex items-center justify-center gap-1">
          <img src={peopleIcon} alt="people-icon" />
          {item.peopleDetail}
        </div>
        <div className="flex items-center justify-center gap-1">
          <img src={ratingIcon} alt="rating-icon" />
          {item.ratingDetail}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-2 text-[14px]">
        <span>Progress</span>
        <span className="font-medium">{item.courseProgress}</span>
      </div>

      {/* Progress bar */}
      <div className="bg-white h-2">
        <div
          className={`bg-[#7B61FF] h-full `}
          style={{ width: item.courseProgress }}
        ></div>
      </div>
    </Link>
  );
};

export default CourseItem;

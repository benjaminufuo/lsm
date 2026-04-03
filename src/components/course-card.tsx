import type { CourseCardProps } from "../data/types";
import CalenderIcon from "../assets/icons/calendar.svg?react";

const CousrseCard = ({
  imageUrl,
  title,
  description,
  instructor,
  progress,
  percentage,
}: CourseCardProps) => {
  return (
    <div className="flex flex-row bg-white px-2.5 py-4 rounded-2xl gap-6.5">
      <div className="w-32 h-30 md:w-48 md:h-38">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="flex flex-1 flex-col items-start justify-between h-11/12">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center justify-between ">
            <h2 className="md:text-lg font-semibold ">{title}</h2>
            <span className="text-black bg-[#F5F7FAE5] py-1 px-3.5 rounded-2xl font-medium">
              {percentage}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-1">{instructor}</p>
        </div>

        {/* <div className={`w-[${progress}] bg-primary h-4`} /> */}
        <div className="my-3 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-linear-to-r from-violet-500 to-indigo-500"
            style={{ width: `${progress}px` }}
          />
        </div>

        <div className=" flex flex-row gap-3">
          <CalenderIcon />
          <span className="text-gray-500 text-xs ml-1">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default CousrseCard;

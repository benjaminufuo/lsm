import type { Lesson } from "../types/type";
import timeIcon from "../../../assets/clock-icon-svg.svg";
import tickIcon from "../../../assets/tick-icon.svg";
import { PiCheckCircleFill, PiCheckCircle } from "react-icons/pi";

interface Props {
  item: Lesson;
  onSelect: () => void;
  isActive: Boolean;
}

const TopicItem = ({ item, onSelect, isActive }: Props) => {
  return (
    <div
      onClick={onSelect}
      className={` ${isActive ? "border-l-4 border-l-primary border-b border-b-primary text-[#0A2540]" : ""} hover:border-l-4 hover:border-l-primary hover:pl-3 hover:border-b-primary  border-b py-5 pl-2 text-[#64748B] flex gap-3 transition-all duration-100 delay-75 cursor-pointer`}
    >
      <PiCheckCircle className="" size={18} />
      {/* <div
        className={` w-[16px] h-[16px] rounded-full border-[1.9px] border-[#64748B] flex items-center justify-center mt-1 lg:mt-0`}
      >
        <img src={tickIcon} alt="tick-icon" />
      </div> */}
      {/* <PiCheckCircleFill size={18} /> */}
      <div className="pt-0 hover:text-[#0A2540]">
        <p className="leading-none font-medium">{item.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <img className="w-[12px]" src={timeIcon} alt="time-icon" />
          <span className="text-[#64748B] font-medium text-[12px]">
            {item.duration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopicItem;

import type { TopicList } from "../types/type";
// import { NavLink } from "react-router-dom";
import timeIcon from "../../../assets/clock-icon-svg.svg";
import tickIcon from "../../../assets/tick-icon.svg";

interface Props {
  item: TopicList;
}

const TopicItem = ({ item }: Props) => {
  return (
    <div className={`border-b py-5 pl-2 text-[#64748B] flex gap-3`}>
      <div className="w-[16px] h-[16px] rounded-full border-[1.9px] border-[#64748B] flex items-center justify-center">
        <img src={tickIcon} alt="tick-icon" />
      </div>
      <div className="pt-0">
        <p className="leading-none">{item.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <img className="w-[12px]" src={timeIcon} alt="time-icon" />
          <span className="text-[#64748B] font-medium text-[12px]">
            {item.timeDetail}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopicItem;

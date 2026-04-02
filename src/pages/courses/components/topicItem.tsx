import type { TopicList } from "../types/type";
// import { NavLink } from "react-router-dom";
import timeIcon from "../../../assets/clock-icon-svg.svg";

interface Props {
  item: TopicList;
}

const TopicItem = ({ item }: Props) => {
  return (
    <div className={`border-b py-5 pl-4 text-[#64748B]`}>
      <span></span>
      <div>
        <p>{item.title}</p>
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

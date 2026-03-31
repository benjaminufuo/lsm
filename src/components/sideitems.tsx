import { NavLink } from "react-router";
import type { NavItemType } from "../data/types";
import type { IconType } from "react-icons";
import { cn } from "../lib/utils";

interface Props {
  item: NavItemType;
}

const SideItems = ({ item }: Props) => {
  const Icon = item.icon as IconType;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        cn(
          "mb-2.5 py-3 transition-all duration-200 flex items-center",
          "justify-center md:justify-center md:group-hover:justify-start lg:justify-start",
          "px-2 md:group-hover:px-3 lg:px-3",
          isActive
            ? "text-white bg-primary rounded-xl"
            : "text-[#64748B] hover:bg-primary/20 rounded-xl",
        )
      }
    >
      <span className="shrink-0 flex items-center justify-center ml-2 md:ml-0 w-6 h-6">
        <Icon size={20} />
      </span>

      <span
        className="
          ml-3 whitespace-nowrap overflow-hidden
          transition-all duration-200
          
          w-0 opacity-0

          md:w-0 md:opacity-0
          md:group-hover:w-auto md:group-hover:opacity-100

          lg:w-auto lg:opacity-100
        "
      >
        {item.name}
      </span>
    </NavLink>
  );
};

export default SideItems;

import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import type { IconType } from "react-icons";
import TestImage from "../assets/testImg.jpg";

const Header = () => {
  const SearchIcon = IoSearchOutline as IconType;
  const NotificationIcon = IoNotificationsOutline as IconType;
  return (
    <div className="w-19/20 mx-4 my-2.5">
      <div className="flex flex-row items-center justify-between bg-white py-2 px-2">
        <div className="flex flex-row items-center bg-[#F5F7FA] rounded-full w-5/6 md:w-1/2 h-11  px-2 gap-3">
          <SearchIcon size={24} />
          <input
            type="text"
            placeholder="Search courses..."
            className=" w-full bg-transparent focus:outline-none"
          />
        </div>

        <div className="w-3/20">
          <div className="flex flex-row items-center justify-between h-10">
            <NotificationIcon size={24} className="hidden lg:flex" />

            <div className="hidden lg:flex flex-col items-end text-[#4D4D4DE5] text-[14px]">
              <p className="font-semibold">Sarah Mike</p>
              <p>Student</p>
            </div>

            <div className="ml-2 lg:ml-0">
              <div className="w-14 h-14 border-4 border-[#AFB1B6] rounded-full">
                <img
                  src={TestImage}
                  alt="User"
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

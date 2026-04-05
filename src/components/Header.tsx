import {
  IoClose,
  IoNotificationsOutline,
  IoSearchOutline,
} from "react-icons/io5";
import type { IconType } from "react-icons";
import TestImage from "../assets/testImg.jpg";
import LogoIcon from "../assets/icons/logo2.svg?react";
import LearnFlowIcon from "../assets/icons/learnflow2.svg?react";
import HamburgerIcon from "../assets/icons/hamburger.svg?react";
import { useEffect, useState } from "react";
import { navItems } from "../config/sidebar";
import SideItems from "./sideitems";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const SearchIcon = IoSearchOutline as IconType;
  const NotificationIcon = IoNotificationsOutline as IconType;
  const CloseIcon = IoClose as IconType;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div className="md:w-19/20 ">
      <div className="hidden md:flex flex-row items-center justify-between bg-white py-2 px-2">
        <div className="flex flex-row items-center bg-[#F5F7FA] rounded-full w-5/6 md:w-1/2 h-11  px-2 gap-3">
          <SearchIcon size={24} />
          <input
            type="text"
            placeholder="Search courses..."
            className=" w-full bg-transparent focus:outline-none"
          />
        </div>

        <div className=" md:w-5/26 lg:w-3/20">
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

      <div className="flex flex-row items-center justify-between text-white p-2 bg-white md:hidden">
        <div className="flex flex-row items-center gap-2">
          <LogoIcon />
          <div
            className="
              text-xl text-black whitespace-nowrap overflow-hidden
              md:group-hover:w-auto md:group-hover:opacity-100
              lg:w-auto lg:opacity-100
            "
          >
            <LearnFlowIcon />
          </div>
        </div>


        {/* Mobile Search and Hamburger Grouped */}
        <div className="flex flex-row items-center gap-2">
          {showMobileSearch ? (
            <div className="flex flex-row items-center bg-[#F5F7FA] rounded-full w-40 h-9 px-2 gap-2 text-black">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full bg-transparent focus:outline-none"
                autoFocus
              />
              <button onClick={() => setShowMobileSearch(false)}>
                <CloseIcon size={24} />
              </button>
            </div>
          ) : (
            <button
              className="text-black"
              onClick={() => setShowMobileSearch(true)}
              aria-label="Show search"
            >
              <SearchIcon size={24} />
            </button>
          )}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer md:hidden"
          >
            <HamburgerIcon />
          </div>
        </div>

        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Overlay (40%) */}
          <div className="flex w-full h-full ">
            {/* LEFT: Menu (60%) */}
            <div
              className={`w-[60%] md:w-[40%] bg-white h-full transform transition-transform duration-300 flex flex-col justify-between ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <nav
                onClick={() => setIsOpen(false)}
                className="flex flex-col p-6  "
              >
                {navItems.map((item) => (
                  <SideItems key={item.path} item={item} variant="mobile" />
                ))}
              </nav>

              <div className=" mx-4 my-8">
                <button onClick={() => navigate('/signin')} className="flex flex-row items-center justify-center gap-2 p-4 font-light tracking-wider text-[#4D4D4DE5] hover:text-primary cursor-pointer rounded-lg transition-colors duration-200 w-full">
                  <p>Logout</p>
                  <LuLogOut size={20} />
                </button>
                <div className="border border-[#64748B]" />
                <div>
                  <p className="text-[12px] tracking-wide flex justify-center p-4 font-light text-[#4D4D4DE5]">
                    © 2026 TalentFlow
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Overlay (40%) */}
            <div
              className="w-[40%] md:w-[60%] bg-black/60 backdrop-blur-sm relative"
              onClick={() => setIsOpen(false)}
            >
              {/* Cancel Icon */}
              <div className="absolute top-5 right-5 cursor-pointer">
                <CloseIcon size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

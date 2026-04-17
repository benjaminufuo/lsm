import { navItems } from "../config/sidebar";
import { cn } from "../lib/utils";
import SideItems from "./sideitems";
import LogoIcon from "../assets/icons/logo.svg?react";
import LearnFlowIcon from "../assets/icons/learnflow.svg?react";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { persistor } from "../global/store";
import { setUserToken, setUserInfo } from "../global/slice";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Reset user state
    dispatch(setUserToken(""));
    dispatch(
      setUserInfo({
        id: "",
        fullName: "",
        email: "",
        role: "",
        avatar: "",
        token: "",
      }),
    );
    // Purge persisted state
    await persistor.purge();
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };
  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen z-40 bg-white group",
        "hidden md:flex flex-col justify-between",
        "transition-all duration-300 ease-in-out",
        "w-16",
        "md:w-16 md:hover:w-52",
        "lg:w-52",
      )}
    >
      <div className="flex flex-col justify-between w-full px-2">
        <div className="flex items-center gap-2 border-b-2 border-[#64748B] my-4 py-4">
          <div className="flex flex-row items-center justify-between gap-2 text-white px-2 rounded-2xl shrink-0 overflow-hidden">
            <LogoIcon />
            <div
              className="
              text-xl text-black whitespace-nowrap overflow-hidden
              transition-all duration-200
              
              w-0 opacity-0
              md:w-0 md:opacity-0
              md:group-hover:w-auto md:group-hover:opacity-100

              lg:w-auto lg:opacity-100
            "
            >
              <LearnFlowIcon />
            </div>
          </div>
        </div>
        {navItems.map((item) => (
          <SideItems key={item.path} item={item} />
        ))}
      </div>

      {/* <div className="mx-4 my-8">
        <button
          onClick={() => navigate('/signin')}
          className="flex flex-row items-center justify-center gap-2 p-4 font-light tracking-wider text-[#4D4D4DE5] hover:text-primary cursor-pointer rounded-lg transition-colors duration-200 w-full"
        >
          <span className="hidden md:group-hover:inline lg:inline">Logout</span>
          <LuLogOut size={20} />
        </button>
        <div className="border border-[#64748B] md:group-hover:block lg:block hidden" />
        <div className="hidden md:group-hover:block lg:block">
          <p className="text-[12px] tracking-wide flex justify-center p-4 font-light">
            © 2026 TalentFlow
          </p>
        </div>
      </div> */}

      <div className="mx-4 my-8">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 cursor-pointer"
        >
          <HiOutlineArrowLeftOnRectangle className="h-5 w-5 shrink-0" />
          <span>Logout</span>
        </button>

        <div className="rounded-xl border border-slate-200 px-3 py-3 text-xs text-slate-500 text-center">
          © 2026 TalentFlow
        </div>
      </div>
    </div>
  );
};

export default SideBar;

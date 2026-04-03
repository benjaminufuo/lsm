import { Outlet } from "react-router";
import Header from "../components/Header";
import SideBar from "../components/sidebar";

const MainHolder = () => {
  return (
    <div className="flex h-screen md:overflow-hidden bg-[#F8FAFC] overflow-x-hidden">
      <SideBar />
      <div
        className="
          flex-1 flex flex-col
          md:ml-16
          lg:ml-52  
        "
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainHolder;

import { Outlet } from "react-router";
import Header from "../components/Header";
import SideBar from "../components/sidebar";

const MainHolder = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <SideBar />
      <div
        className="
          flex-1 flex flex-col
          ml-16
          md:ml-16 
          lg:ml-44  
        "
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainHolder;

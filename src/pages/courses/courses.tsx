import CourseItem from "./components/courseItem";
import filterIcon from "../../assets/filter-icon-svg.svg";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../global/store";
import { MdOutlineArrowBack } from "react-icons/md";

const Cousrse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.learnFlow.userToken);
  const handleDropCourse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const courseId = e.currentTarget.dataset.id;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}enrollments/${courseId}/drop`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(response.data);
    } catch (err) {
      setError((err as Error).message);
      console.error((err as Error).message);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}enrollments/my-courses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setCourses(response.data.data);
        if (!courses.length) return;
        console.log(response.data.data);
      } catch (error) {
        console.error((error as Error).message);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [courses]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured</div>;
  }

  if (!courses.length)
    return (
      <div className="">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary/85 mt-8 mb-5 text-sm font-medium cursor-pointer"
        >
          <MdOutlineArrowBack size={18} />
          Back to Dashboard
        </button>
        <div className="mt-10 ml-10 font-semibold text-2xl">
          You have not enrolled in a course
        </div>
      </div>
    );

  return (
    <div className="pb-8 px-2">
      <div className="">
        {" "}
        <h1 className="text-[24px] text-[#0A2540] font-bold mb-2">
          My Courses
        </h1>
        <p className="text-[18px] text-[#64748B]">
          continue learning and track your progress
        </p>
        {/* Search Courses */}
        <div className="flex items-center justify-between gap-4 mt-3 w-[96%]">
          <input
            className="text-[14px] bg-white border-2 border-[#E2E8F0] focus:outline-none rounded-[10px] pl-[44px] pr-[16px] py-2 w-full"
            placeholder="Search courses..."
            type="search"
          />
          <div className="bg-[#E5E5E5E5] border border-[#E2E8F0] px-4 py-2 rounded-[10px] flex items-center justify-center gap-2">
            <img className="w-[16px]" src={filterIcon} alt="filter icon" />
            <span className="text-[#64748B] text-[14px] font-medium">
              Filter
            </span>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4 gap-7 lg:w-[96%]">
        {courses.map((course) => (
          <CourseItem item={course} onClick={handleDropCourse} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Cousrse;

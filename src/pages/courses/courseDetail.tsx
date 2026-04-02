import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { coursesMock } from "./data/coursesMock";
import { MdOutlineArrowBack } from "react-icons/md";
import timeIcon from "../../assets/clock-icon-svg.svg";
import detailBtn from "./data/studentCourseBtnList";
import CourseDetailItem from "./components/studentCourseDetails";
import topicsData from "./data/topicList";
import TopicItem from "./components/topicItem";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const course = coursesMock.find((course) => course.id === courseId);

  if (!course) {
    return <div></div>;
  }
  return (
    <div className="text-[#0A2540] lg:w-[96%]">
      {" "}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mt-8 mb-5 text-sm font-medium"
      >
        <MdOutlineArrowBack size={18} />
        Back to courses
      </button>
      {/* Course Details */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-[30px] mb-2">{course.courseTitle}</h1>
          <p className="text-[#64748B] mb-3">
            by <span className="">{course.instructor.name}</span>
          </p>
          <p className="text-[#64748B]">{course.courseDescription}</p>

          {/* Extra details */}
          <div className="text-[#64748B] text-[14px] flex items-center mt-4 gap-6">
            <div className="flex items-center justify-center gap-1">
              <img className="" src={timeIcon} alt="clock-icon" />
              <span>{course.timeDetail}</span> total
            </div>
            <div>
              <img src="" alt="" />
              <span>16/24</span> lessons
            </div>
            <div className="bg-white px-2 rounded-lg text-[12px] text-[#7B61FF] font-medium">
              <span>{course.courseProgress}</span> complete
            </div>
          </div>
        </div>

        {/* Progress information */}
        <div className="bg-white lg:self-start shrink-0 pt-4 px-4 rounded-xl w-[320px]">
          <div className="">
            <div className="flex items-center justify-between">
              {" "}
              <span className="text-[#64748B] text-[14px]">
                Course Progress
              </span>
              <span className="font-semibold text-[#64748B]">
                {course.courseProgress}
              </span>
            </div>
            <div className="bg-[#FAF8F3] h-2 mt-2">
              <div
                className={`bg-[#7B61FF] h-full `}
                style={{ width: course.courseProgress }}
              ></div>
            </div>
          </div>
          <Link className="flex items-center justify-center py-8" to={""}>
            <span></span>
            <span className="font-medium text-[14px] text-[#64748B]">
              Continue Learning
            </span>
          </Link>
        </div>
      </div>
      <div className="mt-10 lg:flex gap-6">
        <section className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 bg-white px-1 rounded-xl py-1">
            {detailBtn.map((button) => (
              <CourseDetailItem btn={button} />
            ))}
          </div>
          <Outlet />

          <div className="text-[#0A2540] bg-white mt-6 p-4">
            <h3 className="font-bold text-[20px]">About the instructor</h3>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-4">
              <div className="w-10 h-10 rounded-full">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={course.instructor.image}
                  alt="instructor-image"
                />
              </div>
              <div className="flex-1">
                <span className="font-semibold">{course.instructor.name}</span>
                <p className="text-[#64748B] text-[14px] mt-1">
                  {course.instructor.description}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-2 bg-white shrink-0 rounded-xl px-2 w-[320px]">
          <div className="border-b pl-5 py-4 text-[#0A2540]">
            <span className="font-bold text-[20px] ">Course Content</span>
            <p className="text-[14px]">
              <span>24</span> lessons
            </p>
          </div>
          <div className="">
            {topicsData.map((topic) => (
              <TopicItem key={topic.title} item={topic} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetail;

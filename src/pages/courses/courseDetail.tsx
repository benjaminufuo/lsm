import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import timeIcon from "../../assets/clock-icon-svg.svg";
import Overview from "./overview";
import Resources from "./resources";
import MyNotes from "./my-notes";
import TopicItem from "./components/topicItem";
import playIcon from "../../assets/play-icon.svg";
import bookIcon from "../../assets/book-icon.svg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../global/store";
import axios from "axios";
import Loading from "../../components/Loading";
import type { Lesson } from "./types/type";
import Youtube from "react-youtube";
import { toast } from "react-toastify";

interface Course {
  courseTitle: string;
  instructorName: string;
  instructorBio: string;
  description: string;
  duration: number;
  lessons: Lesson[];
  progress: number;
  courseProgress: string;
}

const CourseDetail = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]); //
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const token = useSelector((state: RootState) => state.learnFlow.userToken);

  useEffect(() => {
    (async () => {
      try {
        const [courseRes, lessonRes] = await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_BASE_URL}courses/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(
            `${import.meta.env.VITE_BASE_URL}courses/${courseId}/lessons`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          ),
        ]);

        if (courseRes.status === "fulfilled") {
          setCourse(courseRes.value.data.data);
          console.log(courseRes.value.data.data);
        } else {
          setError("Failed to load course");
        }

        if (lessonRes.status === "fulfilled") {
          setLessons(lessonRes.value.data.data);
          console.log(lessonRes.value.data.data);
        } else {
          setLessons([]);
          console.error(lessonRes.reason);
        }
      } catch (error) {
        setError((error as Error).message);
        console.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [courseId, token]);

  const [activeTab, setActiveTab] = useState<
    "overview" | "resources" | "mynotes"
  >("overview");

  const getVideoId = (url: string) => {
    if (!url) return "";

    try {
      const parsed = new URL(url);

      // youtu.be/VIDEO_ID
      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.slice(1);
      }

      // youtube.com/watch?v=VIDEO_ID
      if (parsed.searchParams.get("v")) {
        return parsed.searchParams.get("v") || "";
      }

      // /embed/VIDEO_ID
      if (parsed.pathname.includes("/embed/")) {
        return parsed.pathname.split("/embed/")[1] || "";
      }

      return "";
    } catch {
      return "";
    }
  };

  const handleMarkLessonAsCompleted = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/enrollments/mark-lesson-complete`,
        {
          courseId: courseId,
          lessonId: activeLesson?._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log(response.data.data.message);
      toast.success(
        response.data.data.message || "Lesson marked as completed!",
      );
    } catch (error) {
      console.error((error as Error).message);
      toast.error("Failed to mark lesson as completed.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Unable to fetch course details</div>;
  }

  if (!course) {
    return <div>No courses enrolled</div>;
  }
  return (
    <div className="text-[#0A2540] lg:w-[96%] px-2 relative pb-10">
      {" "}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary hover:text-primary/85 mt-8 mb-5 text-sm font-medium cursor-pointer"
      >
        <MdOutlineArrowBack size={18} />
        Back to courses
      </button>
      {/* Video Player — only shows when a lesson is selected */}
      {activeLesson && (
        <div className="w-full rounded-xl overflow-hidden bg-black mb-6">
          <Youtube
            // className="w-full aspect-video border-0"
            iframeClassName="w-full aspect-video border-0"
            videoId={getVideoId(activeLesson.videoUrl)}
            title={activeLesson.title}
            onEnd={handleMarkLessonAsCompleted}
          />
          <div className="bg-white p-4">
            <h2 className="font-bold text-[20px]">{activeLesson.title}</h2>
            <p className="text-[#64748B] mt-1 text-[14px]">
              {activeLesson.description}
            </p>
          </div>
        </div>
      )}
      {/* Course Details */}
      {!activeLesson && (
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-[30px] mb-2">{course.courseTitle}</h1>
            <p className="text-[#64748B] mb-3">
              by <span className="">{course.instructorName}</span>
            </p>
            <p className="text-[#64748B]">{course.description}</p>

            {/* Extra details */}
            <div className="text-[#64748B] text-[14px] flex items-center justify-between lg:justify-start mt-4 gap-6">
              <div className="flex items-center justify-center gap-2">
                <img className="" src={timeIcon} alt="clock-icon" />
                <span>
                  {" "}
                  <span>
                    {course.duration} hour{course.duration <= 1 ? "" : "s"}
                  </span>{" "}
                  total
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <img src={bookIcon} alt="book-icon" />
                <span>
                  {" "}
                  <span>{`${course.lessons.length}`}</span> lesson
                  {course.lessons.length <= 1 ? "" : "s"}
                </span>
              </div>
              <div className="bg-white px-2 rounded-lg text-[12px] text-[#7B61FF] font-medium">
                <span>{course.progress || "0"}%</span> complete
              </div>
            </div>
          </div>

          {/* Progress information */}
          <div className="bg-white lg:self-start shrink-0 pt-4 px-4 rounded-xl lg:w-[320px] lg:shadow-none shadow-md absolute lg:static left-0 right-0 bottom-55 ">
            <div className="">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B] text-[14px]">
                  Course Progress
                </span>
                <span className="font-semibold text-[#64748B]">
                  {course.progress || "0"}%
                </span>
              </div>
              <div className="bg-[#FAF8F3] h-2 mt-2">
                <div
                  className={`bg-[#7B61FF] h-full `}
                  style={{ width: `${course.progress || "0"}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => lessons.length > 0 && setActiveLesson(lessons[0])}
              className="flex items-center justify-center gap-x-4 py-8 w-full cursor-pointer text-[#64748B] hover:text-[#7B61FF]"
            >
              <img className="" src={playIcon} alt="play-icon" />

              <span className="font-medium text-[14px]">Continue Learning</span>
            </button>
          </div>
        </div>
      )}
      <div className="mt-6 lg:mt-10 lg:flex lg:items-center gap-6">
        <section className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 bg-white px-1 rounded-xl py-1 w-full">
            <button
              className={`
          transition-all duration-200 flex items-center justify-center px-4 md:px-10 lg:px-16 py-1 cursor-pointer 
          ${
            activeTab === "overview"
              ? "text-white bg-primary rounded-2xl"
              : "text-[#64748B] hover:bg-primary/20 rounded-2xl"
          }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`
          transition-all duration-200 flex items-center justify-center px-4 lg:px-16 py-1 cursor-pointer 
          ${
            activeTab === "resources"
              ? "text-white bg-primary rounded-2xl"
              : "text-[#64748B] hover:bg-primary/20 rounded-2xl"
          }`}
              onClick={() => setActiveTab("resources")}
            >
              Resources
            </button>
            <button
              className={`
          transition-all duration-200 flex items-center justify-center px-4 lg:px-16 py-1 cursor-pointer 
          ${
            activeTab === "mynotes"
              ? "text-white bg-primary rounded-2xl"
              : "text-[#64748B] hover:bg-primary/20 rounded-2xl"
          }`}
              onClick={() => setActiveTab("mynotes")}
            >
              My Notes
            </button>
          </div>
          <div>
            {activeTab === "overview" && <Overview />}
            {activeTab === "resources" && <Resources />}
            {activeTab === "mynotes" && <MyNotes />}
          </div>

          <div className="text-[#0A2540] bg-white mt-6 p-4">
            <h3 className="font-bold text-[20px]">About the instructor</h3>
            <div className="flex gap-2 lg:gap-4 mt-4">
              <div className="w-10 h-10 rounded-full">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={""}
                  alt="instructor-image"
                />
              </div>
              <div className="flex-1">
                <span className="font-semibold">{course.instructorName}</span>
                <p className="text-[#64748B] text-[14px] mt-1">
                  {course.instructorBio}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-50 lg:mt-0 pt-2 bg-white shrink-0 rounded-xl px-2 lg:w-[320px] self-start">
          <div className="border-b pl-5 py-4 text-[#0A2540]">
            <span className="font-bold text-[20px] ">Course Content</span>
            <p className="text-[14px]">
              <span>{course.lessons.length}</span>{" "}
              {`lesson${course.lessons.length <= 1 ? "" : "s"}`}
            </p>
          </div>
          <div className="">
            {lessons.length === 0 ? (
              <div className="p-4 text-[#0A2540]/60">
                No lesson for this course
              </div>
            ) : (
              lessons.map((lesson, index) => (
                <TopicItem
                  key={index}
                  item={lesson}
                  onSelect={() => setActiveLesson(lesson)}
                  isActive={activeLesson?._id === lesson?._id}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetail;

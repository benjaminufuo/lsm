import type { DashboardCardProps } from "../../data/types";
import BookIcon from "../../assets/icons/book.svg?react";
import ClockIcon from "../../assets/icons/clock.svg?react";
import TrendIcon from "../../assets/icons/trend.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";
import ArrowRightIcon from "../../assets/icons/arrowright.svg?react";
import DashboardCard from "../../components/dashboard-card";
import { NavLink } from "react-router";
// import course1 from "../../assets/images/course1.jpg";
// import course2 from "../../assets/images/course2.jpg";
// import course3 from "../../assets/images/course3.jpg";
import CourseCard from "../../components/course-card";
import { useSelector } from "react-redux";
import type { RootState } from "../../global/store";
import { useEffect, useState } from "react";
import { getActiveEnrolledCourse, getAssignments } from "../../lib/data";
import type { ActiveEnrolledCourse } from "../../lib/definition";
import SkeletonCard from "../../components/skeleton-card";
import { PiReadCvLogoFill } from "react-icons/pi";
import { MdAssignmentAdd } from "react-icons/md";

const Dashboard = () => {
  const token = useSelector((state: RootState) => state.learnFlow.userToken);
  const [course, setCourse] = useState<ActiveEnrolledCourse | null>(null);
  const [enrolledCourse, setEnrolledCourse] =
    useState<ActiveEnrolledCourse | null>(null);
  const [assignment, setAssignment] = useState<ActiveEnrolledCourse | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.learnFlow.userInfo);

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);

    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (diffInSeconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const stats: DashboardCardProps[] = [
    {
      title: "Courses Enrolled",
      icon: BookIcon,
      value: enrolledCourse?.data.length || 0,
      descriptionNumber: enrolledCourse?.data.length || 0,
      description: "active courses",
    },
    {
      title: "Hours Learned",
      icon: ClockIcon,
      value: 0,
      descriptionNumber: 0,
      description: " this week",
    },
    {
      title: "Current Streak",
      icon: TrendIcon,
      value: 0,
      descriptionNumber: null,
      description: "Personal best!",
    },
    {
      title: "Completed",
      icon: CheckIcon,
      value: 0,
      descriptionNumber: 0,
      description: "% completion rate",
    },
  ];

  const recentActivity = [
    {
      title: "Introduction to Hooks",
      course: "Introduction to Hooks",
      dueDate: "2 hours ago",
    },
    {
      title: "Submitted assignment",
      course: "Design System Documentation",
      dueDate: "1 day ago",
    },
  ];

  useEffect(() => {
    const loadActiveEnrolledCourses = async () => {
      try {
        setLoading(true);
        const [activeEnrolledData, assignmentsData, enrolledData] =
          await Promise.all([
            getActiveEnrolledCourse(token),
            getAssignments(token),
            getActiveEnrolledCourse(token),
          ]);
        setCourse(activeEnrolledData);
        setAssignment(assignmentsData);
        setEnrolledCourse(enrolledData);
        console.log(enrolledData, "first course");
        console.log(assignmentsData, "assignments data");
      } catch (err) {
        console.error("Failed to fetch active course data");
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    loadActiveEnrolledCourses();
    console.log(user, "user details");
  }, [user]);

  return (
    <div className="px-2 md:mr-10">
      <div className="mt-2">
        <h2 className="text-2xl font-bold">
          Welcome back, {user?.fullName.split(" ")[0]} 👋
        </h2>
        <p className="text-gray-600 mt-2 tracking-wide">
          You're making great progress. Keep it up!
        </p>
      </div>

      <div className="flex flex-col md:flex-row mt-5 gap-4">
        {stats.map((item) => (
          <DashboardCard
            title={item.title}
            description={item.description}
            value={item.value}
            icon={item.icon}
            descriptionNumber={item.descriptionNumber}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="w-full md:w-7/12 mt-8 flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between ">
            <h2 className="md:text-2xl font-bold">Active Courses</h2>
            <NavLink
              to="/learnflow/courses"
              className="text-sm text-primary flex flex-row items-center gap-2"
            >
              <span>View all</span>
              <span className="ml-1">
                <ArrowRightIcon />
              </span>
            </NavLink>
          </div>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : course?.data.length ? (
            <div className="flex flex-1 flex-col gap-4">
              {course?.data.map((item) => (
                <CourseCard
                  imageUrl={item.courseImg}
                  title={item.courseTitle}
                  instructor={item.instructorName}
                  progress={item.progress}
                  description={item.category}
                  percentage={item.rating}
                />
              ))}
            </div>
          ) : (
            <div className="py-22 flex flex-1  items-center justify-center gap-4 text-gray-600 bg-white rounded-2xl">
              <PiReadCvLogoFill size={28} />
              <p>Enroll in a Course</p>
            </div>
          )}
        </div>

        <div className="mt-8 w-full md:flex-1">
          <h2 className="text-2xl font-bold mb-4">Upcoming Assignments</h2>
          <div className="bg-white p-2.5 gap-2.5 rounded-2xl">
            {assignment?.data.length ? (
              <div className="flex flex-col gap-4">
                {assignment.data.map((item) => (
                  <div className=" py-1.5">
                    <div
                      key={item.courseImg}
                      className="flex flex-row justify-between items-center"
                    >
                      <h4 className="text-md font-semibold mb-1">
                        {item.courseTitle}
                      </h4>
                      <ClockIcon />
                    </div>
                    <p className="text-[14px] mb-1">{item.category}</p>
                    <p className="text-[#0A2540] font-semibold">
                      Due {item.instructorName}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center py-22 gap-4 text-gray-600">
                <MdAssignmentAdd size={28} />
                <p>Nothing to show</p>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold my-4">Recent Activity</h2>
          <div className="bg-white p-2.5 gap-2.5 rounded-2xl">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            ) : course?.data.length ? (
              <div className="flex flex-1 flex-col gap-4">
                {course?.data.map((item) => (
                  <div className=" py-1.5">
                    <div
                      key={item.courseImg}
                      className="flex flex-row justify-between items-center"
                    >
                      <h4 className="text-md font-semibold mb-1">
                        {item.courseTitle}
                      </h4>
                    </div>
                    <p className="text-[14px] mb-1">{item.instructorName}</p>
                    <p className="text-[#0A2540] font-semibold">
                        {timeAgo(item.enrollmentDate)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-22 flex flex-1  items-center justify-center gap-4 text-gray-600 bg-white rounded-2xl">
                <PiReadCvLogoFill size={28} />
                <p>Nothing to show</p>
              </div>
            )}

            {/* <div className="flex flex-col gap-4">
              {recentActivity.map((item) => (
                <div className=" py-1.5">
                  <div
                    key={item.title}
                    className="flex flex-row justify-between items-center"
                  >
                    <h4 className="text-md font-semibold mb-1">{item.title}</h4>
                  </div>
                  <p className="text-[14px] mb-1">{item.course}</p>
                  <p className="text-[#0A2540] font-semibold">{item.dueDate}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

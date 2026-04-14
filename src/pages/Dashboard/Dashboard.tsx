import type { DashboardCardProps } from "../../data/types";
import BookIcon from "../../assets/icons/book.svg?react";
import ClockIcon from "../../assets/icons/clock.svg?react";
import TrendIcon from "../../assets/icons/trend.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";
import ArrowRightIcon from "../../assets/icons/arrowright.svg?react";
import DashboardCard from "../../components/dashboard-card";
import { NavLink } from "react-router";
import CourseCard from "../../components/course-card";
import { useSelector } from "react-redux";
import type { RootState } from "../../global/store";
import { useEffect, useState } from "react";
import {
  getActiveEnrolledCourse,
  getAssignments,
  getEnrolledCourse,
  type UserProps,
  type ActiveEnrolledCourse,
} from "../../lib/data";
import SkeletonCard from "../../components/skeleton-card";
import { PiReadCvLogoFill } from "react-icons/pi";
import { MdAssignmentAdd } from "react-icons/md";

const Dashboard = () => {
  const token = useSelector((state: RootState) => state.learnFlow.userToken);
  const user = useSelector(
    (state: RootState) => state.learnFlow.userInfo as UserProps,
  );

  const [course, setCourse] = useState<ActiveEnrolledCourse | null>(null);
  const [enrolledCourse, setEnrolledCourse] =
    useState<ActiveEnrolledCourse | null>(null);
  const [assignment, setAssignment] = useState<ActiveEnrolledCourse | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const loadActiveEnrolledCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const authToken = token || localStorage.getItem("token");

        if (!authToken) {
          throw new Error("No token found");
        }

        const [activeEnrolledData, assignmentsData, enrolledData] =
          await Promise.all([
            getActiveEnrolledCourse(),
            getAssignments(),
            getEnrolledCourse(),
          ]);

        setCourse(activeEnrolledData);
        setAssignment(assignmentsData);
        setEnrolledCourse(enrolledData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadActiveEnrolledCourses();
  }, [token]);

  return (
    <div className="px-2 md:mr-10">
      <div className="mt-2">
        <h2 className="text-2xl font-bold">
          Welcome back, {user?.fullName} 👋
        </h2>
        <p className="mt-2 tracking-wide text-gray-600">
          You're making great progress. Keep it up!
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-4 md:flex-row">
        {stats.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            description={item.description}
            value={item.value}
            icon={item.icon}
            descriptionNumber={item.descriptionNumber}
          />
        ))}
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="mt-8 flex w-full flex-col gap-4 md:w-7/12">
          <div className="flex flex-row items-center justify-between">
            <h2 className="md:text-2xl font-bold">Active Courses</h2>
            <NavLink
              to="/learnflow/courses"
              className="text-primary flex flex-row items-center gap-2 text-sm"
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
              {course.data.map((item) => (
                <CourseCard
                  key={item.enrollmentId}
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
            <div className="flex flex-1 items-center justify-center gap-4 rounded-2xl bg-white py-22 text-gray-600">
              {error ? (
                <p>{error.message || "An error occurred"}</p>
              ) : (
                <div>
                  <PiReadCvLogoFill size={28} />
                  <p>Enroll in a Course</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 w-full md:flex-1">
          <h2 className="mb-4 text-2xl font-bold">Upcoming Assignments</h2>
          <div className="gap-2.5 rounded-2xl bg-white p-2.5">
            {assignment?.data.length ? (
              <div className="flex flex-col gap-4">
                {assignment.data.map((item) => (
                  <div key={item.enrollmentId} className="py-1.5">
                    <div className="flex flex-row items-center justify-between">
                      <h4 className="mb-1 text-md font-semibold">
                        {item.courseTitle}
                      </h4>
                      <ClockIcon />
                    </div>
                    <p className="mb-1 text-[14px]">{item.category}</p>
                    <p className="font-semibold text-[#0A2540]">
                      Due {item.instructorName}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center gap-4 py-22 text-gray-600">
                <MdAssignmentAdd size={28} />
                <p>Nothing to show</p>
              </div>
            )}
          </div>

          <h2 className="my-4 text-2xl font-bold">Recent Activity</h2>
          <div className="gap-2.5 rounded-2xl bg-white p-2.5">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            ) : course?.data.length ? (
              <div className="flex flex-1 flex-col gap-4">
                {course.data.map((item) => (
                  <div key={item.enrollmentId} className="py-1.5">
                    <div className="flex flex-row items-center justify-between">
                      <h4 className="mb-1 text-md font-semibold">
                        {item.courseTitle}
                      </h4>
                    </div>
                    <p className="mb-1 text-[14px]">{item.instructorName}</p>
                    <p className="font-semibold text-[#0A2540]">
                      {timeAgo(item.enrollmentDate)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center gap-4 rounded-2xl bg-white py-22 text-gray-600">
                <PiReadCvLogoFill size={28} />
                <p>Nothing to show</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

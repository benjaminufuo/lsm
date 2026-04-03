import type { CourseCardProps, DashboardCardProps } from "../../data/types";
import BookIcon from "../../assets/icons/book.svg?react";
import ClockIcon from "../../assets/icons/clock.svg?react";
import TrendIcon from "../../assets/icons/trend.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";
import ArrowRightIcon from "../../assets/icons/arrowright.svg?react";
import DashboardCard from "../../components/dashboard-card";
import { NavLink } from "react-router";
import course1 from "../../assets/images/course1.jpg";
import course2 from "../../assets/images/course2.jpg";
import course3 from "../../assets/images/course3.jpg";
import CourseCard from "../../components/course-card";

const Dashboard = () => {
  const stats: DashboardCardProps[] = [
    {
      title: "Courses Enrolled",
      icon: BookIcon,
      value: 12,
      description: "3 active courses",
    },
    {
      title: "Hours Learned",
      icon: ClockIcon,
      value: "127",
      description: "+12 this week",
    },
    {
      title: "Current Streak",
      icon: TrendIcon,
      value: "15 days",
      description: "Personal best!",
    },
    {
      title: "Completed",
      icon: CheckIcon,
      value: "8",
      description: "67% completion rate",
    },
  ];

  const activeCourses: CourseCardProps[] = [
    {
      imageUrl: course1,
      title: "Advanced React Development",
      instructor: "Dr. Emily Zhang",
      progress:230,
      description: "Next: State Management with Redux",
      percentage: "68%",
    },
    {
      imageUrl: course2,
      title: "UI/UX Design Fundamentals",
      instructor: "Dr. Sarah Johnson",
      progress: 100,
      description: "Next: Creating User Personas",
      percentage: "34%",
    },
    {
      imageUrl: course3,
      title: "Data Science with Python",
      instructor: "Prof. Marcus Chen",
      progress: 70,
      description: "Next: Machine Learning Basics",
      percentage: "20%",
    },
  ];

  const upcomingAssignments = [
    {
      title: "React Component Architecture",
      course: "Advanced React Development",
      dueDate: "Mar 22, 2026",
    },
    {
      title: "User Research Report",
      course: "UI/UX Design Fundamentals",
      dueDate: "Mar 25, 2026",
    },
    {
      title: "Data Analysis Project",
      course: "Data Analysis Fundamentals",
      dueDate: "Mar 26, 2026",
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

  return (
    <div className="mx-2 md:mr-10">
      <div className="mt-2">
        <h2 className="text-2xl font-bold">Welcome back, Miracle 👋</h2>
        <p className="text-gray-600 mt-2 tracking-wide">
          You're making great progress. Keep it up!
        </p>
      </div>

      <div className="flex flex-col  md:flex-row mt-5 gap-4">
        {stats.map((item) => (
          <DashboardCard
            title={item.title}
            description={item.description}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-11/20 mt-8 flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between ">
            <h2 className="text-2xl font-bold">Active Courses</h2>
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
          <div className="flex flex-col gap-4">
            {activeCourses.map((item) => (
              <CourseCard
                imageUrl={item.imageUrl}
                title={item.title}
                instructor={item.instructor}
                progress={item.progress}
                description={item.description}
                percentage={item.percentage}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex-1">
          <h2 className="text-2xl font-bold mb-4">Upcoming Assignments</h2>
          <div className="bg-white p-2.5 gap-2.5 rounded-2xl">
            <div className="flex flex-col gap-4">
              {upcomingAssignments.map((item) => (
                <div className=" py-1.5">
                  <div
                    key={item.title}
                    className="flex flex-row justify-between items-center"
                  >
                    <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                    <ClockIcon />
                  </div>
                  <p className="text-[14px] mb-1">{item.course}</p>
                  <p className="text-[#0A2540] font-semibold">
                    Due {item.dueDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold my-4">Recent Activity</h2>
          <div className="bg-white p-2.5 gap-2.5 rounded-2xl">
            <div className="flex flex-col gap-4">
              {recentActivity.map((item) => (
                <div className=" py-1.5">
                  <div
                    key={item.title}
                    className="flex flex-row justify-between items-center"
                  >
                    <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                  </div>
                  <p className="text-[14px] mb-1">{item.course}</p>
                  <p className="text-[#0A2540] font-semibold">
                    {item.dueDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from "react"
import Button from "../../shared/Button/Index"
import Input from "../../shared/Input/Index"
import { RiBookLine, RiTimeLine, RiCalendarLine, RiMedalLine } from "react-icons/ri"
import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineLocationOn, MdOutlineDateRange } from "react-icons/md"
import { FiStar, FiZap, FiTarget, FiSearch } from "react-icons/fi"

interface Stat {
  label: string
  value: string
  subtitle?: string
  icon: JSX.Element
}

interface ProgressItem {
  course: string
  percent: number
  color: string
}

interface Achievement {
  title: string
  desc: string
  icon: JSX.Element
  iconColor: string
}

interface ProfileData {
  name: string
  role: string
  email: string
  location: string
  joinedDate: string
  stats: Stat[]
  progress: ProgressItem[]
  achievements: Achievement[]
  skills: string[]
}

const profileData: ProfileData = {
  name: "Nimmi Mike",
  role: "Student • Full Stack Developer",
  email: "sarahchen@gmail.com",
  location: "Lagos, Nigeria",
  joinedDate: "Joined January 2025",
  stats: [
    { label: "Courses Completed", value: "8", icon: <RiBookLine className="text-[#7300ff] text-lg" /> },
    { label: "Total Days Learn", value: "127", subtitle: "+12 this week", icon: <RiTimeLine className="text-[#7300ff] text-lg" /> },
    { label: "Personal Best", value: "15 days", icon: <RiCalendarLine className="text-[#7300ff] text-lg" /> },
    { label: "Average Grade", value: "91.5%", icon: <RiMedalLine className="text-[#7300ff] text-lg" /> },
  ],
  progress: [
    { course: "React Development", percent: 68, color: "#F59E0B" },
    { course: "UI/UX Design", percent: 45, color: "#7300ff" },
    { course: "Data Science", percent: 82, color: "#10B981" },
  ],
  achievements: [
    { title: "Top Performer", desc: "Achieved top grades in 5 courses", icon: <FiStar size={16} />, iconColor: "#F59E0B" },
    { title: "Fast Learner", desc: "Completed 3 courses in one month", icon: <FiZap size={16} />, iconColor: "#3B82F6" },
    { title: "Goal Crusher", desc: "15-day learning streak", icon: <FiTarget size={16} />, iconColor: "#7300ff" },
  ],
  skills: ["React", "JavaScript", "TypeScript", "Python", "UI/UX Design", "Data Analysis", "HTML/CSS", "Node.js", "Figma", "Git"],
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview")
  const tabs: string[] = ["Overview", "Completed Courses", "Achievements"]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* Profile Header */}
      <div className="bg-white rounded-xl p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
              <img
                src="https://i.pravatar.cc/80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#011a2a]">{profileData.name}</h1>
              <p className="text-sm text-gray-500">{profileData.role}</p>
              <div className="flex flex-wrap gap-2 md:gap-4 text-xs text-gray-400 mt-1">
                <span className="flex items-center gap-1">
                  <HiOutlineMail /> {profileData.email}
                </span>
                <span className="flex items-center gap-1">
                  <MdOutlineLocationOn /> {profileData.location}
                </span>
                <span className="flex items-center gap-1">
                  <MdOutlineDateRange /> {profileData.joinedDate}
                </span>
              </div>
            </div>
          </div>
          <Button variant="primary" size="small">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {profileData.stats.map((stat: Stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4">
            {stat.icon}
            <p className="text-xl md:text-2xl font-bold mt-1 text-[#011a2a]">{stat.value}</p>
            {stat.subtitle && (
              <p className="text-xs text-green-500">{stat.subtitle}</p>
            )}
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 md:gap-4 mb-6 flex-wrap">
        {tabs.map((tab: string) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-1.5 rounded-full transition-colors ${
              activeTab === tab
                ? "bg-[#7300ff] text-white"
                : "text-gray-600 hover:text-[#7300ff]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Learning Progress */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="font-semibold mb-4 text-[#011a2a]">Learning Progress</h2>
            {profileData.progress.map((item: ProgressItem) => (
              <div key={item.course} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#011a2a]">{item.course}</span>
                  <span className="text-gray-500">{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="font-semibold mb-4 text-[#011a2a]">Recent Achievements</h2>
            {profileData.achievements.map((item: Achievement) => (
              <div key={item.title} className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.iconColor}20`, color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#011a2a]">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {activeTab === "Completed Courses" && (
        <div className="bg-white rounded-xl p-6">
          <div className="mb-4">
            <Input
              placeholder="Search completed courses..."
              icon={<FiSearch />}
              size="medium"
            />
          </div>
          <p className="text-gray-400 text-sm">Completed courses will be loaded from the API</p>
        </div>
      )}

      {activeTab === "Achievements" && (
        <div className="bg-white rounded-xl p-6">
          <p className="text-gray-400 text-sm">Achievements will be loaded from the API</p>
        </div>
      )}

      {/* Skills */}
      <div className="bg-white rounded-xl p-6 mt-6">
        <h2 className="font-semibold mb-4 text-[#011a2a]">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-4">
          {profileData.skills.map((skill: string) => (
            <span key={skill} className="text-sm text-gray-600">
              {skill}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Profile
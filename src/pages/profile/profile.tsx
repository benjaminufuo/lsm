import { useState } from "react"

interface Stat {
  label: string
  value: string
  subtitle?: string
  icon: string
}

interface ProgressItem {
  course: string
  percent: number
  color: string
}

interface Achievement {
  title: string
  desc: string
  icon: string
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
    { label: "Courses Completed", value: "8", icon: "📋" },
    { label: "Total Days Learn", value: "127", subtitle: "+12 this week", icon: "📈" },
    { label: "Personal Best", value: "15 days", icon: "📅" },
    { label: "Average Grade", value: "91.5%", icon: "🏆" },
  ],
  progress: [
    { course: "React Development", percent: 68, color: "#F59E0B" },
    { course: "UI/UX Design", percent: 45, color: "#8B5CF6" },
    { course: "Data Science", percent: 82, color: "#10B981" },
  ],
  achievements: [
    { title: "Top Performer", desc: "Achieved top grades in 5 courses", icon: "⭐", iconColor: "#F59E0B" },
    { title: "Fast Learner", desc: "Completed 3 courses in one month", icon: "⚡", iconColor: "#3B82F6" },
    { title: "Goal Crusher", desc: "15-day learning streak", icon: "🎯", iconColor: "#8B5CF6" },
  ],
  skills: ["React", "JavaScript", "TypeScript", "Python", "UI/UX Design", "Data Analysis", "HTML/CSS", "Node.js", "Figma", "Git"],
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview")
  const tabs: string[] = ["Overview", "Completed Courses", "Achievements"]

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="https://i.pravatar.cc/80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{profileData.name}</h1>
            <p className="text-sm text-gray-500">{profileData.role}</p>
            <div className="flex gap-4 text-xs text-gray-400 mt-1">
              <span>✉ {profileData.email}</span>
              <span>📍 {profileData.location}</span>
              <span>📅 {profileData.joinedDate}</span>
            </div>
          </div>
        </div>
        <button className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {profileData.stats.map((stat: Stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4">
            <span className="text-lg">{stat.icon}</span>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            {stat.subtitle && (
              <p className="text-xs text-green-500">{stat.subtitle}</p>
            )}
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab: string) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-600 border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-2 gap-6">

          {/* Learning Progress */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="font-semibold mb-4">Learning Progress</h2>
            {profileData.progress.map((item: ProgressItem) => (
              <div key={item.course} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.course}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
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
            <h2 className="font-semibold mb-4">Recent Achievements</h2>
            {profileData.achievements.map((item: Achievement) => (
              <div key={item.title} className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ backgroundColor: `${item.iconColor}20`, color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {activeTab === "Completed Courses" && (
        <div className="bg-white rounded-xl p-6">
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
        <h2 className="font-semibold mb-4">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-2">
          {profileData.skills.map((skill: string) => (
            <span key={skill} className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Profile
"use client";

import { useState, useRef } from "react";
import Button from "../../shared/Button/Index";
import Input from "../../shared/Input/Index";
import { HiOutlineMail } from "react-icons/hi";
import { HiMapPin } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { MdOutlineCalendarToday } from "react-icons/md";
import { LuAward, LuTrophy } from "react-icons/lu";
import { RxLightningBolt } from "react-icons/rx";
import { BiBullseye } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";

interface StatCard {
  value: string | number;
  label: string;
  subtext?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Achievement {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface SkillProgress {
  name: string;
  percentage: number;
}

type TabType = "overview" | "completed" | "achievements";

const ProfilePage = (): React.ReactNode => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Modal & Form State
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "Nimmi Mike",
    email: "sarah@digitalgmail.com",
    location: "Lagos, Nigeria",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Add API call logic here to save profile changes
    setIsModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const statCards: StatCard[] = [
    {
      value: 8,
      label: "Courses Completed",
      icon: IoBookOutline,
    },
    {
      value: "127",
      label: "+12 this week",
      icon: GoClock,
    },
    {
      value: "15 days",
      label: "Personal best",
      icon: MdOutlineCalendarToday,
    },
    {
      value: "9.1.5%",
      label: "Average Grade",
      icon: LuAward,
    },
  ];

  const skillProgress: Array<SkillProgress & { color: string }> = [
    {
      name: "React Development",
      percentage: 68,
      color: "bg-[#FFE357]",
    },
    {
      name: "UI/UX Design",
      percentage: 45,
      color: "bg-primary",
    },
    {
      name: "Data Science",
      percentage: 82,
      color: "bg-[#14AE28F2]",
    },
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      icon: LuTrophy,
      title: "Top Performer",
      description: "Achieved top 10 of class in 5 courses",
    },
    {
      id: 2,
      icon: RxLightningBolt,
      title: "Fast Learner",
      description: "Completed 3 courses in one month",
    },
    {
      id: 3,
      icon: BiBullseye,
      title: "Goal Crusher",
      description: "15-day learning streak",
    },
  ];

  const skills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Python",
    "UI/UX Design",
    "Data Analysis",
    "HTML/CSS",
    "Node.js",
    "Figma",
    "Git",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white w-[99%] rounded-[15px] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            {/* Profile Info */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 flex-1">
              {/* Avatar */}
              <div className="flex-shrink-0 relative w-[100px] h-[100px]">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center text-white text-3xl font-bold border-2 border-purple-300 overflow-hidden shadow-sm">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "NM"
                  )}
                </div>
                {/* Edit Avatar Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full border-2 border-white hover:bg-primary/80 transition-colors shadow-sm"
                  aria-label="Change profile picture"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {formData.name}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  Student • Full Stack Developer
                </p>

                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <HiOutlineMail className="w-4 h-4" />
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GrLocation className="w-4 h-4 text-[#DC0A0AE5]" />
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineCalendarToday className="w-4 h-4" />
                    <span>Joined January 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto rounded-[15px]"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white w-full h-full rounded-[15px] p-4 sm:p-6 border border-gray-200 hover:border-primary hover:shadow-md transition duration-200"
              >
                <div className="flex flex-col items-start gap-3">
                  <Icon className="w-2 h-2 sm:w-8 sm:h-8 text-primary" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto py-6 h-max">
        <div className="bg-white rounded-3xl px-2 py-1  inline-flex gap-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-4 font-semibold text-sm rounded-3xl transition duration-200 ${
              activeTab === "overview"
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`py-2 px-4 font-semibold text-sm rounded-3xl transition duration-200 ${
              activeTab === "completed"
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Completed Courses
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`py-2 px-4 font-semibold text-sm rounded-3xl transition duration-200 ${
              activeTab === "achievements"
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Achievements
          </button>
        </div>
      </div>

      {/* Content Section */}
      {activeTab === "overview" && (
        <div className="max-w-6xl mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Learning Progress */}
            <div className="bg-white rounded-[15px] h-max py-4">
              <h2 className="text-xl font-bold text-gray-900 px-4 py-4 mb-6">
                Learning Progress
              </h2>
              <div className="space-y-6 px-4">
                {skillProgress.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-600">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${skill.color} h-3 rounded-full transition duration-300`}
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-[15px] p-6 h-max">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recent Achievements
              </h2>
              <div className="flex flex-col gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  const colors = ["bg-gray-100", "bg-gray-100", "bg-gray-100"];
                  const iconColors = [
                    "text-primary",
                    "text-primary",
                    "text-primary",
                  ];
                  return (
                    <div key={achievement.id} className="rounded-lg p-4">
                      <div className="flex gap-3 items-center">
                        <div
                          className={`${colors[achievement.id - 1]} rounded-[12px] p-2.5 flex-shrink-0`}
                        >
                          <Icon
                            className={`w-7 h-7 ${iconColors[achievement.id - 1]}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {achievement.title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <button
                  key={index}
                  className="bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 px-4 py-2 rounded-full text-sm font-medium transition duration-200"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "completed" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
            <p className="text-gray-600">
              Completed courses content coming soon...
            </p>
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
            <p className="text-gray-600">Achievements content coming soon...</p>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="small"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={<HiOutlineMail className="w-5 h-5" />}
                size="small"
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                icon={<HiMapPin className="w-5 h-5" />}
                size="small"
              />
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setIsModalOpen(false)}
                className="rounded-[15px] !border-gray-300 !text-gray-700 hover:!bg-gray-50"
              >
                Cancel
              </Button>
              <Button fullWidth onClick={handleSave} className="rounded-[15px]">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from "../../shared/Button/Index";
import Input from "../../shared/Input/Index";
import { HiOutlineMail } from "react-icons/hi";
import { HiMapPin } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { MdOutlineCalendarToday } from "react-icons/md";
import { LuAward } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { setUserInfo } from "../../global/slice";

interface StatCard {
  value: string | number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Achievement {
  _id: string;
  badge: string;
  description: string;
  earnedAt: string;
}

interface LearningProgress {
  courseId: string;
  course: string;
  progress: number;
  status: string;
}

interface UserProfile {
  name: string;
  email: string;
  location: string;
  bio?: string;
}

type TabType = "overview" | "completed" | "achievements";

const ProfilePage = (): React.ReactNode => {
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.learnFlow.userToken);
  const userInfo = useSelector((state: any) => state.learnFlow.userInfo);

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [joinedDate, setJoinedDate] = useState<string>("--");
  const [skills, setSkills] = useState<string[]>([]);
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    hoursLearned: 0,
    personalBest: "0 days",
    averageGrade: "0%",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<UserProfile>({
    name: userInfo?.fullName || "",
    email: userInfo?.email || "",
    location: userInfo?.location || "",
    bio: userInfo?.bio || "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userToken) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}users/profile`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const data = response.data?.data || response.data;
        if (data) {
          // Set form data
          setFormData({
            name: data.fullName || "",
            email: data.email || "",
            location: data.location || "",
            bio: data.bio || "",
          });

          // Set profile image
          if (data.avatar) {
            setProfileImage(data.avatar);
          }

          // Set joined date
          if (data.joinedAt) {
            const date = new Date(data.joinedAt);
            setJoinedDate(date.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            }));
          }

          // Set skills
          if (data.skills) {
            setSkills(data.skills);
          }

          // Set learning progress
          if (data.learningProgress) {
            setLearningProgress(data.learningProgress);
          }

          // Set achievements
          if (data.achievements) {
            setAchievements(data.achievements);
          }

          // Set stats
          if (data.stats) {
            setStats({
              coursesCompleted: data.stats.coursesCompleted || 0,
              hoursLearned: data.stats.hoursLearned || 0,
              personalBest: "0 days",
              averageGrade: "0%",
            });
          }

          dispatch(setUserInfo(data));
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!userToken) return;
    setSaving(true);
    try {
      const form = new FormData();
      form.append("fullName", formData.name);
      form.append("location", formData.location);
      form.append("bio", formData.bio || "");

      if (fileInputRef.current?.files?.[0]) {
        form.append("avatar", fileInputRef.current.files[0]);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}users/profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data?.data || response.data;
      dispatch(setUserInfo(data));
      setFormData({
        name: data.fullName || formData.name,
        email: data.email || formData.email,
        location: data.location || formData.location,
        bio: data.bio || "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const statCards: StatCard[] = [
    { value: stats.coursesCompleted, label: "Courses Completed", icon: IoBookOutline },
    { value: stats.hoursLearned, label: "Hours Learned", icon: GoClock },
    { value: stats.personalBest, label: "Personal Best", icon: MdOutlineCalendarToday },
    { value: stats.averageGrade, label: "Average Grade", icon: LuAward },
  ];

  const progressColors = ["bg-[#FFE357]", "bg-primary", "bg-green-500", "bg-blue-500"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white w-full rounded-[15px] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 flex-1">
              <div className="flex-shrink-0 relative w-[100px] h-[100px]">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center text-white text-3xl font-bold border-2 border-purple-300 overflow-hidden shadow-sm">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    formData.name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-gray-400 text-white rounded-full border-2 border-white hover:bg-gray-500 transition-colors shadow-sm"
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

              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {formData.name || "Welcome!"}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  Student • Full Stack Developer
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <HiOutlineMail className="w-4 h-4" />
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GrLocation className="w-4 h-4 text-[#DC0A0AE5]" />
                    <span>{formData.location || "Location not set"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineCalendarToday className="w-4 h-4" />
                    <span>Joined {joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto rounded-[15px]">
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
              <div key={index} className="bg-white w-full h-full rounded-[15px] p-4 sm:p-6 border border-gray-200 hover:shadow-md transition duration-200">
                <div className="flex flex-col items-start gap-3">
                  <Icon className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto py-6 px-2 lg:px-0">
        <div className="bg-white rounded-3xl px-2 py-1 flex sm:inline-flex overflow-x-auto max-w-full gap-1">
          {(["overview", "completed", "achievements"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-semibold text-sm rounded-3xl transition duration-200 whitespace-nowrap flex-shrink-0 ${
                activeTab === tab ? "bg-primary text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "overview" ? "Overview" : tab === "completed" ? "Completed Courses" : "Achievements"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="max-w-6xl mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Learning Progress */}
            <div className="bg-white rounded-[15px] h-max py-4">
              <h2 className="text-xl font-bold text-gray-900 px-4 py-4 mb-6">Learning Progress</h2>
              <div className="space-y-6 px-4">
                {learningProgress.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">
                    No courses in progress yet. Start a course to track your progress!
                  </p>
                ) : (
                  learningProgress.map((item, index) => (
                    <div key={item.courseId}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">{item.course}</span>
                        <span className="text-sm font-semibold text-gray-600">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`${progressColors[index % progressColors.length]} h-3 rounded-full transition duration-300`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-[15px] p-6 h-max">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
              <div className="flex flex-col gap-4">
                {achievements.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">
                    No achievements yet. Complete courses to earn achievements!
                  </p>
                ) : (
                  achievements.map((achievement) => (
                    <div key={achievement._id} className="rounded-lg p-4">
                      <div className="flex gap-3 items-center">
                        <div className="bg-gray-100 rounded-[12px] p-2.5 flex-shrink-0">
                          <LuAward className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{achievement.badge}</h3>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {skills.length === 0 ? (
                <p className="text-gray-400 text-sm">No skills added yet.</p>
              ) : (
                skills.map((skill, index) => (
                  <button key={index} className="bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-primary px-4 py-2 rounded-full text-sm font-medium transition duration-200">
                    {skill}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "completed" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
            <p className="text-gray-600">Completed courses content coming soon...</p>
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
          <div className="bg-white rounded-[20px] shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} size="small" />
              <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} icon={<HiOutlineMail className="w-5 h-5" />} size="small" />
              <Input label="Location" name="location" value={formData.location} onChange={handleChange} icon={<HiMapPin className="w-5 h-5" />} size="small" />
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" fullWidth onClick={() => setIsModalOpen(false)} className="rounded-[15px]">
                Cancel
              </Button>
              <Button fullWidth onClick={handleSave} loading={saving} loadingText="Saving..." className="rounded-[15px]">
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
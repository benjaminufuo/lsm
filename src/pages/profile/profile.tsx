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
    <div>profile</div>
  )
}

export default Profile
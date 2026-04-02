import type { CourseCardType } from "../types/type";
import reactImg from "../../../assets/react-img.jpg";
import pythonImg from "../../../assets/python-img.jpg";
import digitalMarketingImg from "../../../assets/digitalMarketing-img.jpg";
import webAppDevImg from "../../../assets/mobileAppDevelopment-img.jpg";
import uiUxDesignImg from "../../../assets/uiUxDesign-img.jpg";
import machineLearningImg from "../../../assets/machineLearning-img.jpg";
import instructorImg from "../../../assets/testImg.jpg";

export const coursesMock: CourseCardType[] = [
  {
    id: "1",
    courseTitle: "Advanced React Development",
    courseDescription:
      "Master advanced React concepts including hooks, context, performance optimization, and modern patterns. Build production-ready applications with confidence.",
    instructor: {
      name: "Dr. Emily Zhang",
      description:
        "Senior Software Engineer at Meta with 10+ years of experience in React development. Passionate about teaching and sharing knowledge with the community.",
      image: instructorImg,
    },
    timeDetail: "12 hours",
    peopleDetail: "2.4k",
    ratingDetail: "4.8",
    courseProgress: "68%",
    courseImage: reactImg,
  },
  {
    id: "2",
    courseTitle: "UI/UX Design Fundamentals",
    instructor: {
      name: "Prof. Marcus Chen",
      description: "Some description",
      image: instructorImg,
    },
    timeDetail: "10 hours",
    peopleDetail: "3.4k",
    ratingDetail: "4.8",
    courseProgress: "45%",
    courseImage: uiUxDesignImg,
  },
  {
    id: "3",
    courseTitle: "Data Science with Python",
    instructor: {
      name: "Dr. Sarah Johnson",
      description: "Some description",
      image: instructorImg,
    },
    timeDetail: "16 hours",
    peopleDetail: "1.8k",
    ratingDetail: "4.6",
    courseProgress: "82%",
    courseImage: pythonImg,
  },
  {
    id: "4",
    courseTitle: "Machine Learning Fundamentals",
    instructor: {
      name: "Dr. Alex Kumar",
      description: "Some description",
      image: instructorImg,
    },
    timeDetail: "20 hours",
    peopleDetail: "2.9k",
    ratingDetail: "4.8",
    courseProgress: "68%",
    courseImage: machineLearningImg,
  },
  {
    id: "5",
    courseTitle: "Mobile App Development",
    instructor: {
      name: "Prof. Lisa Wang",
      description: "Some description",
      image: instructorImg,
    },
    timeDetail: "14 hours",
    peopleDetail: "2.2k",
    ratingDetail: "4.8",
    courseProgress: "60%",
    courseImage: webAppDevImg,
  },
  {
    id: "6",
    courseTitle: "Digital Marketing Strategy",
    instructor: {
      name: "Maria Rodriguez",
      description: "Some description",
      image: instructorImg,
    },
    timeDetail: "8 hours",
    peopleDetail: "4.2k",
    ratingDetail: "4.8",
    courseProgress: "60%",
    courseImage: digitalMarketingImg,
  },
];

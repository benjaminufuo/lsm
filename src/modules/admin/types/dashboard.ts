export type AdminDashboardStats = {
  totalUsers: number;
  totalStudents: number;
  totalCourses: number;
  totalAssignments: number;
  totalSubmissions: number;
  pendingGrading: number;
};

export type AdminDashboardCourse = {
  _id: string;
  category: string;
  instructor: string | null;
  status: string;
  thumbnail: string;
  createdAt: string;
  enrolledStudents: number;
};

export type AdminDashboardAssignment = {
  _id: string;
  title?: string;
  course?: string;
  dueDate?: string;
  status?: string;
  image?: string;
};

export type AdminDashboardResponse = {
  status: number;
  stats: AdminDashboardStats;
  recentCourses: AdminDashboardCourse[];
  recentAssignments: AdminDashboardAssignment[];
};
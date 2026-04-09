export interface NavItemType {
  name: string;
  path: string;
  icon?: React.ElementType;
}

export interface DashboardCardProps {
  title: string;
  icon: React.ElementType;
  value: string | number;
  description: string;
}

export interface CourseCardProps{
  imageUrl: string;
  title: string;
  instructor: string;
  progress: number;
  description: string;
  percentage: string;
}
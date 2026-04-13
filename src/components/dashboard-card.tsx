import type { DashboardCardProps } from "../data/types";


const DashboardCard = ({
  title,
  icon: Icon,
  value,
  descriptionNumber,
  description,
}: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-xl flex flex-col justify-between py-5 px-2 w-full md:w-1/4 shadow-md">

      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="text-[14px] font-semibold">{title}</h2>
        <Icon />
      </div>

      <div className="mb-2">
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>

      <div>
        <p className="text-[#0A2540] text-[12px] font-medium tracking-wide">{descriptionNumber } {description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;

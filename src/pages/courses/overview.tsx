import tickIcon from "../../assets/tick-icon.svg";

const Overview = () => {
  const overviewContent = [
    "Master advanced React hooks and create custom hooks",
    "Implement state management with Redux and Context API",
    "Optimize performance using React best practices",
    "Build scalable applications with modern patterns",
  ];
  return (
    <div
      className="text-[#64748B] pl-4 bg-white rounded-lg py-4
    "
    >
      <h2 className="font-bold text-[20px]">What you'll learn</h2>
      <div>
        {overviewContent.map((content, index) => (
          <div key={index} className="mt-3 flex lg:items-center gap-3">
            <div className="w-4 h-4 rounded-full border-[1.9px] border-[#64748B] flex items-center justify-center mt-2 lg:mt-0">
              <img className="" src={tickIcon} alt="tick-icon" />
            </div>
            <span className="flex-1">{content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;

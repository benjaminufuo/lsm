import tickIcon from "../../assets/tick-icon.svg";

const Overview = () => {
  return (
    <div className="text-[#64748B] pl-4 bg-white rounded-lg py-4">
      <h2 className="font-bold text-[20px]">What you'll learn</h2>
      <p className="mt-3 flex items-center gap-3">
        <div className="w-4 h-4 rounded-full border-[1.9px] border-[#64748B] flex items-center justify-center">
          <img className="" src={tickIcon} alt="tick-icon" />
        </div>
        <span className="">
          Master advanced React hooks and create custom hooks
        </span>
      </p>
      <p className="mt-3 flex items-center gap-3">
        <div className="w-4 h-4 rounded-full border-[1.9px] border-[#64748B] flex items-center justify-center">
          <img src={tickIcon} alt="tick-icon" />
        </div>
        <span>Implement state management with Redux and Context API</span>
      </p>
      <p className="mt-3 flex items-center gap-3">
        <div className="w-4 h-4 rounded-full border-[1.9px] border-[#64748B] flex items-center justify-center">
          <img src={tickIcon} alt="tick-icon" />
        </div>
        <span>Optimize performance using React best practices</span>
      </p>
      <p className="mt-3 flex items-center gap-3">
        <div className="w-4 h-4 rounded-full border-[1.9px] border-[#64748B] flex items-center justify-center">
          <img src={tickIcon} alt="tick-icon" />
        </div>
        <span>Build scalable applications with modern patterns</span>
      </p>
    </div>
  );
};

export default Overview;

import { useState } from "react";
import { type IconType } from "react-icons";
import { LuGraduationCap, LuLayoutDashboard, LuCheck } from "react-icons/lu";
import Button from "../shared/Button/Index";
import { useNavigate } from "react-router-dom";

const SelectRoll = () => {
  const navigate = useNavigate();
  const handleSignUpClick = (role: string) => {
    navigate("/signup", { state: { role } });
  };

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roleCard = [
    {
      icon: LuGraduationCap as IconType,
      title: "Student",
      buttonText: "Continue as Student",
      description: (
        <>
          Learn new skills, track progress, and complete <br /> courses
        </>
      ),
    },
    {
      icon: LuLayoutDashboard as IconType,
      title: "Admin",
      buttonText: "Continue as Admin",
      description: (
        <>
          Manage courses, users, and platform <br /> activities
        </>
      ),
    },
  ];

  return (
    <main className="w-full h-full flex py-10 px-10 flex-col items-center justify-center gap-10">
      <h1 className="relative pb-2 font-family-inter text-[36px] text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1/4 after:bg-current after:rounded-full">
        TalentFlow
      </h1>
      <div className="w-full max-w-[500px] h-auto flex flex-col items-center justify-center gap-4">
        <h2 className="text-[30px] font-family-inter text-ptext font-bold">
          Get Started with TalentFlow
        </h2>
        <span className="text-[18px] text-stext font-family-inter">
          Choose how you want to use the platform
        </span>
      </div>
      <div className="w-full flex items-center justify-center gap-10 flex-wrap">
        {roleCard.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.buttonText;

          return (
            <div
              key={role.title}
              onClick={() => setSelectedRole(role.buttonText || null)}
              className={`relative group w-[350px] h-[240px] p-4 border-[2px] rounded-[15px] flex flex-col items-start justify-center gap-4 transition-colors duration-500 ease-in-out cursor-pointer ${
                isSelected
                  ? "border-primary"
                  : "border-bordercolor hover:border-primary"
              }`}
            >
              {isSelected && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full border-[3px] border-white flex items-center justify-center shadow-md">
                  <LuCheck className="w-5 h-5" />
                </div>
              )}
              <Icon
                className={`shrink-0 w-12 h-12 p-2.5 rounded-[13px] transition-colors duration-500 ease-in-out ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-[oklch(92.8%_0.006_264.531)] group-hover:bg-primary group-hover:text-white"
                }`}
              />
              <h3 className="text-xl font-bold">{role.title}</h3>
              <p className="text-left text-sm text-stext">{role.description}</p>
              <Button
                fullWidth
                className={`rounded-[15px] transition-colors !duration-500 ease-in-out ${
                  isSelected
                    ? "!bg-primary !text-white"
                    : "!bg-[#F1F5F9] !text-ptext group-hover:!bg-primary group-hover:!text-white"
                }`}
                onClick={() => {
                  handleSignUpClick(role.buttonText || "");
                }}
              >
                {role.buttonText}
              </Button>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-stext">
        Already have an account?{" "}
        <span
          className="text-primary cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Log in
        </span>
      </p>
    </main>
  );
};

export default SelectRoll;

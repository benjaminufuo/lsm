import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuCheck } from "react-icons/lu";
import { PiGift } from "react-icons/pi";
import { MdOutlineArrowBack } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import Button from "../shared/Button/Index";
import Input from "../shared/Input/Index";
import leftimg from "../assets/signupleftbg.jpg";
import { toast } from "react-toastify";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = (location.state as { role?: string })?.role || "Student";

  const isStudent = role.includes("Student");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const isFormValid = (): boolean => {
    // Check if all fields are filled
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.agreeToTerms
    ) {
      return false;
    }

    // Check validation rules
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return false;
    }
    if (formData.password.length < 6) {
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      return false;
    }

    return true;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // --- API Call Simulation ---
      console.log("Submitting:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Account created successfully! Please log in.");
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (error) {
      toast.error("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden md:flex md:w-[60%] bg-gradient-to-br from-purple-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${leftimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Color overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#7b61ff",
            opacity: 0.2,
          }}
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center left-[100px] top-[50px] text-white">
          <h1 className="text-5xl font-bold mb-8 leading-tight">
            Start your learning
            <br />
            journey today
          </h1>

          <p className="text-lg mb-12 opacity-90 max-w-md">
            Join thousands of learners and educators transforming the way they
            teach and learn with TalentFlow.
          </p>

          {/* Features */}
          <div className="space-y-6">
            {/* Expert-led Courses */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-10 w-10 rounded-[12px] bg-purple-400">
                  <LuCheck size={20} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Expert-led Courses</h3>
                <p className="text-sm opacity-80">
                  Learn from industry professionals
                </p>
              </div>
            </div>

            {/* Track Your Progress */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-10 w-10 rounded-[12px] bg-purple-400">
                  <HiOutlineChartBar size={20} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Track Your Progress</h3>
                <p className="text-sm opacity-80">
                  Monitor your learning journey
                </p>
              </div>
            </div>

            {/* Earn Certificates */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex  items-center justify-center h-10 w-10 rounded-[12px] bg-purple-400">
                  <PiGift size={20} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Earn Certificates</h3>
                <p className="text-sm opacity-80">Showcase your achievements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-2/5 bg-gray-50 flex items-center justify-center px-4 py-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <Button
            variant="ghost"
            size="small"
            onClick={() => navigate("/")}
            icon={<MdOutlineArrowBack size={16} />}
            iconPosition="left"
            className="mb-8 !p-0 !text-gray-600 !bg-transparent"
          >
            Back to role selection
          </Button>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Signing up as {isStudent ? "Student" : "Admin"}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 border-ptext p-6 rounded-[15px] bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]"
          >
            {/* Full Name */}
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.fullName}
              icon={<FiUser className="w-5 h-5" />}
              size="small"
            />

            {/* Email Address */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              error={errors.email}
              icon={<MdOutlineMail className="w-5 h-5" />}
              size="small"
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              isPassword
              error={errors.password}
              icon={<IoLockClosedOutline className="w-5 h-5" />}
              size="small"
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              isPassword
              error={errors.confirmPassword}
              icon={<IoLockClosedOutline className="w-5 h-5" />}
              size="small"
            />

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="peer appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-[#7b61ff] checked:border-[#7b61ff] focus:outline-none focus:ring-2 focus:ring-[#7b61ff] focus:ring-offset-1 cursor-pointer transition-all"
                />
                <LuCheck
                  size={12}
                  className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity stroke-2"
                />
              </div>
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 cursor-pointer"
              >
                I agree to the{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>
            )}

            {/* Create Account Button */}
            <Button
              type="submit"
              fullWidth
              disabled={!isFormValid()}
              loading={loading}
              className="rounded-[15px]"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-600">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* OAuth Buttons */}
          <div className="flex">
            <Button
              variant="outline"
              fullWidth
              icon={<FcGoogle size={20} />}
              className="rounded-[15px]"
              style={{ borderColor: "#d1d5db" }}
            >
              Google
            </Button>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="text-purple-600 hover:underline font-medium cursor-pointer"
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

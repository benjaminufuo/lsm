import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FC } from "react";
import { LuCheck } from "react-icons/lu";
import { MdOutlineArrowBack } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import Button from "../shared/Button/Index";
import Input from "../shared/Input/Index";
import leftimg from "../assets/signinrightbg.jpg";
import { useDispatch } from "react-redux";
import { setUserToken, setUserInfo } from "../global/slice";
import { toast } from "react-toastify";

const SignIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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
    if (!formData.email.trim() || !formData.password) {
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return false;
    }
    if (formData.password.length < 6) {
      return false;
    }

    return true;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

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
      console.log("Attempting to log in with:", formData);
      const response = await new Promise<{
        token: string;
        user: { name: string; email: string };
      }>((resolve, reject) => {
        setTimeout(() => {
          // Simulate a successful login for demonstration
          if (formData.email.includes("@") && formData.password.length >= 6) {
            resolve({
              token: "a-real-jwt-token-from-your-api",
              user: { name: "Test User", email: formData.email },
            });
          } else {
            // Simulate a failed login
            reject(new Error("Invalid credentials. Please try again."));
          }
        }, 1500); // 1.5-second delay to simulate network request
      });
      // --- End of API Call Simulation ---

      dispatch(setUserToken(response.token));
      dispatch(setUserInfo(response.user));

      toast.success("Logged in successfully!");
      navigate("/learnflow/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { value: "500+", label: "Courses" },
    { value: "50K+", label: "Students" },
    { value: "4.8", label: "Rating" },
  ];

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
        <div className="relative left-[100px] top-[50px] z-10 flex flex-col justify-center p-12 text-white">
          <h1 className="text-5xl font-bold mb-8 leading-tight">
            Welcome back to
            <br />
            TalentFlow
          </h1>

          <p className="text-lg mb-12 opacity-90 max-w-md">
            Continue your learning journey and unlock your full potential with
            TalentFlow.
          </p>

          {/* Stats */}
          <div className=" flex gap-4 flex-wrap">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start justify-center h-25 w-25  bg-purple-500 bg-opacity-50 backdrop-blur-sm rounded-lg px-6 py-4 text-white"
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-2/5 bg-white flex flex-col justify-center px-4 py-12 md:px-16">
        <div className="max-w-md">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 text-sm font-medium"
          >
            <MdOutlineArrowBack size={18} />
            Back
          </button>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Log in to continue your learning journey
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 border-ptext p-6 rounded-[15px] bg-white shadow-sm"
          >
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 transition-all checked:border-[#7b61ff] checked:bg-[#7b61ff] focus:outline-none focus:ring-2 focus:ring-[#7b61ff] focus:ring-offset-1"
                  />
                  <LuCheck
                    size={12}
                    className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 transition-opacity stroke-2 peer-checked:opacity-100"
                  />
                </div>
                <label
                  htmlFor="rememberMe"
                  className="cursor-pointer text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-purple-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              disabled={!isFormValid()}
              loading={loading}
              className="rounded-[15px]"
            >
              Log In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">
                or continue with
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="flex">
            <Button
              type="button"
              variant="outline"
              style={{ borderColor: "#d1d5db" }}
              className="rounded-[8px]"
              fullWidth
            >
              <FcGoogle className="w-5 h-5" />
              Google
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

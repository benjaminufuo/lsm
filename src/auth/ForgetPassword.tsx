import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail, MdOutlineArrowBack } from "react-icons/md";
import Button from "../shared/Button/Index";
import Input from "../shared/Input/Index";
import axios from "axios";
import { toast } from "react-toastify";

export const ForgotPassword = (): React.ReactNode => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}auth/forgot-password`,
        { email },
      );

      toast.success(response?.data?.message || "Password reset link sent!");
      setSubmitted(true);
      navigate("/check-email", { state: { email } });
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to send reset link. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-12">
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] p-6 md:p-10">
        {/* Back Link */}
        <Button
          variant="ghost"
          size="small"
          onClick={() => navigate("/signin")}
          icon={<MdOutlineArrowBack size={16} />}
          iconPosition="left"
          className="mb-8 !p-0 !text-gray-600 !bg-transparent"
        >
          Back to login
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="john@example.com"
            icon={<MdOutlineMail className="w-5 h-5" />}
            size="small"
          />

          <Button
            type="submit"
            fullWidth
            loading={loading}
            loadingText="Sending..."
            disabled={!email.trim() || submitted}
            className="rounded-[15px]"
          >
            {submitted ? "Reset Link Sent!" : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

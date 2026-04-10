import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineMail, MdOutlineArrowBack } from "react-icons/md";
import Button from "../shared/Button/Index";
import axios from "axios";
import { toast } from "react-toastify";

const CheckEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the email passed from the ForgotPassword page, or show a fallback
  const email = location.state?.email || "your email address";

  const [resendClicked, setResendClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResendEmail = async () => {
    // Prevent calling the API if the email is the fallback string or invalid
    if (email === "your email address" || !email.includes("@")) {
      toast.error("Invalid email address. Please request a new reset link.");
      return;
    }

    setLoading(true);

    // --- API Call Simulation ---
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}auth/resend-reset-password`,
        { email },
      );
      setLoading(false);
      setResendClicked(true);
      toast.success(
        response?.data?.message || "Verification email resent successfully!",
      );
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message ||
          "Failed to resend verification email.",
      );
    }
  };

  const handleOpenEmailApp = (): void => {
    if (email && email.includes("@")) {
      const domain = email.split("@")[1].toLowerCase();
      if (domain === "gmail.com") {
        window.open("https://mail.google.com", "_blank");
        return;
      } else if (domain === "yahoo.com" || domain === "ymail.com") {
        window.open("https://mail.yahoo.com", "_blank");
        return;
      } else if (domain === "outlook.com" || domain === "hotmail.com") {
        window.open("https://outlook.live.com", "_blank");
        return;
      } else if (domain === "icloud.com") {
        window.open("https://mail.me.com", "_blank");
        return;
      } else if (domain === "mailinator.com") {
        window.open("https://www.mailinator.com", "_blank");
        return;
      }
    }

    // Fallback to default system mail client if webmail isn't recognized
    window.location.href = "mailto:";
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
          className="mb-8 !p-0 !text-gray-600 !bg-transparent hover:!bg-transparent"
        >
          Back to login
        </Button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-[#7b61ff]/10 text-primary rounded-full flex items-center justify-center">
            <MdOutlineMail size={40} />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Check your email
          </h2>
          <p className="text-gray-600 text-sm">
            We've sent a password reset link to <br />
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>

        <div className="space-y-4">
          {/* Open Email App Button */}
          <Button
            onClick={handleOpenEmailApp}
            fullWidth
            className="rounded-[15px]"
          >
            Open Email App
          </Button>

          {/* Resend Email Section */}
          <div className="pt-4 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Didn't receive the email? Check your spam folder or try resending.
            </p>
            <Button
              variant="outline"
              onClick={handleResendEmail}
              fullWidth
              loading={loading}
              loadingText="Sending..."
              disabled={resendClicked}
              className="rounded-[15px]"
            >
              {resendClicked ? "Email Sent!" : "Resend Email"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdCheckCircle, MdOutlineArrowBack } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoLockClosedOutline } from "react-icons/io5";
import Button from "../shared/Button/Index";
import Input from "../shared/Input/Index";
import { toast } from "react-toastify";
import PasswordSuccessModal from "../components/ResetPasswordSuccessModal";
import axios from "axios";

interface CreatePasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

interface CreatePasswordProps {
  onPasswordReset?: (formData: CreatePasswordFormData) => void;
  onBackToLogin?: () => void;
}

interface PasswordRequirements {
  minLength: boolean;
  hasNumberOrSymbol: boolean;
}

export default function CreatePassword({
  onPasswordReset,
  onBackToLogin,
}: CreatePasswordProps): React.ReactNode {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Check password requirements
  const passwordRequirements: PasswordRequirements = {
    minLength: newPassword.length >= 8,
    hasNumberOrSymbol: /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      newPassword,
    ),
  };

  const isFormValid: boolean =
    newPassword.length >= 8 &&
    /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) &&
    newPassword === confirmPassword &&
    confirmPassword.length > 0;

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    if (!token) {
      toast.error("Invalid or missing reset token. Please request a new link.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}auth/reset-password/${token}`,
        { password: newPassword },
      );
      toast.success(response.data.message);
      setNewPassword("");
      setConfirmPassword("");
      setShowSuccessModal(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (showSuccessModal) {
    return <PasswordSuccessModal onGoToLogin={() => navigate("/signin")} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-12">
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] p-6 md:p-10">
        {/* Back Link */}
        <Button
          variant="ghost"
          size="small"
          onClick={onBackToLogin || (() => navigate("/signin"))}
          icon={<MdOutlineArrowBack size={16} />}
          iconPosition="left"
          className="mb-8 !p-0 !text-gray-600 !bg-transparent hover:!bg-transparent"
        >
          Back
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create new password
          </h2>
          <p className="text-gray-600 text-sm">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <Input
            label="Enter new password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="••••••••"
            isPassword
            icon={<IoLockClosedOutline className="w-5 h-5" />}
            size="small"
          />

          <Input
            label="Confirm new password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="••••••••"
            isPassword
            error={
              confirmPassword && newPassword !== confirmPassword
                ? "Passwords do not match"
                : ""
            }
            icon={<IoLockClosedOutline className="w-5 h-5" />}
            size="small"
          />

          {/* Password Requirements */}
          <div className="bg-gray-50 border border-gray-100 rounded-[12px] p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Password must contain:
            </p>
            <div className="space-y-2">
              {/* At least 8 characters */}
              <div className="flex items-center gap-2">
                {passwordRequirements.minLength ? (
                  <MdCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                ) : (
                  <RxCross2 className="text-gray-400 text-lg flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    passwordRequirements.minLength
                      ? "text-green-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  At least 8 characters
                </span>
              </div>

              {/* Numbers or symbols */}
              <div className="flex items-center gap-2">
                {passwordRequirements.hasNumberOrSymbol ? (
                  <MdCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                ) : (
                  <RxCross2 className="text-gray-400 text-lg flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    passwordRequirements.hasNumberOrSymbol
                      ? "text-green-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Include numbers or symbols
                </span>
              </div>
            </div>
          </div>

          {/* Reset Password Button */}
          <Button
            type="submit"
            fullWidth
            loading={loading}
            loadingText="Resetting..."
            disabled={!isFormValid}
            className="rounded-[15px]"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

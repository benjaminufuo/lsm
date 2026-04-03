import { MdCheckCircle } from "react-icons/md";
import Button from "../shared/Button/Index";

interface PasswordSuccessModalProps {
  onGoToLogin?: () => void;
}

const PasswordSuccessModal = ({
  onGoToLogin,
}: PasswordSuccessModalProps): React.ReactNode => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-12">
      {/* Modal Card */}
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] p-6 md:p-10 text-center flex flex-col items-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
            <MdCheckCircle size={40} />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Password reset successful
          </h2>
          <p className="text-gray-600 text-sm">
            We will now log you in with your new password.
          </p>
        </div>

        {/* Go to Login Button */}
        <Button onClick={onGoToLogin} fullWidth className="rounded-[15px]">
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default PasswordSuccessModal;

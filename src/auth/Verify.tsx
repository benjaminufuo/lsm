import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import Button from "../shared/Button/Index";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        toast.error("No verification token found in the URL.");
        setLoading(false);
        return;
      }

      try {
        // --- ACTUAL API CALL (Uncomment when backend is ready) ---
        // await axios.post(`${import.meta.env.VITE_BASE_URL}auth/verify-email`, { token });

        // Simulated Network Request
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsVerified(true);
        toast.success("Account verified successfully!");
      } catch (error) {
        toast.error("Verification failed. The link might be expired.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-[15px] shadow-sm text-center max-w-md w-full">
        {isVerified ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Successful!
            </h2>
            <p className="text-gray-600 mb-8">
              Your email has been verified. You can now access your dashboard.
            </p>
            <Button
              fullWidth
              className="rounded-[15px]"
              onClick={() => navigate("/signin")}
            >
              Log In Now
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-8">
              The verification link is invalid or has expired.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;

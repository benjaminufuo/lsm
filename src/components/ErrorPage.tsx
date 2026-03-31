import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import Button from "../shared/Button/Index";
import { MdErrorOutline, MdOutlineArrowBack } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  let errorMessage = "An unexpected error occurred.";
  let errorCode = "Oops!";

  if (isRouteErrorResponse(error)) {
    errorCode = error.status.toString();
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12 text-center">
      <div className="bg-white p-8 md:p-12 rounded-[20px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] max-w-lg w-full flex flex-col items-center transition-all">
        <div className="h-20 w-20 bg-[#7b61ff]/10 text-primary rounded-full flex items-center justify-center mb-6">
          <MdErrorOutline size={40} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          {errorCode}
        </h1>

        <p className="text-lg text-gray-600 mb-8">{errorMessage}</p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            icon={<MdOutlineArrowBack size={18} />}
            className="w-full sm:w-auto rounded-[15px]"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            icon={<IoHomeOutline size={18} />}
            className="w-full sm:w-auto rounded-[15px]"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

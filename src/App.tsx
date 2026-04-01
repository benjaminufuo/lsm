import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainHolder from "./routes/MainHolder";
import PrivateRoute from "./routes/PrivateRoute";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import SelectRoll from "./auth/SelectRoll";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cousrse from "./pages/courses/courses";
import Assignments from "./pages/assignments/assignment";
import Profile from "./pages/profile/profile";
import ForgotPassword from "./auth/ForgetPassword";
import CheckEmail from "./auth/CheckEmail";
import CreatePassword from "./auth/CreatePassword";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/",
      element: <SelectRoll />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/check-email",
      element: <CheckEmail />,
    },
    {
      path: "create-password",
      element: <CreatePassword />,
    },
    {
      path: "/learnflow",
      element: <PrivateRoute />,
      children: [
        {
          element: <MainHolder />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "courses",
              element: <Cousrse />,
            },
            {
              path: "assignments",
              element: <Assignments />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

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
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./modules/admin/pages/AdminDashboardPage";
import AdminCoursesPage from "./modules/admin/pages/AdminCoursesPage";
import AdminAssignmentsPage from "./modules/admin/pages/AdminAssignmentsPage.tsx";
import AdminUsersPage from "./modules/admin/pages/AdminUsersPage";

import CourseDetail from "./pages/courses/courseDetail";
import Overview from "./pages/courses/overview";

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
      path: "/create-password",
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
              path: "courses/:courseId",
              element: <CourseDetail />,
              children: [{ path: "overview", element: <Overview /> }],
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
        {
          path: "admin",
          element: <PrivateRoute allowableRoles={["admin"]} />,
          errorElement: <ErrorPage />,

          children: [
            {
              path: "",
              element: <AdminLayout />,
              children: [
                {
                  index: true,
                  element: <AdminDashboardPage />,
                },
                {
                  path: "dashboard",
                  element: <AdminDashboardPage />,
                },
                {
                  path: "courses",
                  element: <AdminCoursesPage />,
                },
                {
                  path: "assignments",
                  element: <AdminAssignmentsPage />,
                },
                {
                  path: "users",
                  element: <AdminUsersPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

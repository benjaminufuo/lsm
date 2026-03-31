import { createBrowserRouter, RouterProvider } from "react-router";
import MainHolder from "./routes/MainHolder";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import SelectRoll from "./auth/SelectRoll";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cousrse from "./pages/courses/courses";
import Assignments from "./pages/assignments/assignment";
import Profile from "./pages/profile/profile";
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
      path: "/learnflow",
      element: <MainHolder />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: "courses",
          element: <Cousrse/>
        },
        {
          path: "assignments",
          element: <Assignments />
        },
        {
          path: "profile",
          element: <Profile />
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

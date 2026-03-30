import { createBrowserRouter, RouterProvider } from "react-router";
import MainHolder from "./routes/MainHolder";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import SelectRoll from "./auth/SelectRoll";
const App = () => {
  const router = createBrowserRouter([
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
      path: "/",
      element: <MainHolder />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

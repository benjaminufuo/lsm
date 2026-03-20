import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainHolder from "./routes/MainHolder";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainHolder />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

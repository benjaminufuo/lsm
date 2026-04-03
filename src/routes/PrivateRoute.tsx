import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../global/store";

interface PrivateRouteProps {
  allowableRoles?: string[]; // Optional prop to specify allowed roles
}
const PrivateRoute = ({ allowableRoles }: PrivateRouteProps) => {
  const userToken = useSelector(
    (state: RootState) => state.learnFlow.userToken,
  );
  const userInfo = useSelector((state: RootState) => state.learnFlow.userInfo);
  // Check if the user is authenticated
  if (!userToken) {
    return <Navigate to="/signin" replace />;
  }

  // Check if the user has an allowed role
  if (
    allowableRoles &&
    userInfo &&
    !allowableRoles.includes((userInfo as { role: string }).role)
  ) {
    return <Navigate to="/learnflow/dashboard" replace />;
  }

  return <>{<Outlet />}</>;
};

export default PrivateRoute;

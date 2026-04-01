import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../global/store";
const PrivateRoute = () => {
  const userToken = useSelector(
    (state: RootState) => state.learnFlow.userToken,
  );
  return <>{userToken ? <Outlet /> : <Navigate to="/signin" />}</>;
};

export default PrivateRoute;

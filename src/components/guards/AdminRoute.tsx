import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppLoader from "@shared/AppLoader";
import type { RootState } from '@store/index';
import { useSelector } from 'react-redux';

type AdminRouteProps = {
  children: ReactNode;
};

function AdminRoute({ children }: AdminRouteProps) {
  const location = useLocation();

  const { data: currentUser, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  if (loading) {
    return <AppLoader />;
  }

  if (!currentUser?.user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (currentUser.user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;

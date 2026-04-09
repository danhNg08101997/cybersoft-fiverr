import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import type {RouteType} from "./types.ts";

const routes: RouteType[] = [
  {
    path: '',
    element: lazy(() => import('@pages/HomeTemplate')),
    nested: [
      {
        path: '',
        element: lazy(() => import('@pages/HomeTemplate/Home')),
      },
    ],
  },
  {
    path: 'danh-sach-cong-viec',
    element: lazy(() => import('@pages/JobListTemplate')),
  },
  {
    path: 'danh-sach-cong-viec-va-loai-cong-viec',
    element: lazy(() => import('@pages/JobListAndJobType')),
  },
  {
    path: 'chi-tiet-cong-viec',
    element: lazy(() => import('@pages/JobDetailTemplate')),
  },
  {
    path: 'admin',
    element: lazy(() => import('@pages/AdminTemplate')),
    nested: [
      {
        path: '',
        element: lazy(async () => ({
          default: () => <Navigate to="/admin/dashboard" replace />,
        })),
      },
      {
        path: 'dashboard',
        element: lazy(() => import('@pages/AdminTemplate/_pages/Dashboard')),
      },
      {
        path: 'users',
        element: lazy(() => import('@pages/AdminTemplate/_pages/UserManagement')),
      },
      {
        path: 'jobs',
        element: lazy(() => import('@pages/AdminTemplate/_pages/JobManagement')),
      },
      {
        path: 'orders',
        element: lazy(() => import('@pages/AdminTemplate/_pages/OrderManagement')),
      },
    ],
  },
  {
    path: 'trang-ca-nhan',
    element: lazy(() => import('@pages/ProfileTemplate')),
  },
  {
    path: '*',
    element: lazy(() => import('@pages/PageNotFound')),
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((nestedRoute) => (
            <Route
              key={`${route.path}-${nestedRoute.path}`}
              path={nestedRoute.path}
              element={<nestedRoute.element />}
            />
          ))}
        </Route>
      );
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={<route.element />}
      />
    );
  });
};
import AdminSidebar from '@pages/AdminTemplate/_Components/AdminSidebar';
import AdminTopbar from '@pages/AdminTemplate/_Components/AdminTopbar';
import { Outlet } from 'react-router-dom';
import type { JSX } from 'react';
import AdminRoute from '@guards/AdminRoute';

function AdminTemplate(): JSX.Element {
  return (
    <AdminRoute>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />

        <div className="flex flex-1 flex-col">
          <AdminTopbar />

          <main className="p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminRoute>
  );
}

export default AdminTemplate;
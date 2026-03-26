import type { JSX } from 'react';

function JobManagement(): JSX.Element {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-bold text-slate-900">Job Management</h2>
      <p className="mt-2 text-sm text-slate-500">
        Trang này sẽ quản lý danh sách công việc, trạng thái và hành động quản trị.
      </p>
    </div>
  );
}

export default JobManagement;
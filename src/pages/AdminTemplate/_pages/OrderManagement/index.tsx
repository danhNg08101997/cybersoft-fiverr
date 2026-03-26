import type { JSX } from 'react';

function OrderManagement(): JSX.Element {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-bold text-slate-900">Order Management</h2>
      <p className="mt-2 text-sm text-slate-500">
        Trang này sẽ quản lý danh sách đơn thuê công việc, trạng thái và xử lý nghiệp vụ.
      </p>
    </div>
  );
}

export default OrderManagement;
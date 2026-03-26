import { LayoutDashboard, Users, Briefcase, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { JSX } from 'react';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 transition ${
    isActive ? 'bg-white/10 text-green-400' : 'text-white hover:text-green-400'
  }`;

export default function AdminSidebar(): JSX.Element {
  return (
    <aside className="flex w-64 flex-col bg-[#111827] p-6 text-white">
      <h1 className="mb-10 text-2xl font-bold">Fiverr Quản Trị</h1>

      <nav className="space-y-4">
        <NavLink to="dashboard" className={navClass}>
          <LayoutDashboard size={20} />
          Trang chủ
        </NavLink>

        <NavLink to="users" className={navClass}>
          <Users size={20} />
          Quản lý người dùng
        </NavLink>

        <NavLink to="jobs" className={navClass}>
          <Briefcase size={20} />
          Quản lý công việc
        </NavLink>

        <NavLink to="orders" className={navClass}>
          <ShoppingCart size={20} />
          Quản lý công việc thuê
        </NavLink>
      </nav>
    </aside>
  );
}
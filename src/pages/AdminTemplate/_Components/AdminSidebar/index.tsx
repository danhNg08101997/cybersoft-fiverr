import { LayoutDashboard, Users, Briefcase, ShoppingCart } from "lucide-react";
import {NavLink} from "react-router-dom";

export default function AdminSidebar() {
    return (
        <aside className="w-64 bg-[#111827] text-white flex flex-col p-6">

            <h1 className="text-2xl font-bold mb-10">
                Fiverr Quản Trị
            </h1>

            <nav className="space-y-4">

                <NavLink to="dashboard" className="flex items-center gap-3 hover:text-green-400">
                    <LayoutDashboard size={20} />
                    Trang chủ
                </NavLink>

                <NavLink to="users" className="flex items-center gap-3 hover:text-green-400">
                    <Users size={20} />
                    Quản lý người dùng
                </NavLink>

                <NavLink to="jobs" className="flex items-center gap-3 hover:text-green-400">
                    <Briefcase size={20} />
                    Quản lý công việc
                </NavLink>

                <NavLink to="orders" className="flex items-center gap-3 hover:text-green-400">
                    <ShoppingCart size={20} />
                    Quản lý công việc thuê
                </NavLink>

            </nav>

        </aside>
    );
}
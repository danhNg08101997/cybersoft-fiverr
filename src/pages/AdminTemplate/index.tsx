import AdminSidebar from "@pages/AdminTemplate/_Components/AdminSidebar";
import AdminTopbar from "@pages/AdminTemplate/_Components/AdminTopbar";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "@store/index.ts";
import {type JSX, useEffect} from "react";


function AdminTemplate(): JSX.Element {

    const navigate = useNavigate();

    const {data: currentUser} = useSelector((state: RootState) => state.loginReducer);

    useEffect(() => {
        if (currentUser?.user?.role !== "ADMIN") {
            console.log("🚀 ~ AdminTemplate ~ currentUser?.user?.role: ", currentUser?.user?.role);
            navigate("/");
            return;
        }
    }, [currentUser]);


    return (
        <div className="flex min-h-screen bg-gray-100">

            <AdminSidebar/>

            <div className="flex-1 flex flex-col">

                <AdminTopbar/>

                <main className="p-8">
                    <Outlet/>
                </main>

            </div>

        </div>
    );
}

export default AdminTemplate;
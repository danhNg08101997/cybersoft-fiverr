import {Outlet} from "react-router-dom";
import NavbarHome from "@pages/HomeTemplate/_Components/NavbarHome";

function HomeTemplate() {
    return (
        <div className="w-full min-h-screen bg-white">
            <NavbarHome/>
            <Outlet/>

        </div>
    );
}

export default HomeTemplate;
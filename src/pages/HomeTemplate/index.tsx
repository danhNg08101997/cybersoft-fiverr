import {Outlet} from "react-router-dom";
import NavbarHome from "@pages/HomeTemplate/_Components/NavbarHome";
import FooterHome from "@components/Footer";

function HomeTemplate() {
    return (
        <div className="w-full min-h-screen bg-white">
            <NavbarHome/>
            <Outlet/>
            <FooterHome/>
        </div>
    );
}

export default HomeTemplate;
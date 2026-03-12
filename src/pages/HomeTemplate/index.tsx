import {Outlet} from "react-router-dom";
import FooterHome from "@components/Footer";
import Navbar from "@components/Navbar";

function HomeTemplate() {
    return (
        <div className="w-full min-h-screen bg-white">
            <Navbar variant="HOME" />
            <Outlet/>
            <FooterHome/>
        </div>
    );
}

export default HomeTemplate;
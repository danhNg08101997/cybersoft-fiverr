import {Outlet} from "react-router-dom";
import NavbarHome from "@pages/HomeTemplate/_Components/NavbarHome";

function HomeTemplate() {
    return (
        <div>
            <NavbarHome/>
            <Outlet/>

        </div>
    );
}

export default HomeTemplate;
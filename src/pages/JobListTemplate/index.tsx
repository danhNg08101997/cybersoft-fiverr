import NavBarJobList from "@pages/JobListTemplate/_Components/NavBar";
import {useLocation} from "react-router-dom";
import TopCategoryBar from "@pages/JobListTemplate/_Components/TopCategoryBar";
import FooterHome from "@components/Footer";

function JobListTemplate() {

    const {state} = useLocation();
    console.log("🚀 ~ JobListTemplate ~ state: ", state);

    return (
        <>
            <NavBarJobList />
            <TopCategoryBar />
            <FooterHome />
        </>
    );
}

export default JobListTemplate;
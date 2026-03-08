import React from "react";
import JobListNavbar from "@pages/JobListTemplate/_Components/NavBar";
import TopCategoryBar from "@pages/JobListTemplate/_Components/TopCategoryBar";

function JobList(): React.JSX.Element {

    return (
        <div >
            <JobListNavbar />
            <TopCategoryBar/>
        </div>
    );
}

export default JobList;
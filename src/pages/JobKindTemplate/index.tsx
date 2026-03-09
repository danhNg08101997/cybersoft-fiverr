import {useNavigate, useSearchParams} from "react-router-dom";
import JobListNavbar from "@pages/JobListTemplate/_Components/NavBar";
import {useState} from "react";
import TopCategoryBar from "@pages/JobListTemplate/_Components/TopCategoryBar";

function JobKindTemplate() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const jobKind = searchParams.get("jobKind") ?? "".trim()
    console.log("🚀 ~ JobKindTemplate ~ jobKind: ", jobKind);

    // giá trị đang gõ trong ô search
    const [inputValue, setInputValue] = useState<string>(searchParams.get("keyword") ?? "".trim());

    const handleSearch = (value: string) => {
        navigate(`/job-list?keyword=${value.trim()}`);
    };
    return (
        <div className="min-h-screen bg-white">
            <JobListNavbar
                inputValue={inputValue}
                onChangeInput={setInputValue}
                onSearch={handleSearch}
            />
            <TopCategoryBar/>

        </div>
    );
}

export default JobKindTemplate;
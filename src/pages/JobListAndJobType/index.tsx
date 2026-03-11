import Navbar from "@components/Navbar";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import TopCategoryBar from "@pages/JobListTemplate/_Components/TopCategoryBar";
import FooterHome from "@components/Footer";
import JobTypeContent from "@pages/JobListAndJobType/_Components/JobTypeContent";
import JobTypeCarousel from "@pages/JobListAndJobType/_Components/JobTypeCarousel";
import RelatedServicesSection from "@pages/JobListAndJobType/_Components/RelatedServicesSection";

function JobListAndJobType() {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState<string>(searchParams.get("keyword") ?? "".trim());

    const handleSearch = (value: string) => {
        navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(value.trim())}`);
    };

    return (
        <>
            <Navbar
                variant="jobList"
                inputValue={inputValue}
                onChangeInput={setInputValue}
                onSearch={handleSearch}
            />
            <TopCategoryBar/>
            <JobTypeCarousel/>
            <JobTypeContent/>
            <RelatedServicesSection/>
            <FooterHome/>
        </>
    );
}

export default JobListAndJobType;
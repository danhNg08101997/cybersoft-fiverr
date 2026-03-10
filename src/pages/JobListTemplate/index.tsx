import React, {useState} from "react";
import TopCategoryBar from "@pages/JobListTemplate/_Components/TopCategoryBar";
import JobSearchHeader from "@pages/JobListTemplate/_Components/JobSearchHeader";
import JobListContent from "@pages/JobListTemplate/_Components/JobListContent";
import {useNavigate, useSearchParams} from "react-router-dom";
import FooterHome from "@components/Footer";
import Navbar from "@components/Navbar";

export default function JobList(): React.JSX.Element {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    // giá trị đang gõ trong ô search
    const [inputValue, setInputValue] = useState<string>(searchParams.get("keyword") ?? "".trim());

    const [getLength, setGetLength] = useState<number>(0);

    const [maChiTietLoai] = useState<string>(searchParams.get("maChiTietLoai") ?? "".trim())
    // giá trị đã bấm Search để truyền sang JobListContent
    const [keyword, setKeyword] = useState("");

    const handleSearch = (value: string) => {
        setKeyword(value.trim());
        navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(value.trim())}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar
                variant="jobList"
                inputValue={inputValue}
                onChangeInput={setInputValue}
                onSearch={handleSearch}
            />
            <TopCategoryBar/>
            <JobSearchHeader getLength = {getLength} />
            <JobListContent keyword={keyword} maChiTietLoai = {maChiTietLoai} inputValue = {inputValue} getLength={setGetLength} />
            <FooterHome/>
        </div>
    );
}
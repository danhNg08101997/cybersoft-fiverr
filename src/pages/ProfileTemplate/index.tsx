import Navbar from "@components/Navbar";
import TopCategoryBar from "@pages/JobListTemplate/_Components/TopCategoryBar";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ProfileSidebar from "@pages/ProfileTemplate/_Component/ProfileSidebar";
import GigManagement from "@pages/ProfileTemplate/_Component/GigManagement";

function ProfileTemplate() {

    const [inputValue, setInputValue] = useState<string>("");

    const navigate = useNavigate();

    const handleSearch = (value: string) => {
        navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(value.trim())}`);
    };

    return (
        <>
            <Navbar
                variant="JOB"
                inputValue={inputValue}
                onChangeInput={setInputValue}
                onSearch={handleSearch}
            />
            <TopCategoryBar/>
            <section className="bg-gray-100 min-h-screen py-8">
                <div className="mx-auto max-w-[1200px] px-6 grid grid-cols-12 gap-6">

                    {/* LEFT SIDEBAR */}
                    <div className="col-span-4">
                        <ProfileSidebar />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="col-span-8">
                        <GigManagement />
                    </div>

                </div>
            </section>
        </>
    );
}

export default ProfileTemplate;
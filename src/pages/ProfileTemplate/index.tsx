// import Navbar from '@components/Navbar/index.backup.tsx';
import TopCategoryBar from '@pages/JobListTemplate/_Components/TopCategoryBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProfileSidebar from '@pages/ProfileTemplate/_Component/ProfileSidebar';
import GigManagement from '@pages/ProfileTemplate/_Component/GigManagement';
import type { JSX } from 'react';
import NavbarMainPage from "@components/Navbar/page.tsx";

function ProfileTemplate(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(value.trim())}`);
  };

  return (
    <>
      <NavbarMainPage
        variant="JOB"
        inputValue={inputValue}
        onChangeInput={setInputValue}
        onSearch={handleSearch}
      />
      <TopCategoryBar />
      <section className="min-h-screen bg-gray-100 py-8">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ProfileSidebar />
          </div>

          <div className="lg:col-span-8">
            <GigManagement />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfileTemplate;
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopCategoryBar from '@pages/JobListTemplate/_Components/TopCategoryBar';
import FooterHome from '@components/Footer';
import JobTypeContent from '@pages/JobListAndJobType/_Components/JobTypeContent';
import JobTypeCarousel from '@pages/JobListAndJobType/_Components/JobTypeCarousel';
import RelatedServicesSection from '@pages/JobListAndJobType/_Components/RelatedServicesSection';
import type { JSX } from 'react';
import NavbarMainPage from "@components/Navbar/page.tsx";

function JobListAndJobType(): JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlKeyword = searchParams.get('keyword')?.trim() ?? '';
  const [inputValue, setInputValue] = useState<string>(urlKeyword);

  useEffect(() => {
    setInputValue(urlKeyword);
  }, [urlKeyword]);

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
      <JobTypeCarousel />
      <JobTypeContent />
      <RelatedServicesSection />
      <FooterHome />
    </>
  );
}

export default JobListAndJobType;
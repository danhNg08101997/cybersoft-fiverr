import React, { useEffect, useState } from 'react';
import TopCategoryBar from '@pages/JobListTemplate/_Components/TopCategoryBar';
import JobSearchHeader from '@pages/JobListTemplate/_Components/JobSearchHeader';
import JobListContent from '@pages/JobListTemplate/_Components/JobListContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FooterHome from '@components/Footer';
import Navbar from '@components/Navbar';

export default function JobList(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlKeyword = searchParams.get('keyword')?.trim() ?? '';
  const urlMaChiTietLoai = searchParams.get('maChiTietLoai')?.trim() ?? '';

  const [inputValue, setInputValue] = useState<string>(urlKeyword);
  const [keyword, setKeyword] = useState<string>(urlKeyword);
  const [getLength, setGetLength] = useState<number>(0);

  useEffect(() => {
    setInputValue(urlKeyword);
    setKeyword(urlKeyword);
  }, [urlKeyword]);

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    setKeyword(trimmedValue);
    navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(trimmedValue)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        variant="JOB"
        inputValue={inputValue}
        onChangeInput={setInputValue}
        onSearch={handleSearch}
      />
      <TopCategoryBar />
      <JobSearchHeader getLength={getLength} />
      <JobListContent
        keyword={keyword}
        maChiTietLoai={urlMaChiTietLoai}
        inputValue={inputValue}
        getLength={setGetLength}
      />
      <FooterHome />
    </div>
  );
}
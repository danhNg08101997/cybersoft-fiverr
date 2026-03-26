import React, { useEffect, useMemo, useState } from 'react';
import JobCard from '@pages/JobListTemplate/_Components/JobListContent/JobCard';
import JobPagination from '@pages/JobListTemplate/_Components/JobListContent/JobPagination';
import type { AppDispatch, RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { searchJobService } from '@services/searchJob.service';
import { layChiTietLoaiCongViecService } from '@services/layChiTietLoaiCongViec.service';
import type { DSCongViecTheoTen } from '@types';
import { NavLink } from 'react-router-dom';
import AppLoader from '@shared/AppLoader';

type JobListContentProps = {
  keyword?: string;
  inputValue?: string;
  maChiTietLoai?: string;
  getLength?: (value: number) => void;
};

export default function JobListContent({
  keyword = '',
  inputValue = '',
  maChiTietLoai = '',
  getLength,
}: JobListContentProps): React.JSX.Element {
  const PAGE_SIZE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch: AppDispatch = useDispatch();

  const {
    data: searchJob,
    loading: searchLoading,
    error: searchError,
  } = useSelector((state: RootState) => state.searchJob);

  const {
    data: chiTietLoaiCongViec,
    loading: detailTypeLoading,
    error: detailTypeError,
  } = useSelector((state: RootState) => state.layChiTietLoaiCongViec);

  const jobs: DSCongViecTheoTen[] = useMemo(() => {
    if (maChiTietLoai && !keyword) {
      return chiTietLoaiCongViec || [];
    }
    return searchJob || [];
  }, [maChiTietLoai, keyword, chiTietLoaiCongViec, searchJob]);

  const loading = maChiTietLoai && !keyword ? detailTypeLoading : searchLoading;
  const error = maChiTietLoai && !keyword ? detailTypeError : searchError;

  useEffect(() => {
    getLength?.(jobs.length);
  }, [jobs, getLength]);

  useEffect(() => {
    setCurrentPage(1);

    if (maChiTietLoai && !keyword) {
      dispatch(layChiTietLoaiCongViecService(maChiTietLoai));
      return;
    }

    const effectiveKeyword = inputValue || keyword;
    if (effectiveKeyword.trim()) {
      dispatch(searchJobService(effectiveKeyword));
    }
  }, [dispatch, keyword, inputValue, maChiTietLoai]);

  const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const currentJobs = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
    return jobs.slice(startIndex, startIndex + PAGE_SIZE);
  }, [jobs, safeCurrentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <AppLoader />;
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-350 px-6 py-8 lg:px-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error.message}
          </div>
        )}

        {currentJobs.length === 0 ? (
          <div className="flex min-h-105 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
              <svg
                className="h-10 w-10 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6H7.8A1.8 1.8 0 006 7.8v8.4A1.8 1.8 0 007.8 18h8.4a1.8 1.8 0 001.8-1.8v-2.7M15 6h3m0 0v3m0-3L10 14"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-2xl font-semibold text-gray-800">
              Không tìm thấy công việc phù hợp
            </h3>

            <p className="mb-6 max-w-130 text-base leading-7 text-gray-500">
              Hiện chưa có dữ liệu phù hợp với từ khóa tìm kiếm của bạn.
              Vui lòng thử lại với từ khóa khác hoặc chọn danh mục khác.
            </p>

            <NavLink
              to="/"
              className="rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              Tìm kiếm lại
            </NavLink>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <JobPagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
}
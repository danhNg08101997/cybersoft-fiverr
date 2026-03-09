import React, {useEffect, useMemo, useState} from "react";
import JobCard from "@pages/JobListTemplate/_Components/JobListContent/JobCard";
import JobPagination from "@pages/JobListTemplate/_Components/JobListContent/JobPagination";
import type {AppDispatch, RootState} from "@store/index.ts";
import {useDispatch, useSelector} from "react-redux";
import {searchJobService} from "@services/searchJob.service.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {layChiTietLoaiCongViecService} from "@services/layChiTietLoaiCongViec.service.ts";

type JobListContentProps = {
    keyword: string;
    inputValue: string;
};

export default function JobListContent({ keyword, inputValue }: JobListContentProps): React.JSX.Element  {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();
    const { data: searchJob } = useSelector( (state: RootState) => state.searchJobReducer );
    const { data: chiTietLoaiCongViec } = useSelector( (state: RootState) => state.layChiTietLoaiCongViecReducer );
    const PAGE_SIZE: number = 12;
    const jobs = searchJob ? searchJob : [];

    const [searchParams] = useSearchParams();
    const [maChiTietLoai] = useState<string>(searchParams.get("jobKind") ?? "".trim())

    useEffect(() => {
        if(maChiTietLoai !== ""){
            dispatch(layChiTietLoaiCongViecService(maChiTietLoai))
            console.log("🚀 ~ JobListContent ~ chiTietLoaiCongViec: ", chiTietLoaiCongViec);

        }else {
            dispatch(searchJobService(inputValue ? inputValue : keyword))
            navigate(`/job-list?keyword=${encodeURIComponent(inputValue ? inputValue : keyword)}`);
        }

    },[dispatch,inputValue]);

    const totalPages = Math.ceil(jobs.length / PAGE_SIZE);

    const currentJobs = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return jobs.slice(startIndex, endIndex);
    }, [jobs, currentPage]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {currentJobs?.map((job) => (
                            <JobCard key={job.id}
                                     job={job} />
                        ))}
                    </div>

                    <JobPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
            </div>
        </section>
    );
}
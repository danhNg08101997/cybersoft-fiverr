import type { DSCongViecTheoTen } from '@types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type CongViecProps = {
    job: DSCongViecTheoTen;
};

export default function JobCard({ job }: CongViecProps) {
    console.log("🚀 ~ JobCard ~ job: ", job);
    const navigate = useNavigate();

    const sellerLevel = useMemo(() => {
        const baseNumber = Number(job.id || job.CongViec.id || 1);
        return (baseNumber % 2) + 1;
    }, [job.id, job.CongViec.id]);

    const handleClickJobCard = () => {
        const params = new URLSearchParams();
        params.set('maCongViec', String(job.CongViec.id));
        navigate(`/chi-tiet-cong-viec?${params.toString()}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClickJobCard();
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            className="cursor-pointer overflow-hidden rounded border border-gray-200 bg-white transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            onClick={handleClickJobCard}
            onKeyDown={handleKeyDown}
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                    src={job.CongViec?.hinhAnh}
                    alt={job.CongViec?.tenCongViec}
                    className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                />
            </div>

            <div className="p-4">
                <div className="mb-3 flex items-center gap-3">
                    <img
                        src={
                            job.avatar ||
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
                        }
                        alt={job.tenNguoiTao}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">
                            {job.tenNguoiTao}
                        </p>
                        <p className="text-sm text-gray-400">{`Level ${sellerLevel} Seller`}</p>
                    </div>
                </div>

                <h3 className="mb-3 line-clamp-2 min-h-14 text-[17px] leading-7 text-gray-700">
                    {job.CongViec?.tenCongViec}
                </h3>

                <div className="mb-4 flex items-center gap-1 text-sm">
                    <svg
                        className="h-4 w-4 fill-[#ffb33e]"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path d="M10 1.5l2.6 5.26 5.81.85-4.2 4.1.99 5.79L10 14.77 4.8 17.5l.99-5.79-4.2-4.1 5.81-.85L10 1.5z" />
                    </svg>

                    <span className="font-semibold text-[#ffb33e]">
            {job.CongViec?.saoCongViec?.toFixed(1) || '5.0'}
          </span>

                    <span className="text-gray-400">({job.CongViec?.danhGia || 0})</span>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                <button type="button" className="text-gray-300 transition hover:text-gray-500">
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M10 17.25l-1.45-1.32C3.4 11.36 0 8.28 0 4.5 0 2.01 2.01 0 4.5 0c1.74 0 3.41.81 4.5 2.09C10.09.81 11.76 0 13.5 0 15.99 0 18 2.01 18 4.5c0 3.78-3.4 6.86-8.55 11.43L10 17.25z" />
                    </svg>
                </button>

                <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Starting at
                    </p>
                    <p className="text-[28px] font-medium text-gray-500">
                        ${job.CongViec?.giaTien}
                    </p>
                </div>
            </div>
        </div>
    );
}
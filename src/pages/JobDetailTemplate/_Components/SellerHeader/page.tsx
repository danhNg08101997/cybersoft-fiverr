import type {DSCongViecTheoTen} from "@types";
import {Star} from "lucide-react";

function SellerHeader({ item }: { item: DSCongViecTheoTen }) {
    const rating = Math.max(0, Math.floor(item.congViec.saoCongViec || 0));

    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <img
                src={
                    item.avatar ||
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
                }
                alt={item.tenNguoiTao || 'seller avatar'}
                className="h-16 w-16 rounded-full object-cover ring-1 ring-[#e4e5e7]"
            />

            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
          <span className="text-[20px] font-semibold text-[#222325]">
            {item.tenNguoiTao}
          </span>
                    <span className="rounded-md bg-[#f0f0ff] px-3 py-1 text-sm font-semibold text-[#584aff]">
            Vetted Pro
          </span>
                    <span className="rounded-md bg-[#fdf1d9] px-3 py-1 text-sm font-semibold text-[#7a4d00]">
            Top Rated
          </span>
                    <span className="text-sm text-[#74767e]">1 order in queue</span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-[16px]">
                    <div className="flex items-center gap-1 text-[#222325]">
                        {Array.from({ length: rating }).map((_, index) => (
                            <Star key={index} className="h-5 w-5 fill-current" />
                        ))}
                    </div>
                    <span className="font-bold text-[#222325]">
            {item.congViec.saoCongViec?.toFixed(1) ?? '5.0'}
          </span>
                    <button className="underline decoration-[#b5b6ba] underline-offset-2 transition hover:text-[#1dbf73]">
                        ({item.congViec.danhGia || 0} reviews)
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SellerHeader;
import { ChevronLeft, ChevronRight, ShieldCheck, Star, Trophy } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { DSCongViecTheoTen } from '@types';

type JobDetailContentProps = {
    item: DSCongViecTheoTen;
};

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
          <span className="text-[24px] font-semibold text-[#222325]">
            {item.tenNguoiTao}
          </span>
                    <span className="rounded-md bg-[#f0f0ff] px-3 py-1 text-sm font-semibold text-[#584aff]">
            Vetted Pro
          </span>
                    <span className="rounded-md bg-[#fdf1d9] px-3 py-1 text-sm font-semibold text-[#7a4d00]">
            Top Rated
          </span>
                    <span className="text-lg text-[#74767e]">1 order in queue</span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-[18px]">
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

function Gallery({ imageUrl }: { imageUrl: string }) {
    const thumbnails = useMemo(
        () => [
            imageUrl,
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80',
        ],
        [imageUrl],
    );

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="mt-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#e4e5e7] bg-[#f5f5f5] shadow-sm">
                <img
                    src={thumbnails[activeIndex]}
                    alt="gig preview"
                    className="h-[320px] w-full object-cover md:h-[520px]"
                />

                <button
                    type="button"
                    onClick={() =>
                        setActiveIndex((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1))
                    }
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#404145] shadow-lg transition hover:scale-105"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % thumbnails.length)}
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#404145] shadow-lg transition hover:scale-105"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {thumbnails.map((src, index) => (
                    <button
                        key={`${src}-${index}`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`overflow-hidden rounded-lg border transition ${
                            index === activeIndex
                                ? 'border-[#222325] ring-2 ring-[#222325]/10'
                                : 'border-[#e4e5e7] hover:border-[#b5b6ba]'
                        }`}
                    >
                        <img src={src} alt={`thumbnail ${index + 1}`} className="h-16 w-24 object-cover" />
                    </button>
                ))}
            </div>
        </section>
    );
}

function AboutGig({ description }: { description: string }) {
    const paragraphs = description
        .split(/\r?\n+/)
        .map((text) => text.trim())
        .filter(Boolean);

    return (
        <section className="mt-12 border-t border-[#e4e5e7] pt-10">
            <h2 className="text-[30px] font-bold text-[#222325]">About this gig</h2>
            <div className="mt-4 max-w-[820px] space-y-5 text-[18px] leading-8 text-[#62646a]">
                {paragraphs.length > 0
                    ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                    : <p>No description available.</p>}
            </div>
        </section>
    );
}

export default function JobDetailContent({ item }: JobDetailContentProps) {
    return (
        <>
            <section className="mt-4">
                <h1 className="max-w-[900px] text-[36px] font-bold leading-[1.2] text-[#222325] md:text-[42px]">
                    {item.congViec.tenCongViec}
                </h1>

                <div className="mt-6">
                    <SellerHeader item={item} />
                </div>

                <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#e4e5e7] bg-[#fafafa] px-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-[#e4e5e7]">
                        <Trophy className="h-5 w-5 text-[#74767e]" />
                    </div>
                    <p className="text-[17px] leading-7">
                        <span className="font-bold text-[#222325]">People keep coming back!</span>{' '}
                        This seller has a strong record of repeat buyers and consistent delivery quality.
                    </p>
                </div>

                <Gallery imageUrl={item.congViec.hinhAnh} />

                <section className="mt-10">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-[#404145]" />
                        <h2 className="text-[24px] font-bold text-[#222325]">Vetted by Fiverr Pro</h2>
                    </div>
                    <p className="mt-3 max-w-[760px] text-[18px] leading-8 text-[#62646a]">
                        This professional is positioned as a premium seller with stronger service quality,
                        delivery history, and credibility for more complex software projects.
                    </p>
                </section>

                <AboutGig description={item.congViec.moTa} />
            </section>
        </>
    );
}
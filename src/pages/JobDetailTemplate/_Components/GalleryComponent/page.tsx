import {useMemo, useState} from 'react';
import {ChevronLeft, ChevronRight} from "lucide-react";

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
                    className="h-80 w-full object-cover md:h-130"
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

export default Gallery;
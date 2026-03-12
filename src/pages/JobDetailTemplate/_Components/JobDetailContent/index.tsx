import {ChevronLeft, ChevronRight, ShieldCheck, Star, Trophy} from "lucide-react";

const thumbnails = [
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
];

export default function JobDetailContent() {
    return (
        <>
            <h1 className="max-w-[900px] text-[34px] font-bold leading-[1.25] tracking-[-0.02em] text-[#222325] md:text-[40px]">
                I will be php laravel developer php developer laravel crm saas react next js developer
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-[#e4e5e7] pb-6">
                <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                    alt="seller avatar"
                    className="h-16 w-16 rounded-full object-cover ring-1 ring-[#e4e5e7]"
                />

                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[24px] font-semibold text-[#222325]">Harminder S</span>
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
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star key={index} className="h-5 w-5 fill-current" />
                            ))}
                        </div>
                        <span className="font-bold text-[#222325]">5.0</span>
                        <button className="underline decoration-[#b5b6ba] underline-offset-2 transition hover:text-[#1dbf73]">
                            (65 reviews)
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#e4e5e7] bg-[#fafafa] px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-[#e4e5e7]">
                    <Trophy className="h-5 w-5 text-[#74767e]" />
                </div>
                <p className="text-[17px] leading-7">
                    <span className="font-bold text-[#222325]">People keep coming back!</span> micmed has an exceptional number of repeat buyers.
                </p>
            </div>

            <section className="mt-8">
                <div className="relative overflow-hidden rounded-2xl border border-[#e4e5e7] bg-[#f5f5f5] shadow-sm">
                    <img
                        src={thumbnails[0]}
                        alt="gig preview"
                        className="h-[320px] w-full object-cover md:h-[520px]"
                    />

                    <button className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#404145] shadow-lg transition hover:scale-105">
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#404145] shadow-lg transition hover:scale-105">
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>

                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                    {thumbnails.map((src, index) => (
                        <button
                            key={src}
                            className={`overflow-hidden rounded-lg border transition ${
                                index === 0
                                    ? "border-[#222325] ring-2 ring-[#222325]/10"
                                    : "border-[#e4e5e7] hover:border-[#b5b6ba]"
                            }`}
                        >
                            <img src={src} alt={`thumbnail ${index + 1}`} className="h-16 w-24 object-cover" />
                        </button>
                    ))}
                </div>
            </section>

            <section className="mt-10">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#404145]" />
                    <h2 className="text-[24px] font-bold text-[#222325]">Vetted by Fiverr Pro</h2>
                </div>
                <p className="mt-3 max-w-[760px] text-[18px] leading-8 text-[#62646a]">
                    Harminder S was selected by the Fiverr Pro team for their expertise, consistent service quality, and strong delivery history on complex software projects.
                </p>
            </section>

            <section className="mt-12 border-t border-[#e4e5e7] pt-10">
                <h2 className="text-[30px] font-bold text-[#222325]">About this gig</h2>
                <div className="mt-4 max-w-[820px] space-y-5 text-[18px] leading-8 text-[#62646a]">
                    <p>
                        I build scalable Laravel and React applications for startups, SaaS products, business websites, dashboards, and CRM systems. The focus is not only on writing clean code but also on delivering a reliable product structure that is easy to maintain and expand.
                    </p>
                    <p>
                        This gig is suitable for clients who need a modern full-stack developer capable of handling frontend and backend work, responsive UI, API integration, authentication flows, admin panels, deployment preparation, and performance optimization.
                    </p>
                    <p>
                        You will receive clear communication, milestone-based progress updates, and code organized for future handover or long-term development.
                    </p>
                </div>
            </section>
        </>
    );
}
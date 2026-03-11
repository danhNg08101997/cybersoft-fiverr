import React from "react";

export default function JobTypeCarousel(): React.JSX.Element {
    const popularItems = [
        {
            id: 1,
            title: "Minimalist Logo Design",
            icon: "△",
        },
        {
            id: 2,
            title: "Architecture & Interior Design",
            icon: "🏠",
        },
        {
            id: 3,
            title: "Image Editing",
            icon: "🪄",
        },
        {
            id: 4,
            title: "NFT Art",
            icon: "🕹️",
        },
        {
            id: 5,
            title: "T-Shirts & Merchandise",
            icon: "👕",
        },
    ];

    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-350 px-6 py-6 lg:px-8">
                {/* Banner */}
                <div className="relative overflow-hidden rounded-xl bg-[#064c2f]">
                    <div className="grid min-h-40 grid-cols-1 items-center md:grid-cols-3">
                        {/* Left image */}
                        <div className="relative hidden h-full md:block">
                            <img
                                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop"
                                alt="Graphics & Design"
                                className="h-full w-full object-cover object-center opacity-95"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-[#064c2f]/10 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="z-10 flex flex-col items-center justify-center px-6 py-10 text-center text-white md:col-span-1">
                            <h2 className="mb-3 text-4xl font-bold tracking-tight">
                                Graphics & Design
                            </h2>
                            <p className="mb-6 text-xl text-white/90">
                                Designs to make you stand out.
                            </p>

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-md border border-white/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-[#064c2f]">
                                    ▶
                                </span>
                                How Fiverr Works
                            </button>
                        </div>

                        {/* Right image */}
                        <div className="relative hidden h-full md:block">
                            <img
                                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"
                                alt="Design hand"
                                className="h-full w-full object-cover object-center opacity-95"
                            />
                            <div className="absolute inset-0 bg-linear-to-l from-[#064c2f]/10 to-transparent" />
                        </div>
                    </div>

                    {/* Decorative blobs */}
                    <div className="absolute -left-5 top-15 h-28 w-20 rounded-full bg-[#20d98d]" />
                    <div className="absolute left-45 -top-5 h-16 w-16 rounded-full bg-[#ff6a2a]" />
                    <div className="absolute right-5 top-2.5 h-24 w-14 rotate-[-25deg] rounded-full bg-[#ff6a2a]" />
                    <div className="absolute right-42.5 top-2 text-7xl font-black text-[#0b7d4f]/70">
                        3
                    </div>
                    <div className="absolute bottom-4.5 right-52.5 text-5xl font-black text-pink-400/90">
                        ✱
                    </div>
                    <div className="absolute bottom-3 left-22.5 text-6xl font-black text-[#0b7d4f]/70">
                        4
                    </div>
                </div>

                {/* Popular section */}
                <div className="mt-8">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-[25px] font-bold tracking-tight text-gray-800">
                            Most popular in Graphics & Design
                        </h3>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition hover:border-gray-300 hover:text-gray-600"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                        {popularItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-3 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2a2a2a] text-2xl text-white">
                                    {item.icon}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 text-sm font-semibold text-gray-800">
                                        {item.title}
                                    </p>
                                </div>

                                <span className="text-xl text-gray-400">→</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
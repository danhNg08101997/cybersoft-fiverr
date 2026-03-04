import type {ServiceInterface} from "@types";
import {useMemo, useRef} from "react";

const services: ServiceInterface[] = [
    {
        title: "Logo Design",
        subtitle: "Build your brand",
        img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "WordPress",
        subtitle: "Customize your site",
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
        title: "Voice Over",
        subtitle: "Share your message",
        img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    },
    {
        title: "Video Explainer",
        subtitle: "Engage your audience",
        img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    },
    {
        title: "Social Media",
        subtitle: "Reach more customers",
        img: "https://images.unsplash.com/photo-1516382799247-87df95d790b7",
    },
]

function ArrowCircle({ dir }: { dir: "left" | "right" }) {
    return (
        <div className="grid h-11 w-11 place-items-center rounded-full bg-white shadow ring-1 ring-black/5 hover:bg-slate-50">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-600" fill="none">
                <path
                    d={dir === "left" ? "M14 6l-6 6 6 6" : "M10 6l6 6-6 6"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

function Card({ item }: { item: ServiceInterface }) {
    return (
        <a
            href="#"
            className="group relative h-[240px] w-[260px] flex-none overflow-hidden rounded-md bg-slate-100"
        >
            <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

            <div className="absolute left-4 top-4 text-white">
                <div className="text-[13px] font-semibold opacity-90">
                    {item.subtitle}
                </div>
                <div className="mt-0.5 text-[22px] font-extrabold leading-tight">
                    {item.title}
                </div>
            </div>
        </a>
    );
}

function ServiceComponent() {
    const listRef = useRef<HTMLDivElement | null>(null);

    const cards = useMemo(() => services, []);

    const scrollByCard = (dir: "left" | "right") => {
        const el = listRef.current;
        if (!el) return;

        // card width (260) + gap (24) = 284
        const delta = dir === "left" ? -284 : 284;
        el.scrollBy({ left: delta, behavior: "smooth" });
    };

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <h2 className="text-2xl font-bold text-slate-800">
                    Popular professional services
                </h2>

                <div className="relative mt-6">
                    {/* left arrow */}
                    <button
                        aria-label="Previous"
                        onClick={() => scrollByCard("left")}
                        className="absolute left-0 top-1/2 z-10 -translate-x-5 -translate-y-1/2 hidden md:block"
                    >
                        <ArrowCircle dir="left" />
                    </button>

                    {/* right arrow */}
                    <button
                        aria-label="Next"
                        onClick={() => scrollByCard("right")}
                        className="absolute right-0 top-1/2 z-10 translate-x-5 -translate-y-1/2 hidden md:block"
                    >
                        <ArrowCircle dir="right" />
                    </button>

                    {/* cards row */}
                    <div
                        ref={listRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {cards.map((c) => (
                            <Card key={c.title} item={c} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServiceComponent;
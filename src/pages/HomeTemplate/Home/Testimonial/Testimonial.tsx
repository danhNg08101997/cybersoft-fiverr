import type {Testimonial} from "@types";

const testimonial: Testimonial = {
    name: "Kay Kim",
    role: "Co-Founder",
    brand: "rooted",
    quote:
        "It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working.",
    videoThumb:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
};

function ArrowButton({ dir }: { dir: "left" | "right" }) {
    return (
        <button
            aria-label={dir === "left" ? "Previous testimonial" : "Next testimonial"}
            className="grid h-11 w-11 place-items-center rounded-full bg-white shadow ring-1 ring-black/5 hover:bg-slate-50"
        >
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-slate-500"
                fill="none"
            >
                <path
                    d={dir === "left" ? "M14 6l-6 6 6 6" : "M10 6l6 6-6 6"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}

function TestimonialComponent() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="relative">
                    {/* arrows on the sides (like screenshot) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 hidden md:block z-1">
                        <ArrowButton dir="left" />
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 hidden md:block z-1">
                        <ArrowButton dir="right" />
                    </div>

                    <div className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
                        {/* video thumbnail */}
                        <div className="relative">
                            <div className="relative aspect-video overflow-hidden rounded-md bg-slate-100">
                                <img
                                    src={testimonial.videoThumb}
                                    alt="Testimonial video"
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                                {/* play button */}
                                <button
                                    aria-label="Play video"
                                    className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white hover:bg-black/65"
                                >
                                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                                        <path d="M8 5v14l11-7L8 5z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* quote */}
                        <div>
                            <div className="flex items-center gap-3 text-[15px] text-slate-500">
                <span>
                  {testimonial.name}, {testimonial.role}
                </span>
                                <span className="text-slate-300">|</span>
                                <span className="font-bold text-slate-900">{testimonial.brand}</span>
                            </div>

                            <blockquote className="mt-5 text-[28px] leading-snug text-emerald-900/90">
                <span className="font-serif italic font-medium">
                  “{testimonial.quote}”
                </span>
                            </blockquote>
                        </div>
                    </div>

                    {/* mobile arrows (optional) */}
                    <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
                        <ArrowButton dir="left" />
                        <ArrowButton dir="right" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestimonialComponent;
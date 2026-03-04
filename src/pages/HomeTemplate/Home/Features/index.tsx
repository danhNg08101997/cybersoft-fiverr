import type {Feature} from "@types";

const features: Feature[] = [
    {
        title: "The best for every budget",
        desc: "Find high-quality services at every price point. No hourly rates, just project-based pricing.",
    },
    {
        title: "Quality work done quickly",
        desc: "Find the right freelancer to begin working on your project within minutes.",
    },
    {
        title: "Protected payments, every time",
        desc: "Always know what you'll pay upfront. Your payment isn't released until you approve the work.",
    },
    {
        title: "24/7 support",
        desc: "Questions? Our round-the-clock support team is available to help anytime, anywhere.",
    },
];

function FeatureComponent() {
    return (
        <section className="bg-emerald-50/60">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    {/* LEFT */}
                    <div>
                        <h2 className="max-w-xl text-[34px] font-bold leading-tight text-slate-800">
                            A whole world of freelance
                            <br />
                            talent at your fingertips
                        </h2>

                        <div className="mt-10 space-y-7">
                            {features.map((f) => (
                                <div key={f.title} className="flex gap-4">
                                    {/* check icon */}
                                    <div className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-slate-300 text-slate-600">
                                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                                            <path
                                                d="M6.5 12.5l3.2 3.2L17.5 8.9"
                                                stroke="currentColor"
                                                strokeWidth="2.4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        <div className="text-[16px] font-semibold text-slate-800">
                                            {f.title}
                                        </div>
                                        <p className="mt-1 max-w-xl text-[15px] leading-6 text-slate-600">
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT (video thumbnail) */}
                    <div className="relative">
                        <div className="relative aspect-video overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5">
                            <img
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                                alt="How it works"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />

                            {/* play button */}
                            <button
                                aria-label="Play"
                                className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white hover:bg-black/55"
                            >
                                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                                    <path d="M8 5v14l11-7L8 5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeatureComponent;
import {BadgeCheck, Check, ChevronDown, Clock3, RefreshCw} from "lucide-react";

const packageFeatures = [
    "8 pages",
    "Design customization",
    "Content upload",
    "Responsive design",
    "Source code",
    "Detailed code comments",
];
export default function JobDetailContentRight() {
    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-[#dadbdd] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
                <div className="grid grid-cols-3 border-b border-[#e4e5e7] text-center text-[20px] font-semibold">
                    <button className="border-b-[3px] border-[#222325] px-4 py-5 text-[#222325]">Basic</button>
                    <button className="border-l border-r border-[#e4e5e7] px-4 py-5 text-[#74767e]">Standard</button>
                    <button className="px-4 py-5 text-[#74767e]">Premium</button>
                </div>

                <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="max-w-[250px] text-[28px] font-bold leading-[1.35] text-[#222325]">
                            PHP Laravel App UI Starts from
                        </h3>
                        <span className="text-[40px] font-bold leading-none text-[#222325]">$100</span>
                    </div>

                    <p className="mt-5 text-[18px] leading-8 text-[#62646a]">
                        Consultation for UI prototyping of your software or web application.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[17px] font-semibold text-[#222325]">
                        <div className="flex items-center gap-2">
                            <Clock3 className="h-5 w-5" />
                            <span>4-day delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <RefreshCw className="h-5 w-5" />
                            <span>Unlimited Revisions</span>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        {packageFeatures.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-[17px] text-[#62646a]">
                                <Check className="mt-1 h-4 w-4 shrink-0 text-[#222325]" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#222325] px-6 py-4 text-[18px] font-semibold text-white transition hover:bg-black">
                        Request to order
                    </button>

                    <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#dadbdd] bg-white px-6 py-4 text-[18px] font-semibold text-[#404145] transition hover:bg-[#f5f5f5]">
                        Contact me
                        <ChevronDown className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#e4e5e7] bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                <div className="flex items-start gap-4">
                    <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                        alt="seller"
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-[20px] font-bold text-[#222325]">Need flexibility when hiring?</h3>
                        <p className="mt-2 text-[17px] leading-7 text-[#62646a]">
                            Hire by the hour, ideal for long-term projects with flexible hours and weekly payments.
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#e4e5e7] pt-5">
                    <span className="text-[22px] font-bold text-[#222325]">$25/hour</span>
                    <button className="font-semibold text-[#222325] underline underline-offset-4 transition hover:text-[#1dbf73]">
                        Request hourly offer
                    </button>
                </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#d7f5e7] bg-[#f6fff9] p-4 text-[#222325]">
                <BadgeCheck className="h-5 w-5 text-[#1dbf73]" />
                <p className="text-[15px] leading-6">
                    Secure checkout, milestone-based collaboration, and clear package scope.
                </p>
            </div>
        </>
    );
}
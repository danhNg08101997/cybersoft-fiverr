import type {MarketItem} from "@types";
import {NavLink} from "react-router-dom";

const marketItems: MarketItem[] = [
    {
        label: "Graphics & Design",
        icon: (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
                <path d="M22 44h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M26 44V22c0-3 2-5 5-5h2c3 0 5 2 5 5v22" stroke="currentColor" strokeWidth="2" />
                <path d="M24 24l-6-6" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <path d="M32 16l-3-7" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <path d="M40 24l6-6" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Digital Marketing",
        icon: (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
                <path d="M18 18h28v18H18V18Z" stroke="currentColor" strokeWidth="2" />
                <path d="M22 40h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M26 26h12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <path d="M22 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M42 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Writing & Translation",
        icon: (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
                <path d="M22 16h18l6 6v26H22V16Z" stroke="currentColor" strokeWidth="2" />
                <path d="M40 16v8h8" stroke="currentColor" strokeWidth="2" />
                <path d="M26 30h16" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <path d="M26 36h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M26 42h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Video & Animation",
        icon: (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
                <path d="M18 20h28v24H18V20Z" stroke="currentColor" strokeWidth="2" />
                <path d="M28 28l10 6-10 6v-12Z" stroke="#22c55e" strokeWidth="3" strokeLinejoin="round" />
                <path d="M50 24l6-4v24l-6-4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Music & Audio",
        icon: (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
                <path d="M32 18v28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M26 46a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="2" />
                <path d="M38 42a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z" stroke="currentColor" strokeWidth="2" />
                <path d="M32 18c6 0 10-2 14-5" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Programming & Tech",
        icon: (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
                <path d="M18 18h28v22H18V18Z" stroke="currentColor" strokeWidth="2" />
                <path d="M22 44h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M26 26l-4 4 4 4" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M38 26l4 4-4 4" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Business",
        icon: (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
                <path d="M22 30l6 6 14-14" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 22h28v26H18V22Z" stroke="currentColor" strokeWidth="2" />
                <path d="M24 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Lifestyle",
        icon: (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
                <path d="M32 18c6 0 10 4 10 10S38 44 32 44 22 34 22 28s4-10 10-10Z" stroke="currentColor" strokeWidth="2" />
                <path d="M32 44v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M28 52h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M24 28c2-4 5-6 8-7" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Data",
        icon: (
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
                <path d="M18 20h28v24H18V20Z" stroke="currentColor" strokeWidth="2" />
                <path d="M24 40V30" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <path d="M32 40V26" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <path d="M40 40V34" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <path d="M22 48h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
];

function MarketplaceComponent() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <h2 className="text-2xl font-bold text-slate-800">Explore the marketplace</h2>

                <div className="mt-10 grid grid-cols-2 gap-y-12 sm:grid-cols-3 md:grid-cols-5">
                    {marketItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to="#"
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="text-slate-500">{item.icon}</div>
                            {/* underline on hover like Fiverr */}
                            <div className="mt-1 h-[2px] w-10 bg-slate-200 transition-all duration-200 group-hover:w-14 group-hover:bg-emerald-500" />

                            <div className="mt-2 text-[15px] font-medium text-slate-700">
                                {item.label}
                            </div>


                        </NavLink>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MarketplaceComponent;
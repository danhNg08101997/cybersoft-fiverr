import React, {useState} from 'react';
import {NavLink} from "react-router-dom";


function NavBarJobList() {

    const [q, setQ] = useState<string>("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <header className="sticky top-0 z-50 bg-white">
            <div className="border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex h-18 items-center justify-between gap-6">
                        {/* LEFT: logo */}
                        <NavLink to="/" className="flex items-center text-3xl font-extrabold text-slate-800">
                            fiverr<span className="text-emerald-500">.</span>
                        </NavLink>

                        {/* CENTER: search */}
                        <form onSubmit={submit} className="hidden flex-1 md:flex">
                            <div className="flex w-full max-w-155 items-center overflow-hidden rounded border border-slate-200 bg-white">
                                <div className="flex flex-1 items-center gap-2 px-3">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none">
                                        <path
                                            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M16.5 16.5 21 21"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    <input
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        placeholder='what service are you looking for today?'
                                        className="h-11 w-full bg-transparent text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="h-11 bg-emerald-500 px-6 text-[14px] font-bold text-white hover:bg-emerald-600"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        {/* RIGHT: actions */}
                        <nav className="flex items-center gap-6">
                            <a href="#" className="hidden md:inline text-[14px] font-semibold text-slate-500 hover:text-slate-800">
                                Become a Seller
                            </a>
                            <a href="#" className="text-[14px] font-semibold text-slate-500 hover:text-slate-800">
                                Sign In
                            </a>

                            {/* Join: green outline like screenshot */}
                            <a
                                href="#"
                                className="rounded border border-emerald-500 px-4 py-2 text-[14px] font-bold text-emerald-600 hover:bg-emerald-50"
                            >
                                Join
                            </a>
                        </nav>
                    </div>

                    {/* MOBILE search (optional) */}
                    <form onSubmit={submit} className="pb-4 md:hidden">
                        <div className="flex w-full items-center overflow-hidden rounded border border-slate-200 bg-white">
                            <div className="flex flex-1 items-center gap-2 px-3">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none">
                                    <path
                                        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M16.5 16.5 21 21"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Search"
                                    className="h-11 w-full bg-transparent text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="h-11 bg-emerald-500 px-5 text-[14px] font-bold text-white hover:bg-emerald-600"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
}

export default NavBarJobList;
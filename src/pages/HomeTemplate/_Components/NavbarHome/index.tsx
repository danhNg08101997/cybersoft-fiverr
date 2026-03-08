import {NavLink, useNavigate} from "react-router-dom";
import React, {useMemo, useState} from "react";
import LoginComponent from "@pages/AuthTemplate/Login";
import RegisterComponent from "@pages/AuthTemplate/Register";
import type {PopularTag} from "@types";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@store/index.ts";
import {logout} from "@services/login.service.ts";

const popularTags: PopularTag[] = [
    "Website Design",
    "WordPress",
    "Logo Design",
    "Drop shipping",
];

export default function NavbarHome(): React.JSX.Element {
    const [q, setQ] = useState<string>("");
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
    const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const {data: currentUser} = useSelector((state: RootState) => state.loginReducer);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    };

    const trimmedQuery = useMemo(() => q.trim(), [q]);

    const showLoginModal = (): void => setIsLoginModal(true);
    const showRegisterModal = (): void => setIsRegisterModal(true);


    const closeAllModals = () => {
        setIsLoginModal(false);
        setIsRegisterModal(false);
    };

    const switchRegisterToLogin = () => {
        setIsRegisterModal(false);
        setIsLoginModal(true);
    };

    const redirectToJobList = (keyword: string): void => {
        const value = keyword.trim();
        if (!value) return;

        navigate(`/job-list?keyword=${encodeURIComponent(value)}`);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        redirectToJobList(trimmedQuery);
    };

    return (
        <div className="bg-white">
            <header className="relative overflow-hidden bg-[#8a2a18]">
                <div
                    className="pointer-events-none absolute
                    inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.07),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_50%)]"
                />

                {/* NAV */}
                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="flex items-center justify-between py-5">
                        {/*Logo*/}
                        <NavLink to="/" className="text-3xl font-extrabold tracking-tight text-white">
                            fiverr<span className="text-emerald-400">.</span>
                        </NavLink>

                        <nav className="flex items-center gap-6">
                            <span
                                className="hidden cursor-pointer text-sm font-semibold text-white/90 hover:text-white md:inline">
                                Become a Seller
                            </span>

                            {!currentUser ? (
                                <>
                                    {/* Sign In */}
                                    <button
                                        type="button"
                                        className="cursor-pointer text-sm font-semibold text-white/90 hover:text-white"
                                        onClick={showLoginModal}
                                    >
                                        Sign In
                                    </button>

                                    {/* Join */}
                                    <button
                                        type="button"
                                        className="cursor-pointer rounded border border-white/70 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                                        onClick={showRegisterModal}
                                    >
                                        Join
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="text-sm font-semibold text-white">
                                        {currentUser.user.name}
                                    </span>

                                    <button
                                        type="button"
                                        className="text-sm font-semibold text-white/90 hover:text-white"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </>
                            )}

                            {isLoginModal && (<LoginComponent isOpen={isLoginModal} onClose={closeAllModals}/>)}
                            {isRegisterModal && ( <RegisterComponent isOpen={isRegisterModal} onClose={closeAllModals} onSwitchToLogin={switchRegisterToLogin} /> )}
                        </nav>

                    </div>
                </div>

                {/* HERO BODY */}
                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="grid min-h-162.5 items-center gap-10 md:grid-cols-2">
                        {/* LEFT */}
                        <div className="pb-14 pt-10 md:pt-0">
                            <h1 className="text-[44px] font-extrabold leading-[1.05] text-white md:text-[56px]">
                                Find the perfect{" "}
                                <span className="font-serif italic font-semibold">freelance</span>
                                <br/>
                                services for your business
                            </h1>

                            {/* SEARCH */}
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 flex w-full max-w-170 overflow-hidden rounded-sm bg-white shadow-sm"
                            >
                                <div className="flex flex-1 items-center gap-3 px-4">
                                    <svg
                                        className="h-5 w-5 text-slate-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
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
                                        placeholder='Try "building mobile app"'
                                        className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-slate-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="h-12 bg-emerald-500 px-7 text-[15px] font-bold text-white hover:bg-emerald-600"
                                >
                                    Search
                                </button>
                            </form>

                            {/* POPULAR TAGS */}
                            <div className="mt-5 flex flex-wrap items-center gap-3 text-white">
                                <span className="text-sm font-semibold opacity-90">Popular:</span>

                                {popularTags.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => redirectToJobList(tag)}
                                        className="rounded-full border border-white/55 px-4 py-1.5 text-sm font-semibold text-white/95 hover:bg-white/10"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="relative hidden h-full md:block">
                            <div className="absolute right-0 top-0 h-full w-130">
                                <img
                                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80"
                                    alt="Hero model"
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                                <div
                                    className="absolute inset-0 bg-linear-to-l from-black/15 via-transparent to-transparent"/>

                                <div className="absolute bottom-8 right-8 flex items-end gap-3">
                                    <div className="text-right text-white drop-shadow">
                                        <div className="flex justify-end gap-1 text-yellow-400">
                                            {"★★★★★".split("").map((star, index) => (
                                                <span key={index} className="text-sm">
                          {star}
                        </span>
                                            ))}
                                        </div>
                                        <div className="text-sm font-semibold leading-tight">
                                            Gabrielle, Video Editor
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END RIGHT */}
                    </div>
                </div>
            </header>
        </div>
    );
}
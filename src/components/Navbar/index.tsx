import React, {useEffect, useMemo, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoginComponent from "@pages/AuthTemplate/Login";
import RegisterComponent from "@pages/AuthTemplate/Register";
import type {AppDispatch, RootState} from "@store/index.ts";
import {logout} from "@services/login.service.ts";
import type {PopularTag} from "@types";

const popularTags: PopularTag[] = [
    "Website Design",
    "WordPress",
    "Logo Design",
    "Drop shipping",
];

type NavbarProps = {
    variant?: "HOME" | "JOB";
    inputValue?: string;
    onChangeInput?: (value: string) => void;
    onSearch?: (value: string) => void;
    checkLogin?: boolean;
    onCloseLoginRequest?: () => void;
};

export default function Navbar({
                                   variant = "HOME",
                                   inputValue = "",
                                   onChangeInput,
                                   onSearch,
                                   checkLogin = false,
                                   onCloseLoginRequest,
                               }: NavbarProps): React.JSX.Element {

    const [q, setQ] = useState<string>("");
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
    const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {data: currentUser} = useSelector((state: RootState) => state.loginReducer);

    const trimmedHomeQuery = useMemo(() => q.trim(), [q]);
    const trimmedJobListQuery = useMemo(
        () => (inputValue ?? "").trim(),
        [inputValue]
    );

    const handleLogout = (): void => {
        dispatch(logout());
    };

    const showLoginModal = (): void => setIsLoginModal(true);
    const showRegisterModal = (): void => setIsRegisterModal(true);

    const closeAllModals = (): void => {
        setIsLoginModal(false);
        setIsRegisterModal(false);
        onCloseLoginRequest?.();
    };

    const switchRegisterToLogin = (): void => {
        setIsRegisterModal(false);
        setIsLoginModal(true);
    };

    const switchLoginToRegister = (): void => {
        setIsLoginModal(false);
        setIsRegisterModal(true);
    };

    const redirectToJobList = (keyword: string): void => {
        const value = keyword.trim();
        if (!value) return;
        navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(value)}`);
    };

    const handleHomeSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        redirectToJobList(trimmedHomeQuery);
    };

    const handleJobListSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!trimmedJobListQuery) return;
        onSearch?.(trimmedJobListQuery);
    };

    useEffect(() => {
        if (checkLogin) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoginModal(true);
        }
    }, [checkLogin]);


    const renderAuthSection = () => (
        <>
            <span className="hidden cursor-pointer text-sm font-semibold md:inline">
                Become a Seller
            </span>

            {!currentUser ? (
                <>
                    <button
                        type="button"
                        className="cursor-pointer text-sm font-semibold"
                        onClick={showLoginModal}
                    >
                        Sign In
                    </button>

                    <button
                        type="button"
                        className={variant === "HOME" ? "cursor-pointer rounded border px-4 py-2 text-sm font-semibold" : "cursor-pointer rounded border border-emerald-500 bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600" }
                        onClick={showRegisterModal}
                    >
                        Join
                    </button>
                </>
            ) : (
                <>
                    <span className="text-sm font-semibold">
                        {currentUser.user.name}
                    </span>

                    <button
                        type="button"
                        className={variant === "HOME" ? "cursor-pointer text-sm font-semibold" : "cursor-pointer rounded border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            )}

            {isLoginModal && (
                <LoginComponent
                    isOpen={isLoginModal}
                    onClose={closeAllModals}
                    onSwitchToRegister={switchLoginToRegister}
                />
            )}

            {isRegisterModal && (
                <RegisterComponent
                    isOpen={isRegisterModal}
                    onClose={closeAllModals}
                    onSwitchToLogin={switchRegisterToLogin}
                />
            )}
        </>
    );

    if (variant === "JOB") {
        return (
            <header className="border-b-[#f5f5f5] border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
                    <div className="shrink-0">
                        <NavLink to="/" className="text-3xl font-extrabold tracking-tight text-black">
                            fiverr<span className="text-emerald-500">.</span>
                        </NavLink>
                    </div>

                    <form onSubmit={handleJobListSubmit} className="flex flex-1 justify-center">
                        <div className="flex w-full max-w-2xl overflow-hidden">
                            <input
                                type="text"
                                placeholder="What service are you looking for today?"
                                value={inputValue}
                                onChange={(e) => onChangeInput?.(e.target.value)}
                                className="h-11 flex-1 px-4 outline-none rounded-s-sm border border-gray-500"
                            />
                            <button
                                type="submit"
                                className="border-emerald-500 border-8 bg-emerald-500 px-6 text-sm font-semibold text-white hover:opacity-90 cursor-pointer rounded-e-sm"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center gap-4 text-gray-700">
                        {renderAuthSection()}
                    </div>
                </div>
            </header>
        );
    }

    return (
        <div className="bg-white">
            <header className="relative overflow-hidden bg-[#8a2a18]">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.07),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_50%)]"
                />

                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="flex items-center justify-between py-5">
                        <NavLink to="/" className="text-3xl font-extrabold tracking-tight text-white">
                            fiverr<span className="text-emerald-400">.</span>
                        </NavLink>

                        <nav className="flex items-center gap-6 text-white/90">
                            {renderAuthSection()}
                        </nav>
                    </div>
                </div>

                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="grid min-h-162.5 items-center gap-10 md:grid-cols-2">
                        <div className="pb-14 pt-10 md:pt-0">
                            <h1 className="text-[44px] font-extrabold leading-[1.05] text-white md:text-[56px]">
                                Find the perfect{" "}
                                <span className="font-serif italic font-semibold">freelance</span>
                                <br />
                                services for your business
                            </h1>

                            <form
                                onSubmit={handleHomeSubmit}
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

                        <div className="relative hidden h-full md:block">
                            <div className="absolute right-0 top-0 h-full w-130">
                                <img
                                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80"
                                    alt="Hero model"
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-l from-black/15 via-transparent to-transparent" />

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
                    </div>
                </div>
            </header>
        </div>
    );
}
import Logo from "@components/Navbar/Logo";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@store/index.ts";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import type {NavbarProps} from "@components/Navbar/types.ts";
import {logout} from "@services/login.service.ts";
import {ChevronDown, Globe, Menu, Search, X} from 'lucide-react';
import RegisterComponent from "@pages/AuthTemplate/Register";
import LoginComponent from "@pages/AuthTemplate/Login";
import PopularTags from "@components/Navbar/PopularTag";

const primaryLinks = [
    {label: 'Fiverr Pro'},
    {label: 'Explore', hasDropdown: true},
    {label: 'English', hasDropdown: true, icon: Globe},
];

export default function NavbarMainPage({
                                           variant = 'HOME',
                                           inputValue = '',
                                           onChangeInput,
                                           onSearch,
                                           checkLogin = false,
                                           onCloseLoginRequest,
                                       }: NavbarProps) {
    const [homeQuery, setHomeQuery] = useState('');
    const [isLoginModal, setIsLoginModal] = useState(() => !!checkLogin);
    const [isRegisterModal, setIsRegisterModal] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {data: currentUser} = useSelector((state: RootState) => state.auth);

    const trimmedHomeQuery = useMemo(() => homeQuery.trim(), [homeQuery]);
    const trimmedJobQuery = useMemo(() => inputValue.trim(), [inputValue]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoginModal(!!checkLogin);
    }, [checkLogin]);


    const openLogin = () => {
        setIsMobileMenuOpen(false);
        setIsLoginModal(true);
    };

    const openRegister = () => {
        setIsMobileMenuOpen(false);
        setIsRegisterModal(true);
    };

    const closeAllModals = () => {
        setIsLoginModal(false);
        setIsRegisterModal(false);
        onCloseLoginRequest?.();
    };

    const switchToLogin = () => {
        setIsRegisterModal(false);
        setIsLoginModal(true);
    };

    const switchToRegister = () => {
        setIsLoginModal(false);
        setIsRegisterModal(true);
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const handleHomeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        redirectToJobList(trimmedHomeQuery);
    };

    const handleJobSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!trimmedJobQuery) return;
        onSearch?.(trimmedJobQuery);
    };

    const redirectToJobList = (keyword: string) => {
        const value = keyword.trim();
        if (!value) return;
        setIsMobileMenuOpen(false);
        navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(value)}`);
    };

    const renderPrimaryLinks = (isDarkMode: boolean) => {
        const textClass = isDarkMode
            ? 'text-slate-600 hover:text-slate-900'
            : 'text-white/90 hover:text-white';

        return primaryLinks.map(item => {
            const Icon = item.icon;
            return (
                <button key={item.label} type="button"
                        className={`hidden items-center gap-1.5 text-[14px] font-medium transition lg:inline-flex ${textClass}`}>
                    {Icon ? <Icon className="h-4 w-4"/> : null}
                    <span>{item.label}</span>
                    {item.hasDropdown ? <ChevronDown className="h-4 w-4"/> : null}
                </button>
            )
        })
    }

    const renderAuthButtons = (isDarkMode: boolean) => {
        const commonTextClass = isDarkMode
            ? 'text-slate-600 hover:text-slate-900'
            : 'text-white/90 hover:text-white';

        return (
            <>
                <button
                    type="button"
                    className={`hidden text-[14px] font-semibold transition lg:inline-flex ${commonTextClass}`}
                >
                    Become a Seller
                </button>

                {!currentUser ? (
                    <>
                        <button
                            type="button"
                            className={`text-[14px] font-semibold transition ${commonTextClass} hover:cursor-pointer`}
                            onClick={openLogin}
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            className={
                                isDarkMode
                                    ? 'rounded-lg border border-emerald-500 bg-emerald-500 px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-emerald-600 hover:cursor-pointer'
                                    : 'rounded-lg border border-white/35 px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-white/10 hover:cursor-pointer'
                            }
                            onClick={openRegister}
                        >
                            Join
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/trang-ca-nhan" className="flex items-center">
                            <div
                                className="w-9 h-9 rounded-full bg-gray-300 bg-cover bg-center flex items-center justify-center text-sm font-semibold text-white"
                            >
                                {(currentUser?.user?.name?.charAt(0) || 'P')}
                            </div>
                        </NavLink>
                        <button
                            type="button"
                            className={
                                isDarkMode
                                    ? 'rounded-lg border border-slate-300 px-4 py-2 text-[14px font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:cursor-pointer'
                                    : 'rounded-lg border border-white/35 px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-white/10 hover:cursor-pointer'
                            }
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </>
        )
    }

    const renderMobileMenu = (isDarkMode: boolean) => {
        const baseText = isDarkMode ? 'text-slate-700' : 'text-white/90';
        const panelClass = isDarkMode
            ? 'border-t border-slate-200 bg-white'
            : 'border-t border-white/10 bg-[#072b1f]';

        return (
            <div className={`lg:hidden ${panelClass}`}>
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5">
                    <div className="flex flex-col gap-3">
                        {primaryLinks.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    className={`flex items-center justify-between text-left text-sm font-medium ${baseText}`}
                                >
                                    <span className="flex items-center gap-2"> {Icon ? <Icon className="h-4 w-4"/> : null}  {item.label} </span>
                                    {item.hasDropdown ? <ChevronDown className="h-4 w-4"/> : null}
                                </button>
                            );
                        })}
                    </div>

                    <div className={`h-px ${isDarkMode ? 'bg-slate-200' : 'bg-white/10'}`}/>

                    <div className="flex flex-col gap-3">
                        <button type="button" className={`text-left text-sm font-semibold ${baseText}`}>
                            Become a Seller
                        </button>

                        {!currentUser ? (
                            <>
                                <button
                                    type="button"
                                    className={`text-left text-sm font-semibold ${baseText}`}
                                    onClick={openLogin}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                                    onClick={openRegister}
                                >
                                    Join
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/trang-ca-nhan"
                                    className={`text-sm font-semibold ${baseText}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {currentUser.user.name ?? 'Profile'}
                                </NavLink>
                                <button
                                    type="button"
                                    className={`text-left text-sm font-semibold ${baseText}`}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {variant === 'HOME' ? (
                        <div className={`h-px ${isDarkMode ? 'bg-slate-200' : 'bg-white/10'}`}/>
                    ) : null}
                </div>
            </div>
        );
    };

    if (variant === 'JOB') {
        return (
            <>
                <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
                    <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
                        <div className="shrink-0">
                            <Logo dark/>
                        </div>

                        <form onSubmit={handleJobSubmit} className="hidden flex-1 xl:flex">
                            <div
                                className="flex h-11 w-full max-w-xl items-center overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
                                <div className="flex items-center pl-4 text-slate-400">
                                    <Search className="h-4 w-4"/>
                                </div>
                                <input
                                    type="text"
                                    placeholder="What service are you looking for today?"
                                    value={inputValue}
                                    onChange={(event) => onChangeInput?.(event.target.value)}
                                    className="h-full flex-1 px-3 text-[14px] text-slate-800 border-none outline-none focus:outline-none focus:ring-0 focus:shadow-none"
                                />
                                <button
                                    type="submit"
                                    className="h-full bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        <nav className="ml-auto hidden items-center gap-5 lg:flex">
                            {renderPrimaryLinks(true)}
                            {renderAuthButtons(true)}
                        </nav>

                        <button
                            type="button"
                            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            aria-label="Toggle navigation"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                        </button>
                    </div>

                    <div className="mx-auto flex max-w-7xl px-6 pb-4 xl:hidden">
                        <form onSubmit={handleJobSubmit} className="flex w-full">
                            <div
                                className="flex h-11 w-full items-center overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
                                <div className="flex items-center pl-4 text-slate-400">
                                    <Search className="h-4 w-4"/>
                                </div>
                                <input
                                    type="text"
                                    placeholder="What service are you looking for today?"
                                    value={inputValue}
                                    onChange={(event) => onChangeInput?.(event.target.value)}
                                    className="h-full flex-1 px-3 text-[15px] text-slate-800 outline-none"
                                />
                                <button
                                    type="submit"
                                    className="h-full bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {isMobileMenuOpen ? renderMobileMenu(true) : null}
                </header>

                {isLoginModal && (
                    <LoginComponent
                        isOpen={isLoginModal}
                        onClose={closeAllModals}
                        onSwitchToRegister={switchToRegister}
                    />
                )}

                {isRegisterModal && (
                    <RegisterComponent
                        isOpen={isRegisterModal}
                        onClose={closeAllModals}
                        onSwitchToLogin={switchToLogin}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <div className="bg-white">
                <header
                    className="relative overflow-hidden bg-[linear-gradient(115deg,#013914_0%,#0b4f2d_45%,#124c37_100%)]">
                    <div className="pointer-events-none absolute inset-0
bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_0%
,rgba(255,255,255,0.08),transparent_35%)]"/>

                    <div className="relative border-b border-white/10">
                        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">
                            <Logo/>

                            <nav className="ml-auto hidden items-center gap-5 lg:flex">
                                {renderPrimaryLinks(false)}
                                {renderAuthButtons(false)}
                            </nav>

                            <button
                                type="button"
                                className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
                                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                                aria-label="Toggle navigation"
                            >
                                {isMobileMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                            </button>
                        </div>

                        {isMobileMenuOpen ? renderMobileMenu(false) : null}
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div
                            className="grid items-center gap-12 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,520px)] lg:py-20">
                            <div className="max-w-3xl">
                                <h1 className="text-[40px] font-bold leading-[1.05] tracking-tight text-white md:text-[56px]">
                                    Find the right
                                    <span className="font-serif italic font-semibold"> freelance service</span>
                                    <br/>
                                    for every stage of your business
                                </h1>

                                <form
                                    onSubmit={handleHomeSubmit}
                                    className="mt-8 flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row"
                                >
                                    <div className="flex h-14 flex-1 items-center gap-3 px-4">
                                        <Search className="h-5 w-5 text-slate-400"/>
                                        <input
                                            value={homeQuery}
                                            onChange={(event) => setHomeQuery(event.target.value)}
                                            placeholder='Try "website development"'
                                            className="h-full w-full bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="h-14 bg-slate-900 px-7 text-[15px] font-bold text-white transition hover:bg-slate-800"
                                    >
                                        Search
                                    </button>
                                </form>

                                <PopularTags redirectToJobList={redirectToJobList}/>
                            </div>

                            <div className="hidden lg:block">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                                    alt="Freelance services"
                                    className="h-130 w-full rounded-4xl object-cover shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            {isLoginModal && (
                <LoginComponent
                    isOpen={isLoginModal}
                    onClose={closeAllModals}
                    onSwitchToRegister={switchToRegister}
                />
            )}

            {isRegisterModal && (
                <RegisterComponent
                    isOpen={isRegisterModal}
                    onClose={closeAllModals}
                    onSwitchToLogin={switchToLogin}
                />
            )}
        </>
    )
}
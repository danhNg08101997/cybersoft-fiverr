import React, {useEffect, useMemo, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LoginComponent from '@pages/AuthTemplate/Login';
import RegisterComponent from '@pages/AuthTemplate/Register';
import type {AppDispatch, RootState} from '@store/index';
import {logout} from '@services/login.service';
import PopularTags from "@components/Navbar/PopularTag";
import Logo from "@components/Navbar/Logo";

type NavbarProps = {
    variant?: 'HOME' | 'JOB';
    inputValue?: string;
    onChangeInput?: (value: string) => void;
    onSearch?: (value: string) => void;
    checkLogin?: boolean;
    onCloseLoginRequest?: () => void;
};

export default function Navbar({
                                   variant = 'HOME',
                                   inputValue = '',
                                   onChangeInput,
                                   onSearch,
                                   checkLogin = false,
                                   onCloseLoginRequest,
                               }: NavbarProps): React.JSX.Element {
    const [homeQuery, setHomeQuery] = useState('');
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isRegisterModal, setIsRegisterModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { data: currentUser } = useSelector((state: RootState) => state.auth);

    const trimmedHomeQuery = useMemo(() => homeQuery.trim(), [homeQuery]);
    const trimmedJobQuery = useMemo(() => inputValue.trim(), [inputValue]);

    useEffect(() => {
        if (checkLogin) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoginModal(true);
        }
    }, [checkLogin]);

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

    const redirectToJobList = (keyword: string) => {
        const value = keyword.trim();
        if (!value) return;
        navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(value)}`);
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

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const renderAuthButtons = (isDarkMode: boolean) => {
        const commonTextClass = isDarkMode ? 'text-gray-700' : 'text-white/90';

        return (
            <>
        <span className={`hidden cursor-pointer text-sm font-semibold lg:inline ${commonTextClass}`}>
          Become a Seller
        </span>

                {!currentUser ? (
                    <>
                        <button
                            type="button"
                            className={`cursor-pointer text-sm font-semibold ${commonTextClass}`}
                            onClick={() => setIsLoginModal(true)}
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            className={
                                isDarkMode
                                    ? 'cursor-pointer rounded border border-emerald-500 bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600'
                                    : 'cursor-pointer rounded border px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10'
                            }
                            onClick={() => setIsRegisterModal(true)}
                        >
                            Join
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/trang-ca-nhan"
                            className={`text-sm font-semibold ${commonTextClass}`}
                        >
                            {currentUser.user.name ?? 'Profile'}
                        </NavLink>

                        <button
                            type="button"
                            className={
                                isDarkMode
                                    ? 'cursor-pointer rounded border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100'
                                    : 'cursor-pointer rounded border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10'
                            }
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </>
        );
    };

    if (variant === 'JOB') {
        return (
            <>
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="shrink-0">
                            <Logo dark />
                        </div>

                        <form onSubmit={handleJobSubmit} className="flex flex-1 justify-center">
                            <div className="flex w-full max-w-2xl overflow-hidden rounded-md border border-slate-300 bg-white">
                                <input
                                    type="text"
                                    placeholder="What service are you looking for today?"
                                    value={inputValue}
                                    onChange={(e) => onChangeInput?.(e.target.value)}
                                    className="h-11 flex-1 px-4 outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-emerald-500 px-6 text-sm font-semibold text-white transition hover:bg-emerald-600"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center gap-4">{renderAuthButtons(true)}</div>
                    </div>
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
                <header className="relative overflow-hidden bg-[#8a2a18]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.07),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_50%)]" />

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="flex items-center justify-between py-5">
                            <Logo />
                            <nav className="flex items-center gap-6">{renderAuthButtons(false)}</nav>
                        </div>
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="grid min-h-162.5 items-center gap-10 md:grid-cols-2">
                            <div className="pb-14 pt-10 md:pt-0">
                                <h1 className="text-[44px] font-extrabold leading-[1.05] text-white md:text-[56px]">
                                    Find the perfect{' '}
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
                                            value={homeQuery}
                                            onChange={(e) => setHomeQuery(e.target.value)}
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

                                <PopularTags redirectToJobList = {redirectToJobList} />
                            </div>

                            <div className="hidden md:block">
                                <img
                                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                                    alt="Freelance services"
                                    className="max-h-155 w-full rounded-2xl object-cover shadow-2xl"
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
    );
}
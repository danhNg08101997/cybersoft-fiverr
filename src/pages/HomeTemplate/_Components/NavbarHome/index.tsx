import {NavLink} from "react-router-dom";
import {useState} from "react";
import LoginComponent from "@pages/AuthTemplate/Login";
import RegisterComponent from "@pages/AuthTemplate/Register";

type Tag = string;

const popularTags: Tag[] = ["Website Design", "WordPress", "Logo Design", "Dropshipping"];

function NavbarHome() {

    const [searchVal, setSearchVal] = useState<string>("");
    console.log("🚀 ~ NavbarHome ~ searchVal: ", searchVal);

    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isRegisterModal, setIsRegisterModal] = useState(false);

    const showLoginModal = () => {
            setIsLoginModal(true);
    };

    const showRegisterModal = () => {
        setIsRegisterModal(true);
    }

    const handleCancel = () => {
        setIsLoginModal(false);
        setIsRegisterModal(false);
    };

    return (
        <div className="bg-white">
            {/* HERO */}
            <header className="relative overflow-hidden bg-[#8a2a18]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.07),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_50%)]" />

                {/* NAV */}
                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="flex items-center justify-between py-5">
                        <div className="text-white text-3xl font-extrabold tracking-tight">
                            fiverr<span className="text-emerald-400">.</span>
                        </div>

                        <nav className="flex items-center gap-6">
                            <NavLink
                                to=""
                                className="hidden md:inline text-white/90 hover:text-white text-sm font-semibold"
                                aria-current="page"
                            >
                                Become a Seller
                            </NavLink>

                            <NavLink
                                to=""
                                className="text-white/90 hover:text-white text-sm font-semibold"
                                aria-current="page"
                                onClick={showRegisterModal}
                            >
                                Sign In
                            </NavLink>
                            {isRegisterModal && <RegisterComponent isOpen={isRegisterModal} onClose={handleCancel} />}

                            <NavLink
                                to=""
                                className="rounded border border-white/70 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                                onClick={showLoginModal}
                            >
                                Join
                            </NavLink>
                            {isLoginModal && <LoginComponent isOpen={isLoginModal} onClose={handleCancel} />}
                        </nav>
                    </div>
                </div>

                {/* HERO BODY */}
                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="grid min-h-[520px] items-center gap-10 md:grid-cols-2">
                        {/* LEFT */}
                        <div className="pb-14 pt-10 md:pt-0">
                            <h1 className="text-white font-extrabold leading-[1.05] text-[44px] md:text-[56px]">
                                Find the perfect <span className="font-serif italic font-semibold">freelance</span>
                                <br />
                                services for your business
                            </h1>

                            {/* Search */}
                            <div className="mt-8 flex w-full max-w-[680px] overflow-hidden rounded-sm bg-white shadow-sm">
                                <div className="flex flex-1 items-center gap-3 px-4">
                                    {/* search icon */}
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
                                        value={searchVal}
                                        onChange={(e) => setSearchVal(e.target.value)}
                                        placeholder='Try "building mobile app"'
                                        className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-slate-400"
                                    />
                                </div>

                                <button className="h-12 bg-emerald-500 px-7 text-[15px] font-bold text-white hover:bg-emerald-600">
                                    Search
                                </button>
                            </div>

                            {/* Popular */}
                            <div className="mt-5 flex flex-wrap items-center gap-3 text-white">
                                <span className="text-sm font-semibold opacity-90">Popular:</span>

                                {popularTags.map((t) => (
                                    <button
                                        key={t}
                                        className="rounded-full border border-white/55 px-4 py-1.5 text-sm font-semibold text-white/95 hover:bg-white/10"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT (full hero image like screenshot) */}
                        <div className="relative hidden md:block h-full">
                            <div className="absolute right-0 top-0 h-full w-[520px]">
                                <img
                                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80"
                                    alt="Hero model"
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                                {/* light dark gradient for better readability */}
                                <div className="absolute inset-0 bg-gradient-to-l from-black/15 via-transparent to-transparent" />

                                {/* Rating badge bottom-right */}
                                <div className="absolute bottom-8 right-8 flex items-end gap-3">
                                    <div className="text-right text-white drop-shadow">
                                        <div className="flex justify-end gap-1 text-yellow-400">
                                            {"★★★★★".split("").map((s, i) => (
                                                <span key={i} className="text-sm">
                          {s}
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

export default NavbarHome;
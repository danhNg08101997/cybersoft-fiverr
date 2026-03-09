import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@store/index.ts";
import {logout} from "@services/login.service.ts";
import LoginComponent from "@pages/AuthTemplate/Login";
import RegisterComponent from "@pages/AuthTemplate/Register";

type JobListNavbarProps = {
    inputValue: string;
    onChangeInput: (value: string) => void;
    onSearch: (value: string) => void;
};

export default function JobListNavbar({inputValue, onChangeInput, onSearch,}: JobListNavbarProps): React.JSX.Element {
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
    const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);

    const {data: currentUser} = useSelector((state: RootState) => state.loginReducer);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    };

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

    const submit= (e:React.FormEvent)=>{
        e.preventDefault()
        onSearch(inputValue);
    }

    return (
        <header className="job-navbar">
            <div className="job-navbar__container">
                <div className="job-navbar__left">
                    <Link to="/" className="job-navbar__logo">
                        fiverr<span>.</span>
                    </Link>
                </div>

                <form className="job-navbar__center" onSubmit={submit}>
                    <div className="job-navbar__search">
                        <input
                            type="text"
                            placeholder="What service are you looking for today?"
                            value={inputValue}
                            onChange={(e) => onChangeInput(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </div>
                </form>

                <div className="job-navbar__right">
                    <Link to="/become-a-seller" className="job-navbar__link">
                        Become a Seller
                    </Link>
                    {!currentUser ? (
                        <>
                            <button
                                type="button"
                                className="job-navbar__link"
                                onClick={showLoginModal}
                            >
                                Sign In
                            </button>
                            {/* Join */}
                            <button
                                type="button"
                                className="job-navbar__join"
                                onClick={showRegisterModal}
                            >
                                Join
                            </button>
                        </>
                    ) : (
                        <>
                        <span className="job-navbar__link hover:cursor-pointer">
                    {currentUser.user.name}
                </span>

                            <button
                                type="button"
                                className="job-navbar__link hover:cursor-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {isLoginModal && (<LoginComponent isOpen={isLoginModal} onClose={closeAllModals}/>)}
                    {isRegisterModal && (<RegisterComponent isOpen={isRegisterModal} onClose={closeAllModals}
                                                            onSwitchToLogin={switchRegisterToLogin}/>)}
                </div>
            </div>
        </header>
    );
}
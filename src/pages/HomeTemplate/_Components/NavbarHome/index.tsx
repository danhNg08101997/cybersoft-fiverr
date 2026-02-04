import {Link, NavLink} from "react-router-dom";
import {useState} from "react";
import LoginComponent from "@pages/AuthTemplate/Login";
import RegisterComponent from "@pages/AuthTemplate/Register";

function NavbarHome() {

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

        <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="public/fiverr-logo-page.png" className="h-7" alt="Fiverr Logo"/>
                </Link>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                        <li>
                            <NavLink
                                to=""
                                className="block py-2 px-3 text-gray-500 bg-green-400 rounded md:bg-transparent md:p-0 md:text-gray-500 md:dark:bg-transparent hover:text-fg-success"
                                aria-current="page"
                            >
                                Become a Seller
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to=""
                                className="block py-2 px-3 text-gray-500 bg-green-400 rounded md:bg-transparent md:p-0 md:text-gray-500 md:dark:bg-transparent hover:text-fg-success"
                                aria-current="page"
                                onClick={showRegisterModal}
                            >
                                Sign In
                            </NavLink>
                            {isRegisterModal && <RegisterComponent isOpen={isRegisterModal} onClose={handleCancel} />}
                        </li>
                        <li>
                            <Link
                                to=""
                                className="block py-2 px-3 text-gray-500 bg-green-400 rounded md:bg-transparent  md:p-0 md:text-gray-500 md:dark:bg-transparent hover:text-fg-success"
                                onClick={showLoginModal}
                            >
                                Join
                            </Link>
                            {isLoginModal && <LoginComponent isOpen={isLoginModal} onClose={handleCancel} />}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default NavbarHome;
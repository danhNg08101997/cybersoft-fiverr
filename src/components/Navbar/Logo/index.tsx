import {NavLink} from "react-router-dom";

export default function Logo({ dark = false }: { dark?: boolean }) {
    return (
        <NavLink
            to="/"
            className={`text-3xl font-extrabold tracking-tight ${dark ? 'text-black' : 'text-white'}`}
        >
            fiverr<span className="text-emerald-500">.</span>
        </NavLink>
    );
}
import type {FooterCol} from "@types";
import * as React from "react";
import {NavLink} from "react-router-dom";

const footerCols: FooterCol[] = [
    {
        title: "Categories",
        items: [
            { label: "Graphics & Design" },
            { label: "Digital Marketing" },
            { label: "Writing & Translation" },
            { label: "Video & Animation" },
            { label: "Music & Audio" },
            { label: "Programming & Tech" },
            { label: "Data" },
            { label: "Business" },
            { label: "Lifestyle" },
            { label: "Sitemap" },
        ],
    },
    {
        title: "About",
        items: [
            { label: "Careers" },
            { label: "Press & News" },
            { label: "Partnerships" },
            { label: "Privacy Policy" },
            { label: "Terms of Service" },
            { label: "Intellectual Property Claims" },
            { label: "Investor Relations" },
        ],
    },
    {
        title: "Support",
        items: [
            { label: "Help & Support" },
            { label: "Trust & Safety" },
            { label: "Selling on Fiverr" },
            { label: "Buying on Fiverr" },
        ],
    },
    {
        title: "Community",
        items: [
            { label: "Events" },
            { label: "Blog" },
            { label: "Forum" },
            { label: "Community Standards" },
            { label: "Podcast" },
            { label: "Affiliates" },
            { label: "Invite a Friend" },
            { label: "Become a Seller" },
            { label: "Fiverr Elevate", subLabel: "Exclusive Benefits" },
        ],
    },
    {
        title: "More From Fiverr",
        items: [
            { label: "Fiverr Business" },
            { label: "Fiverr Pro" },
            { label: "Fiverr Studios" },
            { label: "Fiverr Logo Maker" },
            { label: "Fiverr Guides" },
            { label: "Get Inspired" },
            { label: "ClearVoice", subLabel: "Content Marketing" },
            { label: "AND CO", subLabel: "Invoice Software" },
            { label: "Learn", subLabel: "Online Courses" },
        ],
    },
];

function SocialIcon({
                        children,
                        label,
                    }: {
    children: React.ReactNode;
    label: string;
}) {
    return (
        <NavLink
            to="#"
            aria-label={label}
            className="grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
            {children}
        </NavLink>
    );
}

function FooterLink({ label, subLabel }: { label: string; subLabel?: string }) {
    return (
        <NavLink
            to="#"
            className="group block py-1 text-[15px] text-slate-500 hover:text-slate-700"
        >
            <div className="leading-6">{label}</div>
            {subLabel ? (
                <div className="text-[12px] text-slate-400 group-hover:text-slate-500">
                    {subLabel}
                </div>
            ) : null}
        </NavLink>
    );
}

function FooterHome() {
    return (
        <footer className="border-t border-slate-100 bg-white">
            {/* top links */}
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-10 md:grid-cols-5">
                    {footerCols.map((col) => (
                        <div key={col.title}>
                            <div className="text-[15px] font-semibold text-slate-700">
                                {col.title}
                            </div>

                            <div className="mt-4">
                                {col.items.map((it) => (
                                    <FooterLink
                                        key={it.label}
                                        label={it.label}
                                        subLabel={it.subLabel}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* divider */}
                <div className="mt-12 border-t border-slate-100" />

                {/* bottom bar */}
                <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-extrabold text-slate-700">
                            fiverr<span className="text-emerald-500">.</span>
                        </div>
                        <div className="text-sm text-slate-400">
                            © Fiverr International Ltd. 2021
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                        {/* social icons (simple SVG) */}
                        <div className="flex items-center gap-1">
                            <SocialIcon label="Twitter">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                    <path d="M22 5.8c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.5.7-2.4.9C18.5 2.4 17.6 2 16.6 2c-1.9 0-3.4 1.6-3.4 3.5 0 .3 0 .5.1.8-2.8-.1-5.3-1.5-6.9-3.6-.3.5-.4 1.1-.4 1.7 0 1.2.6 2.3 1.5 2.9-.6 0-1.1-.2-1.6-.4v.1c0 1.7 1.2 3.1 2.8 3.4-.3.1-.6.1-1 .1-.2 0-.4 0-.6-.1.4 1.5 1.8 2.6 3.4 2.7-1.2 1-2.8 1.6-4.5 1.6H2c1.7 1.1 3.8 1.8 6.1 1.8 7.3 0 11.3-6.1 11.3-11.4v-.5c.8-.6 1.4-1.2 1.9-2z" />
                                </svg>
                            </SocialIcon>

                            <SocialIcon label="Facebook">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                    <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6V11H7v3h2.6v8h3.9z" />
                                </svg>
                            </SocialIcon>

                            <SocialIcon label="LinkedIn">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                    <path d="M6.5 6.7A2.2 2.2 0 1 1 6.5 2.3a2.2 2.2 0 0 1 0 4.4zM4.6 21.7V8.8h3.7v12.9H4.6zM20.4 21.7h-3.7v-6.3c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3v6.4H8.6V8.8h3.6v1.8h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.6 4.7 6v7.2z" />
                                </svg>
                            </SocialIcon>

                            <SocialIcon label="Pinterest">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                    <path d="M12 2C6.5 2 3 5.7 3 10.2c0 3.1 1.7 4.8 2.7 4.8.4 0 .6-1 .6-1.3 0-.3-1-1.2-1-2.9 0-3.4 2.6-6.6 6.7-6.6 3.2 0 5.6 1.8 5.6 5.2 0 2.5-1 7.2-4.2 7.2-1.2 0-2.2-1-1.9-2.2.4-1.4 1.2-2.9 1.2-3.9 0-.9-.5-1.7-1.6-1.7-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9s-1.3 5.4-1.5 6.4c-.5 2.1-.1 4.6 0 4.9h.1c.1-.2 1.7-2.2 2.2-4.2.2-.8.9-3.3.9-3.3.5 1 1.9 1.8 3.4 1.8 4.5 0 7.6-4.1 7.6-9.6C21 5.9 17.5 2 12 2z" />
                                </svg>
                            </SocialIcon>

                            <SocialIcon label="Instagram">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4z" />
                                    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                                    <path d="M18 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                            </SocialIcon>
                        </div>

                        {/* language & currency (right side like screenshot) */}
                        <button className="ml-2 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100">
                            <span className="text-slate-400">🌐</span> English
                        </button>

                        <button className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100">
                            $USD
                        </button>

                        {/* accessibility icon */}
                        <button
                            aria-label="Accessibility"
                            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
                        >
                            ♿
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterHome;
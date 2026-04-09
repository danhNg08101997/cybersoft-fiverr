import type {FooterCol} from "@components/Navbar/types.ts";

const footerColumns: FooterCol[] = [
    {
        title: 'Categories',
        items: [
            { label: 'Graphics & Design' },
            { label: 'Digital Marketing' },
            { label: 'Writing & Translation' },
            { label: 'Video & Animation' },
            { label: 'Music & Audio' },
            { label: 'Programming & Tech' },
            { label: 'Data' },
            { label: 'Business' },
            { label: 'Lifestyle' },
        ],
    },
    {
        title: 'About',
        items: [
            { label: 'Careers' },
            { label: 'Press & News' },
            { label: 'Partnerships' },
            { label: 'Privacy Policy' },
            { label: 'Terms of Service' },
            { label: 'Investor Relations' },
        ],
    },
    {
        title: 'Support',
        items: [
            { label: 'Help & Support' },
            { label: 'Trust & Safety' },
            { label: 'Selling on Fiverr' },
            { label: 'Buying on Fiverr' },
            { label: 'Contact Us' },
        ],
    },
    {
        title: 'Community',
        items: [
            { label: 'Customer Success Stories' },
            { label: 'Community Hub' },
            { label: 'Forum' },
            { label: 'Events' },
            { label: 'Blog' },
        ],
    },
    {
        title: 'More From Fiverr',
        items: [
            { label: 'Fiverr Business' },
            { label: 'Fiverr Pro' },
            { label: 'Fiverr Learn' },
            { label: 'Fiverr Guides' },
            { label: 'Get Inspired' },
        ],
    },
];

function FooterColumn({ column }: { column: FooterCol }) {
    return (
        <div>
            <h3 className="mb-4 text-[20px] font-bold text-slate-900">{column.title}</h3>
            <ul className="space-y-3">
                {column.items.map((item) => (
                    <li key={item.label}>
                        <button
                            type="button"
                            className="text-left text-[14px] text-slate-500 transition hover:text-slate-900"
                        >
                            {item.label}
                            {item.subLabel && (
                                <span className="block text-[12px] text-slate-400">{item.subLabel}</span>
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function FooterHome() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-3 xl:grid-cols-5">
                    {footerColumns.map((column) => (
                        <FooterColumn key={column.title} column={column} />
                    ))}
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
                    <div className="text-[30px] font-extrabold tracking-tight text-black">
                        fiverr<span className="text-emerald-500">.</span>
                    </div>

                    <div className="text-[14px] text-slate-500">
                        © {new Date().getFullYear()} Fiverr Clone. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
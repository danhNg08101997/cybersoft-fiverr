import React, { useMemo, useState } from "react";
import { Dropdown, Menu, Tag } from "antd";
import type { MenuProps } from "antd";

type SubItem = { label: string; href?: string; isLink?: boolean; isNew?: boolean };
type Group = { title: string; items: SubItem[] };

type NavItem = {
    key: string;
    label: string;
    icon?: React.ReactNode;
    groups?: Group[]; // mega menu
};

const NAV: NavItem[] = [
    {
        key: "trending",
        label: "Trending",
        icon: <span style={{ fontSize: 14 }}>🔥</span>,
        groups: [
            {
                title: "Popular",
                items: [{ label: "AI Artists" }, { label: "Logo Design" }, { label: "Video Editing", isNew: true }],
            },
            {
                title: "Explore",
                items: [{ label: "New & Noteworthy" }, { label: "Top rated sellers" }],
            },
            {
                title: "For you",
                items: [{ label: "Recommended" }, { label: "Recently viewed" }],
            },
            {
                title: "Quick links",
                items: [{ label: "Fast delivery" }, { label: "Best sellers" }],
            },
        ],
    },
    {
        key: "graphics",
        label: "Graphics & Design",
        groups: [
            {
                title: "Logo & Brand Identity",
                items: [
                    { label: "Logo Design" },
                    { label: "Brand Style Guides" },
                    { label: "Business Cards & Stationery" },
                    { label: "Fonts & Typography" },
                    { label: "Art Direction", isNew: true },
                    { label: "Logo Maker Tool", isLink: true }, // link xanh
                ],
            },
            {
                title: "Web & App Design",
                items: [
                    { label: "Website Design" },
                    { label: "App Design" },
                    { label: "UX Design" },
                    { label: "Landing Page Design" },
                    { label: "Icon Design" },
                ],
            },
            {
                title: "Visual Design",
                items: [
                    { label: "Image Editing" },
                    { label: "AI Image Editing", isNew: true },
                    { label: "Presentation Design" },
                    { label: "Resume Design" },
                    { label: "Infographic Design" },
                ],
            },
            {
                title: "Marketing Design",
                items: [
                    { label: "Social Media Design" },
                    { label: "Email Design" },
                    { label: "Web Banners" },
                    { label: "Signage Design" },
                ],
            },
        ],
    },
    {
        key: "tech",
        label: "Programming & Tech",
        groups: [
            {
                title: "Web Development",
                items: [{ label: "Website Development" }, { label: "WordPress" }, { label: "Shopify" }, { label: "Web Apps" }],
            },
            {
                title: "Software",
                items: [{ label: "APIs & Integrations" }, { label: "Scripting" }, { label: "QA & Review" }],
            },
            {
                title: "Mobile",
                items: [{ label: "iOS Development" }, { label: "Android Development" }, { label: "Cross-platform Apps" }],
            },
            {
                title: "Data",
                items: [{ label: "Databases" }, { label: "Dashboards" }, { label: "Data Science & ML", isNew: true }],
            },
        ],
    },
];

function MegaOverlay({ groups }: { groups: Group[] }) {
    return (
        <div className="fiverr-mega">
            <div className="fiverr-mega__inner">
                <div className="fiverr-mega__grid">
                    {groups.map((g) => (
                        <div key={g.title} className="fiverr-mega__col">
                            <div className="fiverr-mega__title">{g.title}</div>
                            <div className="fiverr-mega__list">
                                {g.items.map((it) => (
                                    <a
                                        key={it.label}
                                        href={it.href ?? "#"}
                                        className={`fiverr-mega__item ${it.isLink ? "is-link" : ""}`}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <span>{it.label}</span>
                                        {it.isNew ? (
                                            <Tag className="fiverr-mega__tag" color="magenta">
                                                NEW
                                            </Tag>
                                        ) : null}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function TopCategoryBar() {
    const [activeKey, setActiveKey] = useState<string>("");

    const items: MenuProps["items"] = useMemo(() => {
        return NAV.map((n) => {
            const labelNode = (
                <span className="fiverr-topnav__label">
          {n.icon}
                    <span>{n.label}</span>
        </span>
            );

            if (n.groups?.length) {
                return {
                    key: n.key,
                    label: (
                        <Dropdown
                            trigger={["hover"]}
                            placement="bottom"
                            overlayStyle={{ paddingTop: 0 }}
                            dropdownRender={() => <MegaOverlay groups={n.groups!} />}
                            onOpenChange={(open) => setActiveKey(open ? n.key : "")}
                        >
                            <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className={`fiverr-topnav__item ${activeKey === n.key ? "is-active" : ""}`}
                            >
                                {labelNode}
                            </a>
                        </Dropdown>
                    ),
                };
            }

            return {
                key: n.key,
                label: (
                    <a href="#" className="fiverr-topnav__item">
                        {labelNode}
                    </a>
                ),
            };
        });
    }, [activeKey]);

    return (
        <div className="fiverr-topnav">
            <div className="fiverr-topnav__inner">
                <Menu
                    mode="horizontal"
                    selectable={false}
                    items={items}
                    className="fiverr-topnav__menu"
                />
            </div>
        </div>
    );
}
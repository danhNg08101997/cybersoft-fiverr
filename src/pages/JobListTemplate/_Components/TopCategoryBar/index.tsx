import {useCallback, useEffect, useMemo, useState} from "react";
import type {MenuProps} from "antd";
import {Dropdown, Menu} from "antd";
import type {DsNhomChiTietLoai} from "@types";
import type {AppDispatch, RootState} from "@store/index.ts";
import {useDispatch, useSelector} from "react-redux";
import {menuCongViecService} from "@services/menuCongViec.service.ts";
import {NavLink, useNavigate} from "react-router-dom";

function MegaOverlay({groups}: { groups: DsNhomChiTietLoai[] }) {

    const navigate = useNavigate();

    const handleGoToDetailType = (maChiTietLoai:number, tenChiTiet:string) => {
        navigate(`/danh-sach-cong-viec?maChiTietLoai=${encodeURIComponent(maChiTietLoai)}&tenChiTiet=${encodeURIComponent(tenChiTiet)}`);
    }
    return (
        <div className="fiverr-mega">
            <div className="fiverr-mega__inner">
                <div className="fiverr-mega__grid">
                    {groups.map((g) => (
                        <div key={g.id} className="fiverr-mega__col">
                            <div className="fiverr-mega__title">{g.tenNhom}</div>
                            <div className="fiverr-mega__list">
                                {g.dsChiTietLoai.map((it) => (
                                    <a
                                        key={it.id}
                                        href=""
                                        className={`fiverr-mega__item ${!it.tenChiTiet ? "is-link" : ""}`}
                                        onClick={()=>handleGoToDetailType(it.id, it.tenChiTiet)}
                                    >
                                        <span>{it.tenChiTiet}</span>
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
    const dispatch: AppDispatch = useDispatch();
    const {data} = useSelector((state: RootState) => state.menuCongViec);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(menuCongViecService())
    }, [dispatch])

    const handleJobTypeCode = useCallback((maLoaiCongViec?: number) => {
        if (!maLoaiCongViec) return;
        navigate(`/danh-sach-cong-viec-va-loai-cong-viec?maLoaiCongviec=${encodeURIComponent(maLoaiCongViec)}`);

    }, [navigate]);

    const items: MenuProps["items"] = useMemo(() => {

        return data?.map((n) => {
            const labelNode = (<span className="fiverr-topnav__label">{n.tenLoaiCongViec}</span>);
            const firstMaLoaiCongViec = n.dsNhomChiTietLoai?.[0]?.maLoaiCongviec;

            if (n.dsNhomChiTietLoai?.length) {
                return {
                    key: n.id,
                    label: (
                        <Dropdown
                            trigger={["hover"]}
                            placement="bottom"
                            styles={{
                                root: {
                                    paddingTop: 0
                                },
                            }}
                            popupRender={() => <MegaOverlay groups={n.dsNhomChiTietLoai!}/>}
                            onOpenChange={(open) => setActiveKey(open ? String(n.id) : "")}
                        >
                            <NavLink
                                to=""
                                className={`fiverr-topnav__item ${activeKey === String(n.id) ? "is-active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleJobTypeCode(firstMaLoaiCongViec);
                                }}
                            >
                                {labelNode}
                            </NavLink>
                        </Dropdown>
                    ),
                };
            }

            return {
                key: n.id,
                label: (
                    <NavLink to="" className="fiverr-topnav__item"  onClick={(e) => {
                        e.preventDefault();
                        handleJobTypeCode(firstMaLoaiCongViec);
                    }}>
                        {labelNode}
                    </NavLink>
                ),
            };
        });
    }, [activeKey, data, handleJobTypeCode]);

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
import {useEffect, useMemo, useState} from "react";
import type {MenuProps} from "antd";
import {Dropdown, Menu} from "antd";
import type {DsNhomChiTietLoai} from "@types";
import type {AppDispatch, RootState} from "@store/index.ts";
import {useDispatch, useSelector} from "react-redux";
import {menuCongViecService} from "@services/menuCongViec.service.ts";
import {useNavigate} from "react-router-dom";

function MegaOverlay({groups}: { groups: DsNhomChiTietLoai[] }) {

    const navigate = useNavigate();

    const handleGoToDetailType = (maLoaiCongviec:number) => {
        navigate(`/loai-cong-viec/${maLoaiCongviec}`);

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
                                        onClick={()=>handleGoToDetailType(g.maLoaiCongviec)}
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
    const {data} = useSelector((state: RootState) => state.menuCongViecReducer);

    useEffect(() => {
        dispatch(menuCongViecService())
    }, [])


    const items: MenuProps["items"] = useMemo(() => {
        return data?.map((n) => {
            const labelNode = (<span className="fiverr-topnav__label">{n.tenLoaiCongViec}</span>);

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
                            <a
                                href="#"
                                className={`fiverr-topnav__item ${activeKey === String(n.id) ? "is-active" : ""}`}
                            >
                                {labelNode}
                            </a>
                        </Dropdown>
                    ),
                };
            }

            return {
                key: n.id,
                label: (
                    <a href="" className="fiverr-topnav__item">
                        {labelNode}
                    </a>
                ),
            };
        });
    }, [activeKey, data]);

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
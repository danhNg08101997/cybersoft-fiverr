import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Menu } from 'antd';
import type { DsNhomChiTietLoai } from '@types';
import type { AppDispatch, RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { menuCongViecService } from '@services/menuCongViec.service';
import { NavLink, useNavigate } from 'react-router-dom';

function MegaOverlay({ groups }: { groups: DsNhomChiTietLoai[] }) {
    const navigate = useNavigate();

    const handleGoToDetailType = (
        maChiTietLoai: number,
        tenChiTiet: string,
        event: React.MouseEvent<HTMLAnchorElement>,
    ) => {
        event.preventDefault();
        navigate(
            `/danh-sach-cong-viec?maChiTietLoai=${encodeURIComponent(
                maChiTietLoai,
            )}&tenChiTiet=${encodeURIComponent(tenChiTiet)}`,
        );
    };

    return (
        <div className="fiverr-mega">
            <div className="fiverr-mega__inner">
                <div className="fiverr-mega__grid">
                    {groups.map((group) => (
                        <div key={group.id} className="fiverr-mega__col">
                            <div className="fiverr-mega__title">{group.tenNhom}</div>
                            <div className="fiverr-mega__list">
                                {group.dsChiTietLoai.map((item) => (
                                    <a
                                        key={item.id}
                                        href="/"
                                        className={`fiverr-mega__item ${!item.tenChiTiet ? 'is-link' : ''}`}
                                        onClick={(event) =>
                                            handleGoToDetailType(item.id, item.tenChiTiet, event)
                                        }
                                    >
                                        <span>{item.tenChiTiet}</span>
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
    const [activeKey, setActiveKey] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const { data } = useSelector((state: RootState) => state.menuCongViec);

    useEffect(() => {
        dispatch(menuCongViecService());
    }, [dispatch]);

    const handleJobTypeCode = useCallback(
        (maLoaiCongViec?: number) => {
            if (!maLoaiCongViec) return;
            navigate(
                `/danh-sach-cong-viec-va-loai-cong-viec?maLoaiCongviec=${encodeURIComponent(
                    maLoaiCongViec,
                )}`,
            );
        },
        [navigate],
    );

    const items: MenuProps['items'] = useMemo(() => {
        return data?.map((item) => {
            const labelNode = (
                <span className="fiverr-topnav__label">{item.tenLoaiCongViec}</span>
            );

            const firstMaLoaiCongViec = item.dsNhomChiTietLoai?.[0]?.maLoaiCongviec;

            if (item.dsNhomChiTietLoai?.length) {
                return {
                    key: item.id,
                    label: (
                        <Dropdown
                            trigger={['hover']}
                            placement="bottom"
                            styles={{ root: { paddingTop: 0 } }}
                            popupRender={() => <MegaOverlay groups={item.dsNhomChiTietLoai} />}
                            onOpenChange={(open) => setActiveKey(open ? String(item.id) : '')}
                        >
                            <NavLink
                                to="/"
                                className={`fiverr-topnav__item ${
                                    activeKey === String(item.id) ? 'is-active' : ''
                                }`}
                                onClick={(event) => {
                                    event.preventDefault();
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
                key: item.id,
                label: (
                    <NavLink
                        to="/"
                        className="fiverr-topnav__item"
                        onClick={(event) => {
                            event.preventDefault();
                            handleJobTypeCode(firstMaLoaiCongViec);
                        }}
                    >
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
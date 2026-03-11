import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import type {AppDispatch, RootState} from "@store/index.ts";
import {useDispatch, useSelector} from "react-redux";
import {layLoaiCongViecService} from "@services/layLoaiCongViec.service.ts";
import type {DsNhomChiTietLoai, MenuCongViec} from "@types";
import {Card, Tag} from "antd";

function EmptyState() {
    return (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                🎨
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Chưa có dữ liệu phù hợp</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Vui lòng kiểm tra lại mã loại công việc hoặc thử chọn danh mục khác để hiển thị nội dung.
            </p>
        </div>
    );
}

function SectionCard({
                         item,
                         onClickItem,
                     }: {
    item: DsNhomChiTietLoai;
    onClickItem: (detailId?: number, detailName?: string) => void;
}) {
    const visibleDetails = item.dsChiTietLoai?.slice(0, 9) ?? [];

    return (
        <Card className="h-full rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl [&>div]:p-0">
            <div className="overflow-hidden rounded-t-3xl bg-slate-100">
                <img
                    src={item.hinhAnh}
                    alt={item.tenNhom}
                    className="h-44 w-full object-cover transition duration-500 hover:scale-105"
                />
            </div>

            <div className="space-y-5 p-5">
                <div className="space-y-2">
                    <button
                        type="button"
                        className="cursor-pointer text-left text-2xl font-bold tracking-tight text-slate-900 transition hover:text-emerald-600"
                    >
                        {item.tenNhom}
                    </button>

                    <div className="flex flex-wrap gap-2">
                        <Tag color="green" className="rounded-full px-3 py-1 text-xs font-medium">
                            Explore
                        </Tag>
                        <Tag color="lime" className="rounded-full px-3 py-1 text-xs font-medium">
                            {visibleDetails.length || 0} dịch vụ
                        </Tag>
                    </div>
                </div>

                {visibleDetails.length > 0 ? (
                    <ul className="space-y-3">
                        {visibleDetails.map((detail) => (
                            <li key={detail.id}>
                                <button
                                    type="button"
                                    onClick={() => onClickItem(detail.id, detail.tenChiTiet)}
                                    className="cursor-pointer group flex items-center gap-3 text-left text-[15px] text-slate-600 transition hover:text-slate-900"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition group-hover:bg-emerald-500" />
                                    <span className="leading-6">{detail.tenChiTiet}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-500">
                        Nhóm này hiện chưa có danh mục chi tiết.
                    </div>
                )}
            </div>
        </Card>
    );
}

export default function JobTypeContent() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const inputValue = useMemo(
        () => searchParams.get("maLoaiCongviec")?.trim() ?? "",
        [searchParams]
    );

    const { data, loading } = useSelector(
        (state: RootState) => state.layLoaiCongViecReducer
    );

    useEffect(() => {
        if (!inputValue) return;
        dispatch(layLoaiCongViecService(inputValue));
    }, [dispatch, inputValue]);

    const categoryData = useMemo<MenuCongViec | null>(() => {
        if (!data) return null;

        if (Array.isArray(data)) {
            return (data[0] as MenuCongViec) ?? null;
        }

        return data as MenuCongViec;
    }, [data]);

    const groups = categoryData?.dsNhomChiTietLoai ?? [];


    const handleNavigate = (detailId?: number, detailName?:string) => {
        const params = new URLSearchParams();
        params.set("maChiTietLoai", String(detailId));
        params.set("tenChiTiet", String(detailName));
        navigate(`/danh-sach-cong-viec?${params.toString()}`);
    };

    return (
        <section className="min-h-screen bg-[#f7f7f7] py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                            Explore categories
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            {categoryData?.tenLoaiCongViec
                                ? `Explore ${categoryData.tenLoaiCongViec}`
                                : "Explore Graphics & Design"}
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                            Giao diện được dựng theo phong cách marketplace hiện đại, kết hợp TailwindCSS,
                            Flowbite và Ant Design để dễ mở rộng cho dữ liệu động từ API.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                            Mã loại công việc
                        </p>
                        <p className="mt-1 text-2xl font-bold text-slate-900">{inputValue || "--"}</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                            >
                                <div className="h-44 animate-pulse bg-slate-200" />
                                <div className="space-y-3 p-5">
                                    <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                                    <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                                    <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : groups.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {groups.map((group) => (
                            <SectionCard
                                key={group.id}
                                item={group}
                                onClickItem={(detailId, detailName) => handleNavigate(detailId, detailName)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </section>
    );
}


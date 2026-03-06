import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@store/index";
import { searchJobService } from "@services/searchJob.service";

function JobList(): React.JSX.Element {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const keyword = (searchParams.get("keyword") ?? "").trim();
    const { loading, data, error } = useSelector(
        (state: RootState) => state.searchJobReducer
    );

    useEffect(() => {
        if (!keyword) return;
        dispatch(searchJobService(keyword));
    }, [dispatch, keyword]);

    if (!keyword) {
        return <div className="p-6">Vui lòng nhập từ khóa tìm kiếm.</div>;
    }

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">{String(error)}</div>;
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <h2 className="mb-6 text-2xl font-bold">
                Kết quả tìm kiếm cho: <span className="text-emerald-600">{keyword}</span>
            </h2>

            {!data || data.length === 0 ? (
                <div>Không tìm thấy công việc phù hợp.</div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {data.map((item: any) => (
                        <div
                            key={item.maCongViec}
                            className="overflow-hidden rounded-xl border bg-white shadow-sm"
                        >
                            <img
                                src={item.hinhAnh}
                                alt={item.tenCongViec}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="line-clamp-2 font-semibold">{item.tenCongViec}</h3>
                                <p className="mt-2 text-sm text-slate-500">
                                    ⭐ {item.danhGia ?? 0}
                                </p>
                                <p className="mt-1 font-bold text-emerald-600">
                                    ${item.giaTien ?? 0}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default JobList;
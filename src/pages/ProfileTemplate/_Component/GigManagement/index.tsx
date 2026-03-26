import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@store/index.ts";
import {useEffect} from "react";
import {layDanhSachDaThueService} from "@services/congViecDaThue.service.ts";
import type {CongViecDaThue} from "@types";

type TCongViecDaThue = {
    item: CongViecDaThue
}
function GigItem({item}:TCongViecDaThue) {
    return (
        <div className="bg-white border rounded p-4 flex gap-4 items-center">

            {/* Image */}
            <img
                src={item.congViec.hinhAnh}
                className="w-28 h-20 object-cover rounded"
            />

            {/* Content */}
            <div className="flex-1">
                <h3 className="font-semibold">
                    {item.congViec.tenCongViec}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.congViec.moTaNgan}
                </p>

                <div className="text-yellow-500 text-sm mt-1">
                    {Array.from({ length: item.congViec.saoCongViec }).map((_, index) => (
                        <span key={index}>⭐</span>
                    ))}
                    {/*⭐⭐⭐⭐ 4.3*/}
                    <span>{`${item.congViec.saoCongViec}.0`}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button className="border px-3 py-1 text-sm rounded hover:bg-gray-100">
                    View detail
                </button>

                <button className="border px-3 py-1 text-sm rounded hover:bg-gray-100">
                    Edit
                </button>

                <button className="border px-3 py-1 text-sm rounded hover:bg-red-50 text-red-500">
                    X
                </button>
            </div>

        </div>
    );
}

export default function GigManagement() {
    const dispatch = useDispatch<AppDispatch>();

    const {data: thueCongViec} = useSelector((state: RootState) => state.layDanhSachDaThue)
    console.log("🚀 ~ GigManagement ~ thueCongViec: ", thueCongViec);

    useEffect(() => {
        dispatch(layDanhSachDaThueService()).unwrap()
    }, [dispatch]);

    return (
        <div className="space-y-6">

            {/* Notice */}
            <div className="bg-white border rounded p-4 flex justify-between items-center">
                <p className="text-gray-600">
                    It seems that you don't have any active Gigs. Get selling!
                </p>

                <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Create a New Gig
                </button>
            </div>

            {/* Gig list */}
            {thueCongViec?.map((item)=>(
                <GigItem key={item.id} item = {item} />
            ))}

        </div>
    );
}
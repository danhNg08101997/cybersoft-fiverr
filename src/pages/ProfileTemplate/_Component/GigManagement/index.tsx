import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@store/index';
import { useEffect } from 'react';
import { layDanhSachDaThueService } from '@services/congViecDaThue.service';
import type { CongViecDaThue } from '@types';
import AppLoader from '@shared/AppLoader';

type TCongViecDaThue = {
  item: CongViecDaThue;
};

function GigItem({ item }: TCongViecDaThue) {
  return (
    <div className="flex items-center gap-4 rounded border bg-white p-4">
      <img
        src={item.congViec.hinhAnh}
        alt={item.congViec.tenCongViec}
        className="h-20 w-28 rounded object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.congViec.tenCongViec}</h3>

        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {item.congViec.moTaNgan}
        </p>

        <div className="mt-1 text-sm text-yellow-500">
          {Array.from({ length: Math.floor(item.congViec.saoCongViec) }).map((_, index) => (
            <span key={index}>⭐</span>
          ))}
          <span>{` ${item.congViec.saoCongViec}.0`}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="rounded border px-3 py-1 text-sm hover:bg-gray-100">
          View detail
        </button>
        <button className="rounded border px-3 py-1 text-sm hover:bg-gray-100">
          Edit
        </button>
        <button className="rounded border px-3 py-1 text-sm text-red-500 hover:bg-red-50">
          X
        </button>
      </div>
    </div>
  );
}

export default function GigManagement() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: thueCongViec,
    loading,
    error,
  } = useSelector((state: RootState) => state.layDanhSachDaThue);

  useEffect(() => {
    dispatch(layDanhSachDaThueService());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded border bg-white p-4">
        <p className="text-gray-600">
          Manage your rented gigs and track service progress here.
        </p>

        <button className="rounded bg-green-500 px-4 py-2 text-white">
          Create a New Gig
        </button>
      </div>

      {loading ? (
        <AppLoader />
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      ) : !thueCongViec || thueCongViec.length === 0 ? (
        <div className="rounded border bg-white p-6 text-sm text-slate-500">
          Bạn chưa có công việc đã thuê nào.
        </div>
      ) : (
        thueCongViec.map((item) => <GigItem key={item.id} item={item} />)
      )}
    </div>
  );
}
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import type { AppDispatch, RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { layLoaiCongViecService } from '@services/layLoaiCongViec.service';
import type { DsNhomChiTietLoai, MenuCongViec } from '@types';
import AppLoader from '@shared/AppLoader';

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
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

function SectionColumn({
  item,
  onClickItem,
}: {
  item: DsNhomChiTietLoai;
  onClickItem: (detailId?: number, detailName?: string) => void;
}) {
  const visibleDetails = item.dsChiTietLoai?.slice(0, 9) ?? [];

  return (
    <div className="flex h-full flex-col">
      <button type="button" className="group mb-4 block overflow-hidden rounded-xl bg-slate-100 text-left">
        <img
          src={item.hinhAnh}
          alt={item.tenNhom}
          className="h-36.25 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </button>

      <h2 className="mb-4 text-[17px] font-bold leading-7 text-slate-900 lg:text-[18px]">
        {item.tenNhom}
      </h2>

      {visibleDetails.length > 0 ? (
        <div className="space-y-3">
          {visibleDetails.map((detail) => (
            <button
              key={detail.id}
              type="button"
              onClick={() => onClickItem(detail.id, detail.tenChiTiet)}
              className="block cursor-pointer text-left text-[15px] leading-7 text-slate-500 transition hover:text-slate-900"
            >
              {detail.tenChiTiet}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-[15px] leading-7 text-slate-400">Chưa có danh mục chi tiết.</p>
      )}
    </div>
  );
}

export default function JobTypeContent() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const maLoaiCongviec = useMemo(
    () => searchParams.get('maLoaiCongviec')?.trim() ?? '',
    [searchParams],
  );

  const { data, loading, error } = useSelector(
    (state: RootState) => state.layLoaiCongViec,
  );

  useEffect(() => {
    if (!maLoaiCongviec) return;
    dispatch(layLoaiCongViecService(maLoaiCongviec));
  }, [dispatch, maLoaiCongviec]);

  const categoryData = useMemo<MenuCongViec | null>(() => {
    if (!data || data.length === 0) return null;
    return data[0] ?? null;
  }, [data]);

  const groups = categoryData?.dsNhomChiTietLoai ?? [];

  const handleNavigate = (detailId?: number, detailName?: string) => {
    if (!detailId) return;

    const params = new URLSearchParams();
    params.set('maChiTietLoai', String(detailId));
    if (detailName) params.set('tenChiTiet', detailName);

    navigate(`/danh-sach-cong-viec?${params.toString()}`);
  };

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-345 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h3 className="text-[25px] font-bold leading-tight text-slate-900">
            {categoryData?.tenLoaiCongViec
              ? `Explore ${categoryData.tenLoaiCongViec}`
              : 'Explore services'}
          </h3>
        </div>

        {loading ? (
          <AppLoader />
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error.message}
          </div>
        ) : groups.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
            {groups.map((group) => (
              <SectionColumn key={group.id} item={group} onClickItem={handleNavigate} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
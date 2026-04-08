import Navbar from '@components/Navbar';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import JobBreadcrumbComponent from '@pages/JobDetailTemplate/_Components/JobBreadcrumb';
import TopCategoryBar from '@pages/JobListTemplate/_Components/TopCategoryBar';
import JobDetailContentLeft from '@pages/JobDetailTemplate/_Components/JobDetailContentLeft';
import JobDetailContentRight from '@pages/JobDetailTemplate/_Components/JobDetailContentRight';
import FooterHome from '@components/Footer';
import { ChevronDown, Star } from 'lucide-react';
import type { AppDispatch, RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { layCongViecChiTietService } from '@services/layCongViecChiTiet.service';
import { layBinhLuanTheoCongViecService } from '@services/layBinhLuanTheoCongViec.service';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, type FormProps } from 'antd';
import type { BinhLuanPayload } from '@types';
import { binhLuanService } from '@services/binhLuan.service';
import AppLoader from '@shared/AppLoader';

export default function JobDetailTemplate() {
  const [form] = Form.useForm<BinhLuanPayload>();
  const [searchParams] = useSearchParams();
  const [isLoginModal, setIsLoginModal] = useState(false);

  const maCongViec = searchParams.get('maCongViec')?.trim() ?? '';
  const keyword = searchParams.get('keyword')?.trim() ?? '';

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<string>(keyword);

  const { data, loading, error } = useSelector(
    (state: RootState) => state.layCongViecChiTiet,
  );
  const { data: currentUser } = useSelector((state: RootState) => state.auth);
  const {
    data: binhLuan,
    loading: commentsLoading,
    error: commentsError,
  } = useSelector((state: RootState) => state.layBinhLuanTheoCongViec);
  const { loading: createCommentLoading } = useSelector(
    (state: RootState) => state.binhLuan,
  );

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  useEffect(() => {
    if (!maCongViec) return;
    dispatch(layCongViecChiTietService(maCongViec));
    dispatch(layBinhLuanTheoCongViecService(maCongViec));
  }, [dispatch, maCongViec]);

  const handleSearch = (value: string) => {
    navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(value.trim())}`);
  };

  const handleAddComment: FormProps<BinhLuanPayload>['onFinish'] = async (values) => {
    if (!currentUser) {
      setIsLoginModal(true);
      return;
    }

    const payload = {
      maCongViec: Number(maCongViec),
      maNguoiBinhLuan: currentUser.user.id ?? 0,
      ngayBinhLuan: new Date(),
      noiDung: values.noiDung,
      saoBinhLuan: 5,
    };

    try {
      await dispatch(binhLuanService(payload)).unwrap();
      form.resetFields();
      dispatch(layBinhLuanTheoCongViecService(maCongViec));
    } catch {
      // redux state đã giữ lỗi
    }
  };

  const jobDetail = useMemo(() => data?.[0] ?? null, [data]);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error.message}
      </div>
    );
  }

  if (!jobDetail) {
    return (
      <div className="p-6 text-slate-600">
        Không tìm thấy chi tiết công việc.
      </div>
    );
  }

  return (
    <>
      <Navbar
        variant="JOB"
        inputValue={inputValue}
        onChangeInput={setInputValue}
        onSearch={handleSearch}
        checkLogin={isLoginModal}
        onCloseLoginRequest={() => setIsLoginModal(false)}
      />

      <TopCategoryBar />

      <div className="min-h-screen bg-white text-[#404145]">
        <div className="mx-auto max-w-350 px-3 py-3 lg:px-8">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,820px)_420px]">
            <main>
              <JobBreadcrumbComponent
                tenLoaiCongViec={jobDetail.tenLoaiCongViec}
                tenNhomChiTietLoai={jobDetail.tenNhomChiTietLoai}
                tenChiTietLoai={jobDetail.tenChiTietLoai}
              />

              <JobDetailContentLeft item={jobDetail} />

              <section className="mt-14 border-t border-[#e4e5e7] pt-12">
                <h2 className="text-[24px] font-bold text-[#222325]">
                  Reviews
                </h2>

                {commentsError && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {commentsError.message}
                  </div>
                )}

                <div className="mt-8">
                  <div className="mb-6 flex items-center gap-2 text-[#222325]">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold">5.0</span>
                    <span className="text-sm text-slate-500">
                      {`(${binhLuan?.length ?? 0} reviews)`}
                    </span>
                  </div>

                  <Form<BinhLuanPayload> form={form} onFinish={handleAddComment} layout="vertical">
                    <Form.Item
                      name="noiDung"
                      rules={[{ required: true, message: 'Vui lòng nhập nội dung bình luận.' }]}
                    >
                      <TextArea
                        rows={4}
                        placeholder="Chia sẻ cảm nhận của bạn về dịch vụ này..."
                      />
                    </Form.Item>

                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={createCommentLoading}
                      className="bg-green-500!"
                    >
                      Gửi bình luận
                    </Button>
                  </Form>

                  <div className="mt-8 space-y-6">
                    {commentsLoading ? (
                      <AppLoader />
                    ) : (
                      (binhLuan ?? []).map((item) => (
                        <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                          <div className="mb-2 font-semibold text-slate-900">
                            {item.tenNguoiBinhLuan}
                          </div>
                          <div className="mb-2 text-sm text-slate-500">
                            {item.ngayBinhLuan}
                          </div>
                          <p className="text-slate-700">{item.noiDung}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <section className="mt-14 border-t border-[#e4e5e7] pt-12">
                  <h2 className="text-[24px] font-bold tracking-[-0.02em] text-[#222325]">
                    FAQ
                  </h2>

                  <div className="mt-7 divide-y divide-[#e4e5e7] border-t border-[#e4e5e7]">
                    {[
                      'Who will own the web application after delivery?',
                      'Will I get source code of the web application?',
                      'What other costs are not included in the price?',
                    ].map((question) => (
                      <button
                        key={question}
                        className="flex w-full items-center justify-between gap-6 py-8 text-left transition hover:text-[#1dbf73]"
                      >
                        <span className="text-[18px] font-medium leading-[1.45] text-[#62646a]">
                          {question}
                        </span>
                        <ChevronDown className="h-6 w-6 shrink-0 text-[#74767e]" />
                      </button>
                    ))}
                  </div>
                </section>
              </section>
            </main>

            <aside>
              <div className="sticky top-24">
                <JobDetailContentRight
                  item={jobDetail}
                  maCongViec={maCongViec}
                  onLogin={() => setIsLoginModal(true)}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <FooterHome />
    </>
  );
}
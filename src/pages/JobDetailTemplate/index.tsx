import Navbar from "@components/Navbar";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import JobBreadcrumbComponent from "@pages/JobDetailTemplate/_Components/JobBreadcrumb";
import TopCategoryBar from "@pages/JobListTemplate/_Components/TopCategoryBar";
import JobDetailContent from "@pages/JobDetailTemplate/_Components/JobDetailContent";
import JobDetailContentRight from "@pages/JobDetailTemplate/_Components/JobDetailContent/JobDetailContentRight";
import FooterHome from "@components/Footer";
import {ChevronDown, Star} from "lucide-react";
import type {AppDispatch, RootState} from "@store/index.ts";
import {useDispatch, useSelector} from "react-redux";
import {layCongViecChiTietService} from "@services/layCongViecChiTiet.service.ts";
import {layBinhLuanTheoCongViecService} from "@services/layBinhLuanTheoCongViec.service.ts";
import TextArea from "antd/es/input/TextArea";
import {Form, type FormProps} from "antd";
import type {BinhLuanRequst} from "@types";
import {binhLuanService} from "@services/binhLuan.service.ts";


export default function JobDetailTemplate() {
    const [form] = Form.useForm<BinhLuanRequst>();

    const [searchParams] = useSearchParams();

    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);

    const maCongViec = searchParams.get("maCongViec")?.trim() ?? "";
    const keyword = searchParams.get("keyword")?.trim() ?? "";

    const { data, loading } = useSelector(
        (state: RootState) => state.layCongViecChiTiet
    );

    const {data: currentUser} = useSelector((state: RootState) => state.auth);


    const {data: binhLuan} = useSelector((state: RootState) => state.layBinhLuanTheoCongViec)

    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState<string>(keyword);

    const handleSearch = (value: string) => {
        navigate(`/danh-sach-cong-viec?keyword=${encodeURIComponent(value.trim())}`);
    };

    const handleAddComment: FormProps<BinhLuanRequst>["onFinish"] = async (values ) => {
        if(!currentUser){
            return setIsLoginModal(true)
        }
        const payload = {
            maCongviec: Number(maCongViec),
            maNguoiBinhLuan: currentUser?.user.id,
            ngayBinhLuan: new Date().toLocaleDateString('vi-VN'),
            noiDung: values?.noiDung,
            saoBinhLuan: 5
        }
        try{
            await dispatch(binhLuanService(payload)).unwrap()
            form.resetFields()
            dispatch(layBinhLuanTheoCongViecService(maCongViec))
        }catch{
            // error đã được lưu ở redux
        }
    }

    useEffect(() => {
        if (!maCongViec) return;
        dispatch(layCongViecChiTietService(maCongViec));
        dispatch(layBinhLuanTheoCongViecService(maCongViec))
    }, [dispatch, maCongViec]);

    if (loading) {
        return (
            <div className="p-6">
                Đang tải chi tiết công việc...
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

            <TopCategoryBar/>

            {data?.map((item) => (
            <div key = {item.id} className="min-h-screen bg-white text-[#404145]">
                <div className="mx-auto max-w-350 px-3 py-3 lg:px-8">
                    <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,820px)_420px]">
                        {/*LEFT CONTENT*/}
                        <main>

                                <JobBreadcrumbComponent
                                    tenLoaiCongViec={item.tenLoaiCongViec}
                                    tenNhomChiTietLoai={item.tenNhomChiTietLoai}
                                    tenChiTietLoai={item.tenChiTietLoai}
                                />

                            <JobDetailContent item = {item}/>

                            {/*USER INFOR*/}
                            <section className="mt-14 border-t border-[#e4e5e7] pt-12">
                                <h2 className="text-[44px] font-bold tracking-[-0.02em] text-[#222325] md:text-[54px]">
                                    Get to know {item.tenNguoiTao}
                                </h2>

                                <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
                                    <div className="relative shrink-0">
                                        <div
                                            className="flex h-47 w-47 items-center justify-center rounded-full bg-linear-to-b from-[#4f8a49] to-[#96cf47] p-2 shadow-sm">
                                            <div
                                                className="relative h-full w-full overflow-hidden rounded-full bg-white ring-4 ring-white">
                                                <img
                                                    src={ `${ item.avatar ? item.avatar : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }` }
                                                    alt={ `${ item.tenNguoiTao ? item.tenNguoiTao : "seller avatar" }` }
                                                    className="h-full w-full object-cover"
                                                />
                                                <button
                                                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/65">
                                                    <div
                                                        className="ml-1 h-0 w-0 border-b-10 border-l-16 border-t-10 border-b-transparent border-l-white border-t-transparent"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 pt-1">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <h3 className="text-[28px] font-bold text-[#222325] md:text-[34px]">
                                                {item.tenNguoiTao}
                                            </h3>
                                            <span
                                                className="rounded-lg bg-[#ecebff] px-4 py-2 text-[18px] font-semibold text-[#3b3ea8]">
                                                Vetted Pro
                                            </span>
                                        </div>

                                        <p className="mt-4 max-w-245 text-[26px] leading-[1.45] text-[#62646a] md:text-[32px]">
                                            Mobile App Developer I Full Stack Web Developer I Software Developer
                                        </p>

                                        <div
                                            className="mt-5 flex flex-wrap items-center gap-4 text-[22px] text-[#222325]">
                                            <div className="flex items-center gap-2 font-bold">
                                                <Star className="h-7 w-7 fill-current"/>
                                                <span>{`${item.congViec.saoCongViec}.0`}</span>
                                            </div>
                                            <button
                                                className="text-[22px] text-[#62646a] underline decoration-[#b5b6ba] underline-offset-4 transition hover:text-[#1dbf73]">
                                                (816)
                                            </button>
                                            <span className="h-10 w-px bg-[#d9d9d9]"/>
                                            <span
                                                className="rounded-lg bg-[#f6e3b3] px-4 py-2 text-[20px] font-semibold text-[#5d2d00]">
                                                Top Rated ♦♦♦
                                            </span>
                                        </div>

                                        <button
                                            className="mt-8 inline-flex min-h-19 items-center justify-center rounded-2xl border border-[#222325] bg-white px-7 text-[24px] font-semibold text-[#222325] transition hover:bg-[#f5f5f5]">
                                            Contact me
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/*FAQ*/}
                            <section className="mt-14 border-t border-[#e4e5e7] pt-12">
                                <h2 className="text-[34px] font-bold tracking-[-0.02em] text-[#222325] md:text-[40px]">
                                    FAQ
                                </h2>

                                <div className="mt-7 divide-y divide-[#e4e5e7] border-t border-[#e4e5e7]">
                                    {[
                                        "Who will own the web application after delivery ?",
                                        "Will I get a code of the web Application ?",
                                        "What will be the other costs which are not included in price ?",
                                    ].map((question) => (
                                        <button
                                            key={question}
                                            className="flex w-full items-center justify-between gap-6 py-8 text-left transition hover:text-[#1dbf73]"
                                        >
                                            <span className="text-[28px] font-medium leading-[1.45] text-[#62646a] md:text-[30px]">
                                                {question}
                                            </span>
                                            <ChevronDown className="h-8 w-8 shrink-0 text-[#74767e]" />
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/*REVIEW*/}
                            <section className="mt-14 border-t border-[#e4e5e7] pt-12">
                                <h2 className="text-[34px] font-bold text-[#222325] md:text-[40px]">Reviews</h2>

                                <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-[24px] font-semibold text-[#222325]">65 reviews for this Gig</h3>
                                            <div className="flex items-center gap-2 text-[#222325]">
                                                <div className="flex">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star key={i} className="h-6 w-6 fill-current" />
                                                    ))}
                                                </div>
                                                <span className="text-[22px] font-bold">5.0</span>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-5">
                                            {[
                                                { label: "5 Stars", value: 62, percent: 95 },
                                                { label: "4 Stars", value: 3, percent: 10 },
                                                { label: "3 Stars", value: 0, percent: 0 },
                                                { label: "2 Stars", value: 0, percent: 0 },
                                                { label: "1 Star", value: 0, percent: 0 },
                                            ].map((item) => (
                                                <div key={item.label} className="flex items-center gap-4">
                                                    <span className="w-22.5 text-[20px] text-[#62646a]">{item.label}</span>

                                                    <div className="relative h-3 flex-1 rounded-full bg-[#e4e5e7]">
                                                        <div
                                                            style={{ width: `${item.percent}%` }}
                                                            className="absolute left-0 top-0 h-full rounded-full bg-[#222325]"
                                                        />
                                                    </div>

                                                    <span className="w-10 text-[18px] text-[#62646a]">({item.value})</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[24px] font-semibold text-[#222325]">Rating Breakdown</h3>

                                        <div className="mt-8 space-y-6 text-[20px]">
                                            {[
                                                "Seller communication level",
                                                "Quality of delivery",
                                                "Value of delivery",
                                            ].map((label) => (
                                                <div key={label} className="flex items-center justify-between">
                                                    <span className="text-[#62646a]">{label}</span>
                                                    <div className="flex items-center gap-2 font-semibold text-[#222325]">
                                                        <Star className="h-6 w-6 fill-current" />
                                                        <span>5</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/*COMMENT*/}
                            <section className="mt-12 space-y-10">
                                <div className="border-b border-[#e4e5e7] pb-6">

                                    <h3 className="text-[22px] font-semibold text-[#222325]">Filters</h3>

                                    <div className="mt-3 flex items-center gap-3 text-[16px] text-[#62646a]">
                                        <span className="font-medium">Industry</span>
                                        <button className="flex items-center gap-2 font-semibold text-[#222325] hover:text-[#1dbf73]">
                                            All Industries
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="border-b border-[#e4e5e7] pb-8">
                                    {binhLuan && binhLuan.map((item, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <img
                                                src={item.avatar}
                                                alt={item.tenNguoiBinhLuan}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 text-[18px] font-semibold text-[#222325]">
                                                    <span>{item.tenNguoiBinhLuan}</span>
                                                    <div className="flex text-[#222325]">
                                                        {Array.from({ length: item.saoBinhLuan }).map((_, i) => (
                                                            <Star key={i} className="h-4 w-4 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mt-1 flex items-center gap-2 text-[14px] text-[#74767e]">
                                                    <span>🇺🇸</span>
                                                    <span>United States</span>
                                                </div>

                                                <p className="mt-3 max-w-190 text-[16px] leading-7 text-[#404145]">
                                                    {item.noiDung}
                                                </p>

                                                <div className="mt-3 flex items-center gap-6 text-[14px] text-[#74767e]">
                                                    {/*<span>Published 10 months ago</span>*/}
                                                    <span>{item.ngayBinhLuan}</span>
                                                    <button className="hover:text-[#1dbf73]">Helpful</button>
                                                    <button className="hover:text-[#1dbf73]">Not Helpful</button>
                                                </div>

                                                {/*<div className="mt-6 flex items-start gap-3 rounded-lg bg-[#f7f7f7] p-4">*/}
                                                {/*    <img*/}
                                                {/*        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"*/}
                                                {/*        className="h-9 w-9 rounded-full object-cover"*/}
                                                {/*    />*/}
                                                {/*    <div>*/}
                                                {/*        <div className="text-[15px] font-semibold text-[#222325]">*/}
                                                {/*            Seller's Response*/}
                                                {/*        </div>*/}
                                                {/*        <p className="mt-1 max-w-[640px] text-[15px] leading-6 text-[#404145]">*/}
                                                {/*            Thank you for your order it was a great experience working with you. Will be looking forward to work with you more.*/}
                                                {/*        </p>*/}
                                                {/*        <div className="mt-2 text-[13px] text-[#74767e]">*/}
                                                {/*            Published 10 months ago*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex items-start gap-4 mt-20">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                                            alt="hinh-anh"
                                            className="h-10 w-10"
                                        />
                                        <Form<BinhLuanRequst> form={form}
                                                              className="flex-1"
                                                              onFinish={handleAddComment}>
                                            <Form.Item
                                            name="noiDung"
                                            >
                                                <TextArea
                                                    placeholder="Write a comment..."
                                                    className="h-30 w-full rounded-md border border-[#e4e5e7] p-3 text-[15px] outline-none focus:border-[#1dbf73]"
                                                />
                                            </Form.Item>

                                            <button type="submit" className="mt-4 rounded bg-[#1dbf73] px-5 py-2 text-[14px] font-semibold text-white hover:bg-[#19a463]">
                                                Add Comment
                                            </button>
                                        </Form>
                                    </div>
                                </div>
                            </section>
                        </main>

                        {/*RIGHT CONTENT*/}
                        <aside className="xl:sticky xl:top-6 xl:self-start">
                        <JobDetailContentRight item = {item} maCongViec = {maCongViec} onLogin={() => setIsLoginModal(true)}/>
                        </aside>
                    </div>
                </div>
            </div>
            ))}

            {/*FOOTER*/}
            <FooterHome/>
        </>
    );
}

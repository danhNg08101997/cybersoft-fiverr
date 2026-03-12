type JobBreadcrumbProps = {
    tenLoaiCongViec?: string;
    tenNhomChiTietLoai?: string;
    tenChiTietLoai?: string;
};

export default function JobBreadcrumbComponent ({ tenLoaiCongViec, tenNhomChiTietLoai, tenChiTietLoai, }: JobBreadcrumbProps) {

    const breadcrumbItems = [
        tenLoaiCongViec,
        tenNhomChiTietLoai,
        tenChiTietLoai,
    ].filter(Boolean) as string[];

    return (
        // <div className="w-full">
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-[15px] text-[#74767e]">{breadcrumbItems.map((item, index) => {
                    const isLast = index === breadcrumbItems.length - 1;
                    return (
                        <div key={`${item}-${index}`} className="flex items-center gap-2">
                           <span className="cursor-pointer transition hover:text-[#1dbf73]">
                                {item}
                            </span>

                            {!isLast && <span className="text-gray-400">›</span>}
                        </div>
                    )
                })}
            </nav>
        // </div>
    );
}
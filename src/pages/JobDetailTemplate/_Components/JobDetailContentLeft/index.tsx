import type {DSCongViecTheoTen} from '@types';
import AboutGig from "@pages/JobDetailTemplate/_Components/AboutGig/page.tsx";
import Vetted from "@pages/JobDetailTemplate/_Components/Vetted/page.tsx";
import TrophyComponent from "@pages/JobDetailTemplate/_Components/Trophy/page.tsx";
import SellerHeader from "@pages/JobDetailTemplate/_Components/SellerHeader/page.tsx";
import Gallery from "@pages/JobDetailTemplate/_Components/GalleryComponent/page.tsx";

type JobDetailContentProps = {
    item: DSCongViecTheoTen;
};

export default function JobDetailContentLeft({ item }: JobDetailContentProps) {
    return (
        <section className="mt-4">
            <h1 className="max-w-225 text-[34px] font-bold leading-[1.2] text-[#222325]">
                {item.congViec.tenCongViec}
            </h1>

            <div className="mt-6">
                <SellerHeader item={item} />
            </div>

            <TrophyComponent/>
            <Gallery imageUrl={item.congViec.hinhAnh} />
            <Vetted/>
            <AboutGig description={item.congViec.moTa} />
        </section>
    );
}
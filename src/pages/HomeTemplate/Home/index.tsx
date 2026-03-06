import TrustedComponent from "@pages/HomeTemplate/Home/Trusted";
import ServiceComponent from "@pages/HomeTemplate/Home/Services/Services.tsx";
import FeatureComponent from "@pages/HomeTemplate/Home/Features";
import TestimonialComponent from "@pages/HomeTemplate/Home/Testimonial/Testimonial.tsx";
import MarketplaceComponent from "@pages/HomeTemplate/Home/Marketplace";

function Home() {

    return (
        <>
            {/* TRUSTED */}
            <TrustedComponent />
            {/* SERVICES */}
            <ServiceComponent />
            {/* FEATURES */}
            <FeatureComponent />
            {/* TESTIMONIAL */}
            <TestimonialComponent/>
            {/* MARKETPLACE */}
            <MarketplaceComponent/>
        </>
    );
}

export default Home;
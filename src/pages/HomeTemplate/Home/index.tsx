import TrustedComponent from '@pages/HomeTemplate/Home/Trusted';
import ServiceComponent from '@pages/HomeTemplate/Home/Services/Services';
import FeatureComponent from '@pages/HomeTemplate/Home/Features';
import TestimonialComponent from '@pages/HomeTemplate/Home/Testimonial/Testimonial';
import MarketplaceComponent from '@pages/HomeTemplate/Home/Marketplace';
import type { JSX } from 'react';

function Home(): JSX.Element {
  return (
    <>
      <TrustedComponent />
      <ServiceComponent />
      <FeatureComponent />
      <TestimonialComponent />
      <MarketplaceComponent />
    </>
  );
}

export default Home;
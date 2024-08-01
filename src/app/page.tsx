
import Section from '@/components/sections/section';
import Reviews from '@/components/reviews';
import Product from '@/components/products';
import SlideSection from '@/components/sections/slideSection';
import ApplySection from '@/components/sections/applySection';
import AppleWatchSection from '@/components/sections/appleWatchSection';
import FaqSection from '@/components/sections/faqSection';
import LonelySection from '@/components/sections/lonelySection'

export default function Home() {
  return (
    <div className="flex flex-col items-center ">
      <ApplySection />
      <AppleWatchSection />
      <SlideSection  />

      <LonelySection/>
      <Reviews />
      <Product />
      <FaqSection/>
      
    </div>
  );
}

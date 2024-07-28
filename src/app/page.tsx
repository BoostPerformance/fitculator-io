import Image from 'next/image';
import Button from '@/components/button';
import Section from '@/components/section';
import Reviews from '@/components/reviews';
import Product from '@/components/products';
import SlideSection from '@/components/slideSection';
import ApplySection from '@/components/applySection';
import AppleWatchSection from '@/components/appleWatchSection';
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <ApplySection />

      <SlideSection />

      <AppleWatchSection />

      <section className=" flex flex-col items-center w-full py-[11rem] h-auto bg-gray-2 sm:py-[6em]">
        <Section
          title={
            <>
              외로운 운동은 그만. <br /> 즐거운 운동은 같이.
            </>
          }
          imageSrc="example"
          reverseY
          textCenter
          imgeSize={1000}
        />
      </section>

      <Reviews />

      <Product />

      <section className="flex flex-col items-center w-full py-[10rem] h-auto sm:py-[5rem]">
        <Section
          title={
            <>
              FAQ <br />더 궁금한 점이 있으신가요?
            </>
          }
          description={
            <>
              자주 물어보신 질문들만 <br />
              모아 둔 FAQ를 참고해 주세요.
            </>
          }
          textCenter
          reverseY
        />
      </section>
    </div>
  );
}

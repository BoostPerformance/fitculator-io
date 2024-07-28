import Image from 'next/image';
import Button from '@/components/button';
import Section from '@/components/section';
import Reviews from '@/components/reviews';
import Product from '@/components/products';
import SlideSection from '@/components/slideSection';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className=" relative mb-10">
        <div className="absolute flex flex-col items-center justify-center w-full h-[30rem] md:h-auto mt-[10rem] md:mt-[5rem] md:ml-[3rem] sm:pt-[2rem] sm:m-1">
          <div>
            <Section
              title={
                <>
                  정확한 운동량을 알려주는 <br /> 나만의 피트니스 가이드, <br />
                  핏큘레이터
                </>
              }
              description={<>핏큘레이터와 함께 꾸준한 운동을 생활화 하세요.</>}
            />

            <Button version="ver2">핏큘레이터 신청하기</Button>
          </div>
        </div>
        <div className="w-full bg-gradient-to-t">
          <Image
            className="size-full"
            src="/images/landing-running.png"
            alt="woman running"
            width={2300}
            height={10}
            objectFit="cover"
          />
          <div
            className="absolute inset-0 bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-white to-transparent"
            style={{ top: '60%' }}
          />
        </div>
      </section>

      <section className="flex flex-col items-center w-full h-[30rem] mb-10 gap-[2rem] sm:pt-[10rem] sm:mb-[7rem]">
        <Image
          className="sm:w-[4rem]"
          src="/svg/smart-watch.svg"
          alt="smart-watch"
          width={100}
          height={10}
        />
        <Section
          title={
            <>
              세계보건기구(WHO)의 신체활동 가이드라인에 맞춘 <br /> 체계적인
              운동관리로 (...)
            </>
          }
          description={<> 스마트워치를 가지고 있다면 누구나 사용할 수 있어요</>}
          reverseY
          textCenter
        />
      </section>

      <SlideSection />

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

import Section from './section';
import Button from '../button';
import Image from 'next/image';

export default function RegisterSection() {
  return (
    <section className=" relative mb-10 sm:mb-0">
      <div className="absolute flex flex-col items-center justify-center w-full h-[30rem] mt-[10rem] md:h-auto md:mt-[5rem] md:ml-[8rem] sm:pt-[2rem] sm:m-1 z-10">
        <div>
          <Section
            title={
              <>
                정확한 운동량을 알려주는 <br /> 나만의 피트니스 가이드, <br />
                핏큘레이터
              </>
            }
            description={<>핏큘레이터와 함께 꾸준한 운동을 생활화 하세요.</>}
            title3700
            description1_75700
          />

          <Button text="핏큘레이터 신청하기" variant="default" size="md" />
        </div>
      </div>
      <div>
        <Image
          src="/images/landing-running.png"
          alt="woman running"
          width={2300}
          height={10}
          objectFit="cover"
        />
        <div className="absolute inset-0 h-[40%] bg-gradient-to-t from-white to-transparent top-[60%] sm:top-[62%] md:top-[60%]" />
      </div>
    </section>
  );
}

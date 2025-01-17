//import Section from './section';
import Button from '../button';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterSection() {
  return (
    <section className="relative">
      <div className="absolute flex items-center justify-center w-full h-[30rem] mt-[8rem] md:h-[38rem] md:mt-[5rem] md:ml-[4rem] sm:top-[1rem] sm:ml-auto z-10 md:items-start md:justify-start sm:items-start sm:justify-start">
        <div className="flex flex-col gap-[2.5rem]">
          <div>
            <div className="text-3-700 sm:text-left sm:px-[2rem] sm:pb-[0.3rem] sm:text-1.25-700 leading-tight">
              <div className="sm:pb-[0.7rem]">
                <span>
                  정확한 운동량을 알려주는
                  <br />
                </span>

                <span>
                  나만의 피트니스 가이드,
                  <br />
                </span>
              </div>
              <span className="sm:text-2.25-700 sm:pb-[0.6rem]">
                핏큘레이터
              </span>
            </div>

            <p className="sm:px-[2rem] sm:text-left sm:text-0.875-700 text-1.75-500 text-gray-12 sm:pt-[0.6rem]">
              핏큘레이터와 함께&nbsp;
              <span className="sm:inline hidden">
                <br />
              </span>
              꾸준한 운동을 생활화 하세요.
            </p>
          </div>

          <Link href="#product-section" className="sm:hidden">
            <Button text="핏큘레이터 신청하기" size="md" variant="default" />
          </Link>

          <Link
            href="#product-section"
            className="hidden sm:inline sm:pl-[2rem]"
          >
            <Button
              text="핏큘레이터 신청하기"
              size="xs"
              variant="default"
              className="sm:py-[1.3rem] sm:w-[10rem] sm:px-[0.7rem]"
            />
          </Link>
        </div>
      </div>
      <div className="relative md:overflow-hidden sm:overflow-hidden md:h-auto sm:h-[28rem]">
        <Image
          src="/images/landing-running.png"
          alt="woman running"
          width={2600}
          height={600}
          className="sm:top-[10rem] sm:scale-200 md:scale-150 sm:transform sm:translate-x-[-6rem] sm:translate-y-[6rem] md:translate-x-[-6rem] md:translate-y-[4rem]"
          priority={true}
        />
        <div
          className="absolute inset-0 w-[55%]"
          style={{
            background:
              'linear-gradient(270deg, rgba(219, 226, 228, 0.00) 0%, rgba(219, 226, 228, 0.90) 16.32%)',
          }}
        />
        <div className="absolute inset-0 h-[40%] sm:h-[69%] bg-gradient-to-t from-white  via-white to-transparent top-[66%] sm:top-[50%] md:top-[60%]" />
      </div>
    </section>
  );
}

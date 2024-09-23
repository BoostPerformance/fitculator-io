import Section from './section';
import Button from '../button';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterSection() {
  return (
    <section className=" relative mb-10 sm:mb-0">
      <div className="absolute flex items-center justify-center w-full h-[30rem] mt-[10rem] md:h-auto md:mt-[5rem] md:ml-[8rem] sm:pt-[2rem] sm:m-1 z-10 md:items-start md:justify-start sm:items-start sm:justify-start">
        <div className="flex flex-col gap-[1rem]">
          <div>
            <div className="text-3-700 sm:text-left sm:px-[2rem] sm:pb-[0.6rem] sm:text-1.25-700">
              <span>
                정확한 운동량을 알려주는
                <br />
              </span>

              <span>
                나만의 피트니스 가이드,
                <br />
              </span>

              <span className="sm:text-2.25-700">핏큘레이터</span>
            </div>

            <p className="sm:px-[2rem] sm:text-left sm:text-0.875-700 text-1.75-500 text-gray-12">
              핏큘레이터와 함께
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
            <Button text="핏큘레이터 신청하기" size="xs" variant="default" />
          </Link>
        </div>
      </div>
      <div>
        <Image
          src="/images/landing-running.png"
          alt="woman running"
          width={2000}
          height={2000}
          priority={true}
        />
        <div className="absolute inset-0 h-[40%] bg-gradient-to-t from-white to-transparent top-[60%] sm:top-[61%] md:top-[60%]" />
      </div>
    </section>
  );
}

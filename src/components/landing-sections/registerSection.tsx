//import Section from './section';
import Button from '../button';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterSection() {
  return (
    <section className="relative w-full h-[38rem] sm:h-[28rem]">
      {/* 이미지 배경 */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/landing-running.webp"
          alt="woman running"
          fill
          priority
          sizes="100vw"
          className="object-cover sm:object-[70%_center]"
        />
        <div
          className="absolute inset-0 w-[55%]"
          style={{
            background:
              'linear-gradient(270deg, rgba(219, 226, 228, 0.00) 0%, rgba(219, 226, 228, 0.90) 16.32%)',
          }}
        />
        <div className="absolute inset-0 h-[40%] sm:h-[69%] bg-gradient-to-t from-white via-white to-transparent top-[66%] sm:top-[50%] md:top-[60%]" />
      </div>

      {/* 텍스트 오버레이 */}
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-[10rem] px-[2rem] z-10 sm:left-[12rem] sm:px-0 ">
        <div className="flex flex-col gap-[2.5rem] max-w-[600px]">
          <div>
            <h2 className="text-3-700 sm:text-1.25-700 leading-tight sm:pb-[0.7rem]">
              <span>
                무조건 운동하게 만드는
                <br />
              </span>
              <span>
                핏큘레이터
                <br />
              </span>
            </h2>
            <p className="text-1.75-500 sm:text-0.875-700 text-gray-12 sm:pt-[0.6rem]">
              자기관리의 시작.
              <br />
              나에게 필요한 운동량을 매주
              <br className="lg:hidden md:hidden sm:inline" />
              채워보세요.
            </p>
          </div>

          {/* 버튼 */}
          <Link href="#product-section" className="sm:hidden">
            <Button text="시작하기" size="md" variant="default" />
          </Link>
          <Link href="#product-section" className="hidden sm:inline">
            <Button
              text="시작하기"
              size="xs"
              variant="default"
              className="sm:py-[1.3rem] sm:w-[10rem] sm:px-[0.7rem]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

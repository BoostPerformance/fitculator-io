import Image from 'next/image';
import Section from './section';

export default function AppleWatchSection() {
  return (
    <section className="flex flex-col items-center py-[6.73rem] mb-[2rem] sm:mb-0 sm:py-[1rem] gap-[2rem] sm:px-[1.8rem] leading-tight">
      <Image
        className="sm:w-[3rem] w-[3.8rem]"
        src="/svg/smart-watch.svg"
        alt="smart-watch"
        width={10}
        height={10}
        priority
      />
      <Section
        title={
          <>
            운동량이 포인트로 계산되는 <br /> 똑똑한 운동량 계산기
          </>
        }
        description={
          <>
            핏큘레이터의 포인트 시스템은 세계보건기구
            <span className="hidden md:inline sm:inline">
              <br />
            </span>
            (WHO)의 신체활동 가이드라인에&nbsp;
            <span className="hidden sm:inline">
              <br />
            </span>
            근거해 만들어졌어요.
            <br />
            스마트워치를 가지고 있다면&nbsp;
            <span className="hidden sm:inline">
              <br />
            </span>
            누구나 사용할 수 있어요.
          </>
        }
        reverseY
        textCenter
        title2_5900
        description1_75700
        titleClassName="sm:text-1.25-700"
        descriptionClassName="sm:text-1-600 "
      />
    </section>
  );
}

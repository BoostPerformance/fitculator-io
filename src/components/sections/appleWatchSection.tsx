import Image from 'next/image';
import Section from './section';

export default function AppleWatchSection() {
  return (
    <section className="flex flex-col items-center py-[6.73rem] mb-[2rem] sm:mb-0 sm:mt-[2rem] sm:pb-0 gap-[2rem] sm:px-[1.8rem]">
      <Image
        className="sm:w-[3rem]"
        src="/svg/smart-watch.svg"
        alt="smart-watch"
        width={59}
        height={90}
      />
      <Section
        title={<>운동량이 포인트로 계산되는 똑똑한 운동량 계산기</>}
        description={
          <>
            핏큘레이터의 포인트 시스템은 세계보건기구(WHO)의 신체활동
            가이드라인에 근거해 만들어졌어요.
            <br /> 스마트워치를 가지고 있다면 누구나 사용할 수 있어요.
          </>
        }
        reverseY
        textCenter
        title2_5900
        description1_75700
      />
    </section>
  );
}

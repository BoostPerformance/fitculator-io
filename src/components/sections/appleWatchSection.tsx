import Image from 'next/image';
import Section from './section';

export default function AppleWatchSection() {
  return (
    <section className="flex flex-col items-center w-full h-auto py-[6.73rem] mb-[2rem] sm:mb-0 sm:mt-[2rem] sm:pb-0 gap-[2rem]">
      <Image
        className="sm:w-[3rem]"
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
        title2_5900
        description1_75700
      />
    </section>
  );
}

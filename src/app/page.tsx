import Image from 'next/image';
import Button from '@/components/button';
import Section from '@/components/section';
import Reviews from '@/components/reviews';

export default function Home() {
  return (
    <div className="flex flex-col items-center ">
      <section className="relative mb-10">
        <div className="absolute">
          <Section
            title={
              <>
                정확한 운동량을 알려주는 <br /> 나만의 피트니스 가이드, <br />
                핏큘레이터
              </>
            }
            description={<>핏큘레이터와 함께 꾸준한 운동을 생활화 하세요.</>}
          />

          <div className="">
            <Button version="ver2">핏큘레이터 신청하기</Button>
          </div>
        </div>
        <div className="w-full bg-gradient-to-t">
          <Image
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

      <section className="flex flex-col items-center w-full h-[30rem] mb-10">
        <Image
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

      <section className="bg-blue w-full">
        <div className="flex flex-col items-center">
          <Section
            title={
              <>
                운동기록을 올리면 <br />
                실시간으로
                <br />
                운동량이 계산돼요.
              </>
            }
            description={
              <>
                나의 운동이 부족한지, 과한지
                <br /> 한 눈에 확인하고, <br />
                피드백을 받을 수 있어요.
              </>
            }
            imageSrc="graph"
            imgeSize={100}
          />
          <Section
            title={<>운동량그래프, 피로도 분석</>}
            description={
              <>
                사소한 질문에도
                <br /> 구체적이고, 이해하기 쉽고, <br />
                친절하게 답변을 남겨요.
              </>
            }
            imageSrc="graph"
            reverseX
            imgeSize={100}
          />
          <Section
            title={
              <>
                운동관련 질문을
                <br /> 언제든지 할 수 있어요.
              </>
            }
            description={
              <>
                사소한 질문에도 <br /> 구체적이고, 이해하기 쉽고,
                <br /> 친절하게 답변을 남겨요.
              </>
            }
            imageSrc="graph"
            imgeSize={100}
          />

          <Section
            title={
              <>
                전문 코치님의 <br /> 피드백을 <br />
                받아보세요.
              </>
            }
            description={
              <>
                코치님이 직업 짜주는 프로그램도
                <br /> 받아볼 수 있어요.
              </>
            }
            imageSrc="graph"
            imgeSize={100}
            reverseX
          />
        </div>
      </section>

      <section>
        <Section
          title={
            <>
              외로운 운동은 그만. <br /> 즐거운 운동은 같이.
            </>
          }
          imageSrc="example"
          reverseY
          textCenter
          imgeSize={300}
        />
      </section>
      <section>
        <Reviews />
      </section>
      <section>Product</section>
      <section className="w-full h-[30rem] mb-1">
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
        />
      </section>
    </div>
  );
}

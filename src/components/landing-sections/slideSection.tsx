import Section from './section';

export default function SlideSection() {
  return (
    <div className=" bg-white w-full flex flex-col items-center py-[6.25rem] gap-[8.75rem] md:px-[1.8rem] sm:px-[1.8rem] sm:gap-[5.44rem] leading-tight">
      <Section
        title={
          <>
            <div>
              운동기록을 올리면&nbsp;
              <span>
                <br />
              </span>
              실시간으로
              <span className="sm:hidden inline">
                <br />
              </span>
              운동량이 계산돼요.
            </div>
          </>
        }
        description={
          <>
            나의 운동이 부족한지, 과한지
            <br /> 한 눈에 확인하고, <br />
            피드백을 받을 수 있어요.
          </>
        }
        imageSrc="/svg/slide-graph.svg"
        className="w-[20rem] sm:w-[10rem]"
        title2_5700
        description1_75500
        textCenter
        titleClassName="sm:text-1.25-700 text-left sm:text-center"
        descriptionClassName="text-left sm:text-center "
      />
      <Section
        title={
          <>
            운동량그래프와&nbsp;
            <span className="hidden sm:inline">
              <br />
            </span>
            피로도 분석
          </>
        }
        description={
          <>
            요일별, 주제별 그래프를 통해
            <br /> 나의 운동 패턴을 이해하고, <br />
            컨디션에 맞게 조절할 수 있어요.
          </>
        }
        imageSrc="/images/section-image1.png"
        className="w-[20rem]"
        reverseX
        textAlign
        title2_5700
        description1_75500
        textCenter
        titleClassName="sm:text-1.25-700"
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
        imageSrc="/svg/section-image2.svg"
        className="w-[20rem]"
        title2_5700
        description1_75500
        titleClassName="sm:text-1.25-700"
      />

      <Section
        title={
          <>
            <div>
              전문 코치님의
              <br />
              세심한 피드백을
              <span className="sm:hidden inline">
                <br />
              </span>
              받아보세요.
            </div>
          </>
        }
        description={
          <>
            코치님이 직업 짜주는&nbsp;
            <span className="hidden sm:inline">
              <br />
            </span>
            운동 프로그램도
            <br /> 받아볼 수 있어요.
          </>
        }
        imageSrc="/svg/section-image3.svg"
        className="w-[20rem]"
        reverseX
        textAlign
        pro
        title2_5700
        description1_75500
        titleClassName="sm:text-1.25-700"
      />
    </div>
  );
}

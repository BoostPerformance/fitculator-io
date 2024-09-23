import Section from './section';

export default function SlideSection() {
  return (
    <div className=" bg-white w-full flex flex-col items-center py-[6.25rem] gap-[8.75rem] sm:px-[1.8rem]">
      <Section
        title={
          <>
            <div>
              운동기록을 올리면&nbsp;
              <span className="sm:hidden inline">
                <br />
              </span>
              실시간으로
              <br />
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
        imageSrc="/images/graph.png"
        className="w-[20rem]"
        title2_5700
        description1_75500
        textCenter
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
        imageSrc="/svg/section-image1.svg"
        className="w-[20rem]"
        reverseX
        textAlign
        title2_5700
        description1_75500
        textCenter
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
      />

      <Section
        title={
          <>
            <div>
              전문 코치님의
              <span className="hidden sm:inline">
                <br />
              </span>
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
            코치님이 직업 짜주는 <br />
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
      />
    </div>
  );
}

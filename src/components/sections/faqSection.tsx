import Accordion from '../accordion';
import Section from './section';

const faqItems = [
  {
    title: '질문이 있습니다!',
    content: '네 질문주세요- 답변입니다',
  },
  {
    title: '스마트 워치가 꼭 필요한가요?',
    content: '네, 핏큘레이터는 스마트워치를 기반으로 ------',
  },
  {
    title: 'I have some question on..!',
    content: 'To create an account, you need to...',
  },
];

export default function FaqSection() {
  return (
    <section className="flex flex-col items-center w-full py-[10rem] h-auto sm:py-[5rem] gap-[3rem]">
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
        reverseY
        title2_5900
        description1_75700
      />
      <Accordion items={faqItems} />
    </section>
  );
}

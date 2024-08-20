import React, { ReactNode } from 'react';

interface FAQItem {
  id: number;
  title: string;
  content: ReactNode;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    title: '스마트 워치 브랜드는 상관없나요?',
    content: (
      <>
        네! 심박 측정이 가능한 워치라면 브랜드 상관없이 모두 핏큘레이터를 사용할
        수 있어요.
        <br />
        (애플워치, 갤럭시워치, 미밴드, 핏빗, 가민, 순토 등)
        <br />꼭 워치가 아니어도 좋아요. 폴라나 F45의 라이언하트와 같은
        심박측정장비를 가지고 계신 분들도 핏큘레이터를 사용할 수 있어요.
      </>
    ),
  },
  {
    id: 2,
    title: 'PRO 의 페이백 기준이 정확히 어떻게 되나요?',
    content: (
      <>
        한 달 동안 매주 WHO에서 권장하는 신체활동 권장량을 채우면 참가비
        전액(카드결제의 경우 수수료 제외한 금액)을 돌려드려요.
        <br />
        매주 “유산소 100 pt 이상 & 30분 이상의 근력운동 2회” 채우고, 참가비
        전액을 돌려받아보세요!
      </>
    ),
  },
  {
    id: 3,
    title: '운동이 처음인데 LITE 를 사용해도 될까요?',
    content: (
      <>
        운동이 처음이라면, PRO 를 추천해요.
        <br />한 달 정도 PRO 를 사용하면서 코치님과 함께 나에게 맞는 운동 습관을
        만들고, LITE 로 넘어가보세요!
      </>
    ),
  },
  {
    id: 4,
    title: '단체 할인 혜택이 있나요?',
    content: (
      <>
        <div className="whitespace-nowrap">
          네! 5인 이상 단체 등록의 경우,&nbsp;
          <a className="text-blue-1" href="mailto:contact@fitculator.io">
            contact@fitculator.io
          </a>
          &nbsp;로 메일 보내주시면, 단체 등록 절차를 안내해드려요.
        </div>
      </>
    ),
  },
];

export default faqItems;

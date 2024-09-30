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
        네. 심박 측정이 가능한 워치라면 브랜드 상관없이 모두 핏큘레이터를 사용할
        수 있어요.
        <br />
        (애플워치, 갤럭시워치, 미밴드, 핏빗, 가민, 순토 등)
        <br />꼭 워치가 아니어도 좋아요. <br className="hidden md:inline" />
        폴라나 F45의 라이언하트와 같은 심박측정장비를 가지고 계신 분들도
        핏큘레이터를 사용할 수 있어요.
      </>
    ),
  },
  {
    id: 2,
    title: '운동이 처음이라면 어떤 플랜이 좋을까요?',
    content: (
      <>
        운동이 처음이라면, PRO를 추천해요. <br />한 달 정도 PRO 를 사용하면서
        코치님과 함께 나에게 맞는 운동 습관을 만들어보세요!
      </>
    ),
  },
  {
    id: 3,
    title: 'Health는 의료 서비스 인가요?',
    content: (
      <>
        아닙니다.
        <br />
        Fitculator Health는 이상지질혈증 의심단계인 분들에게 꼭 필요한 식습관
        개선과 <br className="sm:hidden md:inline" /> 올바른 운동 습관 만들기를
        위한 서비스입니다.
      </>
    ),
  },
  {
    id: 4,
    title: '단체 할인 혜택이 있나요?',
    content: (
      <>
        <div className="whitespace-nowrap">
          네. 5인 이상 단체 등록의 경우,&nbsp;
          <br className="hidden sm:block" />
          <a className="text-blue-1" href="mailto:contact@fitculator.io">
            contact@fitculator.io
          </a>
          &nbsp;로 메일 보내주시면, <br className="hidden sm:block" />
          단체 등록 절차를 안내해드려요.
        </div>
      </>
    ),
  },
];

export default faqItems;

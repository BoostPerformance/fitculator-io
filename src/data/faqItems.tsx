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
    title: '어떤 서비스를 선택해야 할지 모르겠어요.',
    content: (
      <>
        운동을 처음 시작하시거나 전반적인 건강 관리가 목적이시라면 PLUS를 추천드립니다.<br />
        특정한 운동 목표가 있으시거나(근력 향상, Hyrox 대회 준비 등), 체계적인 1:1 코칭이 필요하신 분들께는 PRO 서비스가 적합합니다.<br />
        언제든 PLUS에서 PRO로 업그레이드가 가능하니, 편하신 단계에서 시작하셔도 좋습니다.
      </>
    ),
  },
  {
    id: 3,
    title: 'PLUS와 PRO의 차이점이 무엇인가요?',
    content: (
      <>
        PLUS와 PRO의 가장 큰 차이점은 개인 맞춤형 운동 프로그램 제공 여부입니다.<br />
        PLUS는 운동량 분석, 피로도 관리, 피트니스 챗봇, 커뮤니티 활동, 그리고 코치의 주간 피드백을 제공하는 기본 서비스입니다.<br />
        PRO는 PLUS의 모든 기능에 더해 전담 코치가 배정되어 회원님의 목표와 상태에 맞는 맞춤형 운동 프로그램을 설계하고, 지속적인 피드백을 제공합니다. 특히 근력 운동이나 Hyrox 훈련과 같은 전문적인 프로그램이 필요한 분들께 추천드립니다.
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

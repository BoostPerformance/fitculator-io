import React, { ReactNode } from 'react';

interface ReviewItem {
  id: number;
  title: string | ReactNode;
  content: ReactNode;
  author: string;
}
type ReviewItems = ReviewItem[];

const reviewItems: ReviewItems = [
  {
    id: 1,
    title: '좋은 에너지가 채워지는 느낌이었어요!',
    content:
      '평소라면 그냥 버스타고 편하게 갈 거리를 한-두정거장 전에 내려서 걷기도 하고, 오늘은 뛰어볼까? 해서 가볍게 뛰어보기도 하는. 그 덕분에 일상에서도 좋은 에너지가 채워지는 느낌이었어요 !',
    author: '익명의 후기 (만족도 설문 응답 결과)',
  },
  {
    id: 2,
    title: (
      <>
        만약 핏큘레이터를 안했다면 <br /> 운동을 하나도 안했겠다
      </>
    ),
    content:
      '최소한 움직여야 한다는 생각은 있는데, 핏큘레이터가 없을 땐 그냥 잘 안하게 되었어요. 그런데 이 서비스를 사용하면 의지가 생기고 동기부여가 되는게 확실히 있어요. 그래서 가능하면 안끊고 계속 사용하려고해요. 만약 핏큘레이터를 안했다면 운동을 하나도 안했겠다 라는 생각이 들어요.',
    author: '엄지혜님 / 여성 / 30대 / 2~8기 총 7회 참여중',
  },
  {
    id: 3,
    title: (
      <>
        운동 할당량만 채웠을 분인데 <br /> 몸무게 감량이 돼서 놀랐습니다.
      </>
    ),
    content:
      '오랫동안 그룹운동, pt에만 의지했었고 혼자 운동을 시작하려니까 쉽지 않더라고요. 그러다 핏큘레이터의 도움을 받게 되었습니다. 제가 운동하는 량에 따라 그래프가 채워졌고 이게 은근 채우는 재미가 있었어요! 남들과 비교하지 않고 오로지 제 할당량만 채우면 돼서 부담이 없어서 너무 좋았습니다. 처음엔 데이터가 정확한 게 맞는지 조금 의심하고 있었어요. 하지만 평소와 생활패턴은 똑같았고 운동 할당량만 채웠을 뿐인데 몸무게 감량이 돼서 놀랐습니다.',
    author: '익명의 후기 (만족도 설문 응답 결과)',
  },
  {
    id: 4,
    title: '자극이 되는게 확실히 있어요.',
    content:
      '제가 혼자 운동을 하니까 잘하고 있는건가, 너무 많이하나, 아니면 너무 적게하나 이런게 좀 있는데 그런걸 체크해주니까 좋아요. 그리고, 다른 분들의 기록을 가끔씩 보는데 되게 다들 너무 열심히 하시고 그래서 자극이 되는게 확실히 있어요.',
    author: '신**님 / 여성 / 20대 / 6~8기 총 3회 참여중',
  },
  {
    id: 5,
    title: (
      <>
        질문 봇 기능이 생각보다 좋아요. <br /> 코치님들이 한 번 더 봐주시니까
        믿을만한 정보
      </>
    ),
    content:
      '질문 봇 기능이 생각보다 좋아요. 인터넷 찾아보면 너무 정보가 많아서 뭘 믿어야할지 모르는데 이건 답변도 되게 자세하게 나오고, 코치님들이 한 번 더 봐주시니까 믿을만한 정보를 얻을 수 있어서 좋아요.',
    author: '서**님 / 여성 / 20대 / 1~8기 총 7회 참여중',
  },
  {
    id: 6,
    title: (
      <>
        활동량을 보면서 채우고자 하는 욕심이 <br /> 운동의 동기부여가 되더라구요
      </>
    ),
    content:
      '핏큘레이터 덕분에 운동습관을 다시 잡아볼 수 있었어요! 특히, 혼자였다면 금방 포기했을텐데 내가 채워야하는 활동량을 보면서 채우고자 하는 욕심이 운동의 동기부여가 되더라구요 :)',
    author: '익명의 후기 (만족도 설문 응답 결과)',
  },
  {
    id: 7,
    title: (
      <>
        운동 루틴을 만들어 갈 수 있어서 <br />큰 도움이 됐습니다.
      </>
    ),
    content:
      '프로그램을 참가하면서 저에게 필요한 운동량을 알게 됐고, 한 주간에 운동량을 채우기 위한 나름대로의 운동 루틴을 만들어 갈 수 있어서 큰 도움이 됐습니다. 물론 더 효과적으로 운동할 수 해 주신 코치님들의 조언도 큰 도움이 됐습니다.',
    author: '익명의 후기 (만족도 설문 응답 결과)',
  },
  {
    id: 8,
    title: (
      <>
        Fitculator 프로젝트를 통해 적절한 운동량을&nbsp;
        <span className="sm:hidden">
          <br />
        </span>
        확인할
        <span className="hidden sm:inline">
          <br />
        </span>
        수 있어서 좋았습니다
      </>
    ),
    content:
      '평소 혼자 운동하면서 어느 정도 운동을 해야 적절한 양인지 알기 힘들었는데, Fitculator 프로젝트를 통해 적절한 운동량을 확인할 수 있어서 좋았습니다!',
    author: '익명의 후기 (만족도 설문 응답 결과)',
  },
  {
    id: 9,
    title: (
      <>
        개인 맞춤형으로 웨이트 루틴을 짜주는게 <br />
        개인적으로 너무 만족스러웠습니다
      </>
    ),
    content:
      '개인 맞춤형으로 웨이트 루틴을 짜주는게 개인적으로 너무 만족스러웠습니다!!! 헬스장만 가면 사실 웨이트 머신 서성거리다가 결국 유산소만 하고 오는 경우가 많은데, 덕분에 헬스도 즐기며 하는 계기가 되었습니다😉',
    author: '익명의 후기 (만족도 설문 응답 결과)',
  },

  {
    id: 10,
    title: (
      <>
        맨날 홈트해야지 생각만 했었는데, <br />
        핏큘레이터 덕분에 처음 해봤어요!
      </>
    ),
    content:
      '맨날 홈트해야지 생각만 했는데, 핏큘레이터 덕분에 처음 해봤어요! 완전 초보지만, 남은 기간도 꾸준히 해보겠습니당ㅎㅎ',
    author: '유**님/ 여성 / 20대',
  },
];

export default reviewItems;
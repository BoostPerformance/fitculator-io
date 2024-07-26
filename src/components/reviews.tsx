import ReviewItems from './reviewItems';

export default function Reviews() {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-2.5-900">재등록률 높은 핏큘레이터 프로젝트</p>
        <p className="text-2-700">실제 참가자들의 다양한 후기</p>
      </div>
      <div>
        <ReviewItems />
      </div>
    </>
  );
}
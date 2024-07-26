import reviewItems from '@/reviews/reviewItems';

export default function Reviews() {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-2.5-900">재등록률 높은 핏큘레이터 프로젝트</p>
        <p className="text-2-700">실제 참가자들의 다양한 후기</p>
      </div>
      <div dir="ltr">
        <div className="scroll-ps-6 snap-x flex flex-row gap-3">
          {reviewItems.map((it) => (
            <div key={it.id} className="border-gray-1 border-solid border-2">
              <h1>{it.title}</h1>
              <h2>{it.content}</h2>
              <p>{it.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

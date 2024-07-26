import reviewItems from '@/reviews/reviewItems';
import Image from 'next/image';

export default function Reviews() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-[3rem]">
      <div className="flex flex-col items-center">
        <p className="text-2.5-900">재등록률 높은 핏큘레이터 프로젝트</p>
        <p className="text-2-700">실제 참가자들의 다양한 후기</p>
      </div>
      <div className=" py-4 overflow-x-auto w-1/2 md:w-1/4">
        <div className="grid grid-rows-2 grid-cols-6 grid-flow-row gap-4 w-max">
          {reviewItems.map((it) => (
            <div
              key={it.id}
              className="flex flex-col justify-between p-10 w-[37rem] md:w-[27rem] h-[20rem] rounded-[0.6rem] border-gray-3 border-solid border-[0.1rem]"
            >
              <Image
                src="/svg/quotation-mark.svg"
                width={35}
                height={20}
                alt="quotation-mark"
              />
              <div>
                <h1 className="text-1.75-700 w-2/3">{it.title}</h1>
                <h2 className="text-1.25-500">{it.content}</h2>
              </div>
              <p className="text-gray-4 text-end">{it.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

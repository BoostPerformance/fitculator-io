import Image from 'next/image';
import ReviewItems from './reviewItems';

export default function Reviews() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-[3rem] sm:gap-[1rem] py-[11rem]">
      <div className="flex flex-col items-center">
        <p className="text-2.5-900">재등록률 높은 핏큘레이터 프로젝트</p>
        <p className="text-2-700">실제 참가자들의 다양한 후기</p>
      </div>
      <div className="py-4 overflow-x-auto w-full md:w-1/4 sm:w-3/4 sm:h-auto ">
        <ReviewItems />
      </div>
    </div>
  );
}

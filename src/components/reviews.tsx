import Image from 'next/image';
import ReviewItems from './reviewItems';

export default function Reviews() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-[3rem] sm:gap-[1rem] py-[11rem] sm:py-[5rem]">
      <div className="flex flex-col items-center">
        <p className="text-2-700 sm:text-1.5-700">
          재등록률 높은 핏큘레이터 프로젝트
        </p>
        <p className="text-2.5-900 sm:text-2-900">
          실제 참가자들의 다양한 후기
        </p>
      </div>
      <div className="py-4 overflow-x-hidden w-full md:w-[50rem] sm:w-3/4 sm:h-auto scrollbar-hide relative ">
        <ReviewItems />
      </div>
    </div>
  );
}

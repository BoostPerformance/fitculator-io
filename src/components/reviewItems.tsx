import reviewItems from '@/reviews/reviewItems';
import Image from 'next/image';

export default function ReviewItems() {
  return (
    <div className="grid grid-rows-2 grid-cols-5 grid-flow-row gap-4 w-max sm:grid-cols-3 sm:grid-flow-col ">
      {reviewItems.map((it) => (
        <div
          key={it.id}
          className="flex flex-col justify-start gap-6 p-10 w-[37rem] h-[25rem] md:w-[27rem] rounded-[0.6rem] border-gray-3 border-solid border-[0.1rem] sm:h-[20rem] sm:w-[18rem] sm:p-8 "
        >
          <Image
            className="md:sizs-[1rem] sm:size-[1rem]"
            src="/svg/quotation-mark.svg"
            width={35}
            height={20}
            alt="quotation-mark"
          />
          <div className='flex flex-col gap-6'>
          <div className="sm:flex sm:flex-col sm:gap-3">
            <h1 className="text-1.5-900 w-[30rem] md:w-[20rem] md:text-1.5-700 sm:text-1.125-700 sm:w-[14rem]">
              {it.title}
            </h1>
            <h2 className="text-1.125-500 md:text-1-700 sm:text-0.7-700">
              {it.content}
            </h2>
          </div>
          <p className="text-gray-4 text-end md:text-1-700 sm:text-0.7-700">
            {it.author}
          </p>
          </div>
        </div>
      ))}
    </div>
  );
}

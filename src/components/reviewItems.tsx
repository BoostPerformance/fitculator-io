import reviewItems from '@/data/reviewItems';
import Image from 'next/image';

export default function ReviewItems() {
  return (
    <div className=" w-max grid gap-4 sm:grid-cols-3 sm:grid-flow-col sm:grid-rows-2 sm:gap-[0.94rem]">
      <div className="grid grid-rows-1 grid-cols-10 gap-5 animate-marquee">
        {reviewItems.map((it) => (
          <div
            key={it.id}
            className={`flex flex-col gap-6 justify-between p-10 w-[37rem] h-[25rem] md:w-[27rem] rounded-[0.6rem] border-gray-3 border-solid border-[0.1rem] sm:h-[15.3rem] sm:w-[20.375rem] sm:gap-[0.75rem] animate-marquee sm:pl-[1.19rem] sm:pt-[1.94rem]`}
          >
            <Image
              className="sm:w-[1.6rem] sm:mt-0"
              src="/svg/quotation-mark.svg"
              width={35}
              height={20}
              alt="quotation-mark"
            />
            <div className="flex flex-col justify-between h-full sm:gap-2 sm:w-full">
              <div className="flex flex-col gap-[1rem] ">
                <h1 className="text-1.5-900 w-auto md:w-[20rem] md:text-1.5-700 sm:text-0.875-700 ">
                  {it.title}
                </h1>
                <h2 className="text-1.125-500 md:text-1-700 sm:text-0.625-500 sm:w-[18rem]">
                  {it.content}
                </h2>
              </div>
              <p className="text-gray-4 text-end md:text-1-700 sm:text-0.75-500 sm:mt-auto">
                {it.author}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-rows-1 grid-cols-10 gap-5 animate-marquee2">
        {reviewItems.map((it) => (
          <div
            key={it.id}
            className={`flex flex-col gap-6 justify-between p-10 w-[37rem] h-[25rem] md:w-[27rem] rounded-[0.6rem] border-gray-3 border-solid border-[0.1rem] sm:h-[15.3rem] sm:w-[20.375rem] sm:gap-[0.75rem] animate-marquee2 sm:pl-[1.19rem] sm:pt-[1.94rem]`}
          >
            <Image
              className="sm:w-[1.6rem] sm:mt-0"
              src="/svg/quotation-mark.svg"
              width={35}
              height={20}
              alt="quotation-mark"
            />
            <div className="flex flex-col justify-between h-full sm:gap-2 sm:w-full">
              <div className="flex flex-col gap-[1rem]">
                <h1 className="text-1.5-900 w-auto md:w-[20rem] md:text-1.5-700 sm:text-0.875-700 ">
                  {it.title}
                </h1>
                <h2 className="text-1.125-500 md:text-1-700 sm:text-0.625-500 sm:w-[18rem]">
                  {it.content}
                </h2>
              </div>
              <p className="text-gray-4 text-end md:text-1-700 sm:text-0.75-500 sm:mt-auto">
                {it.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

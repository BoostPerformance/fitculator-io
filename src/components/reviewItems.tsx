import reviewItems from '@/reviews/reviewItems';
import Image from 'next/image';

export default function ReviewItems() {
  return (
    <div className="grid grid-rows-2 grid-cols-6 grid-flow-row gap-4 w-max">
      {reviewItems.map((it) => (
        <div
          key={it.id}
          className="flex flex-col justify-between p-10 w-[37rem] h-[25rem] md:w-[27rem] rounded-[0.6rem] border-gray-3 border-solid border-[0.1rem]"
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
  );
}

'use client';

interface ToggleProps {
  handleToggleProduct: (period: string) => void;
  selectedPeriod: string;
}

export default function Toggle({
  handleToggleProduct,
  selectedPeriod,
}: ToggleProps) {
  return (
    <div className="w-[14.5rem] h-[3.1rem] justify-around items-center border-[0.2rem] flex border-gray-3 rounded-[2.6rem] bg-white">
      <button
        onClick={() => handleToggleProduct('1개월')}
        className={`${
          selectedPeriod === '1개월' ? 'bg-blue-1 text-white' : 'text-gray-1'
        } text-1.25-700 rounded-[2.6rem] py-[0.3rem] px-8`}
      >
        1개월
      </button>
      <button
        onClick={() => handleToggleProduct('3개월')}
        className={`${
          selectedPeriod === '3개월' ? 'bg-blue-1 text-white' : 'text-gray-1'
        } text-1.25-500 rounded-[2.6rem] py-[0.3rem] px-7`}
      >
        3개월
      </button>
    </div>
  );
}

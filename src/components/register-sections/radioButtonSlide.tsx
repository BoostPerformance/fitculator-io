import { useState } from 'react';

interface RadioButtonSlideProps {
  onChange?: (id: number) => void;
}

const RadioButtonSlide = ({ onChange }: RadioButtonSlideProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const debtAmounts = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
  ];

  const handleChange = (id: number) => {
    setSelectedAmount(id);
    onChange!(id);
  };

  return (
    <div className=" w-auto mb-[4rem]">
      <div className="relative flex w-[42.9rem]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[38rem] h-[0.2rem] bg-blue-500"></div>
        </div>
        {debtAmounts.map((amount) => (
          <div key={amount.id} className="relative flex-1">
            <input
              type="radio"
              id={`amount-${amount.id}`}
              value={amount.id}
              required
              className="hidden"
              onChange={() => handleChange(amount.id)}
            />
            <label
              htmlFor={`amount-${amount.id}`}
              className="flex items-center justify-center cursor-pointer w-full h-full"
            >
              <div
                className={`absolute top-[0.1rem] -translate-y-[1rem] w-[2rem] h-[2rem] border-[0.2rem] border-blue-500 rounded-full bg-white z-10 transition-transform duration-150 ${
                  selectedAmount === amount.id
                    ? 'scale-125 border-blue-500'
                    : ''
                }`}
              >
                {selectedAmount === amount.id && (
                  <img
                    src="/svg/checkbox-blue.svg"
                    alt="Checked"
                    className="w-6 h-6 absolute inset-0 m-auto"
                  />
                )}
              </div>
            </label>
          </div>
        ))}
        <div className="absolute top-full my-[2rem] left-[2.8rem] text-gray-7 text-1-700">
          <h1>1</h1>
          <p>많은 노력이 필요해요!</p>
        </div>
        <div className="absolute top-full my-[2rem] right-[2.9rem] text-end text-gray-7 text-1-700">
          <h1>7</h1>
          <p>매우 수월해요!</p>
        </div>
      </div>
    </div>
  );
};

export default RadioButtonSlide;

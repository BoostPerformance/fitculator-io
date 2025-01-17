import { useState } from 'react';

type MultiSelect = {
  onChange: (item: string[]) => void;
  data: string[];
};

const MultiSelectionButtons = ({ onChange, data }: MultiSelect) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (data: string) => {
    const updatedGoals = selectedGoals.includes(data)
      ? selectedGoals.filter((item) => item !== data) // 이미 선택된 목표 제거
      : [...selectedGoals, data]; // 새 목표 추가

    onChange(updatedGoals); // 변경된 배열을 부모 컴포넌트로 전달
    setSelectedGoals(updatedGoals);
  };

  return (
    <div className=" w-[42.9rem] h-[5.9rem] sm:flex sm:flex-wrap sm:w-[20rem]">
      {data.map((item) => (
        <button
          key={item}
          onClick={() => toggleGoal(item)}
          type="button"
          className={`mt-[1.06rem] mr-[1.06rem] px-[1.25rem] py-[0.62rem] rounded-[0.375rem] border-[0.1rem]  sm:w-auto sm:text-center sm:flex-2 sm:text-0.875-500  ${
            selectedGoals.includes(item)
              ? 'bg-blue-500 text-white'
              : 'border-gray-7 text-gray-7'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default MultiSelectionButtons;

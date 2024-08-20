import { useState } from 'react';

const goals = [
  '재미/흥미',
  '운동 수행 능력 향상',
  '다이어트 (체지방감소)',
  '건강 및 질병 예방',
  '근력/근육량 향상',
  '운동 습관 형성',
];

const MultiSelectionButtons = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((item) => item !== goal)
        : [...prev, goal]
    );
  };

  return (
    <div className=" w-[42.9rem] h-[5.9rem] ">
      {goals.map((goal) => (
        <button
          key={goal}
          onClick={() => {
            toggleGoal(goal);
            console.log(selectedGoals);
          }}
          className={`mt-[1.06rem] mr-[1.06rem] px-[1.25rem] py-[0.62rem] rounded-[0.375rem] border-[0.1rem] ${
            selectedGoals.includes(goal)
              ? 'bg-blue-500 text-white'
              : 'border-gray-7 text-gray-7'
          }`}
        >
          {goal}
        </button>
      ))}
    </div>
  );
};

export default MultiSelectionButtons;

import MultiSelectionButtons from '../multiselectionButtons';
import exerciseGoal from '@/data/exerciseGoal';
interface ExerciseGoalProps {
  onChange: (item: string[]) => void;
}

const ExerciseGoal: React.FC<ExerciseGoalProps> = ({ onChange }) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-[0.5rem] items-end sm:flex-col sm:items-start">
        <h1 className="text-1.25-700 text-gray-1 sm:text-1-700">운동 목표</h1>
        <p className="text-1-500 text-gray-7 sm:text-0.75-500">
          운동 목표를 선택해주세요. (복수 선택 가능)
        </p>
      </div>
      <MultiSelectionButtons onChange={onChange} data={exerciseGoal} />
    </div>
  );
};

export default ExerciseGoal;

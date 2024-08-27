import RegisterItemTitle from './registerItemTitle';
import Input from '../input';
import { ExercisePreferenceProps } from '@/types/types';
import { useState } from 'react';

export default function ExerciseConcern({
  formData,
  setFormData,
}: ExercisePreferenceProps) {
  const [error, setError] = useState({ text: '' });
  const textValidation = (text: string) => {
    if (text.length < 3) {
      return '* 최소 세글자 이상이어야 합니다.';
    }
    return '';
  };

  const handleConcernChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      exercise_concern: value,
    }));
  };
  const handleBlurChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    let error = '';
    if (type === 'text') {
      error = textValidation(value);
    }

    setError((prevError) => ({
      ...prevError,
      [name]: error,
    }));
  };

  return (
    <div className="flex gap-[5.19rem] w-[56.5625rem] mb-[5rem]">
      <RegisterItemTitle title="운동고민" required={false} />

      <div className="w-auto flex flex-col gap-[0.75rem]">
        <h1 className="text-1.25-700 text-gray-1">바라는 점/운동 고민</h1>
        <p className="text-1-500 text-gray-7">
          평소 갖고 있었던 운동 관련 고민, 또는 저희 FITCULATOR 팀에게 하고 싶은
          말이 있다면 작성해주세요. <br />이 내용을 최대한 반영하여 더 좋은
          서비스를 제공해드릴게요.
        </p>
        <Input
          name="text"
          placeholder="자유롭게 작성해주세요."
          width="42.75rem"
          value={formData.exercise_concern || ''}
          onChange={handleConcernChange}
          onBlur={handleBlurChange}
          type="text"
        />
        {error.text && (
          <span className="text-red-500 text-sm">{error.text}</span>
        )}
      </div>
    </div>
  );
}

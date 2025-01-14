// components/userInformation/userGender.tsx
import { UserInfoFormData } from '@/types/types';

interface UserGenderProps {
  value: UserInfoFormData['user'];
  onGenderSelect: (
    gender: 'male' | 'female' | 'other' | 'undisclosed' | null
  ) => void;
}

export default function UserGender({ value, onGenderSelect }: UserGenderProps) {
  const genderOptions = [
    { ko: '남성', en: 'male' },
    { ko: '여성', en: 'female' },
    { ko: '기타', en: 'other' },
    { ko: '비공개', en: 'undisclosed' },
  ] as const;

  return (
    <div className="flex flex-col gap-[0.75rem]">
      <h1 className="text-1.25-700 text-gray-6 sm:text-1-700">성별</h1>
      <div className="flex gap-[1.06rem] sm:gap-[0.7rem] sm:text-0.75-500">
        {genderOptions.map(({ ko, en }) => (
          <button
            key={ko}
            onClick={() => onGenderSelect(en)}
            type="button"
            className={`px-[1.25rem] py-[0.625rem] rounded-[0.375rem] border-[0.1rem] ${
              value.gender === en
                ? 'border-blue-1 text-blue-1'
                : 'border-gray-7 text-gray-7'
            }`}
          >
            {ko}
          </button>
        ))}
      </div>
    </div>
  );
}

// components/userInformation/userGender.tsx
import { UserInfoFormData } from '@/types/types';

interface UserGenderProps {
  value: UserInfoFormData['user'];
  onGenderSelect: (gender: '남성' | '여성' | '기타' | '비공개' | null) => void;
}

export default function UserGender({ value, onGenderSelect }: UserGenderProps) {
  const genderOptions = ['남성', '여성', '기타', '비공개'] as const;

  return (
    <div className="flex flex-col gap-[0.75rem]">
      <h1 className="text-1.25-700 text-gray-6 sm:text-1-700">성별</h1>
      <div className="flex gap-[1.06rem] sm:gap-[0.7rem] sm:text-0.75-500">
        {genderOptions.map((gender) => (
          <button
            key={gender}
            onClick={() => onGenderSelect(gender)}
            type="button"
            className={`px-[1.25rem] py-[0.625rem] rounded-[0.375rem] border-[0.1rem] ${
              value.gender === gender
                ? 'border-blue-1 text-blue-1'
                : 'border-gray-7 text-gray-7'
            }`}
          >
            {gender}
          </button>
        ))}
      </div>
    </div>
  );
}

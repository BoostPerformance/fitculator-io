// components/userInformation/userName.tsx
import { UserInfoFormData, FormErrors } from '@/types/types';
import Input from '@/components/input';

interface UserNameProps {
  value: UserInfoFormData['user'];
  errors: Pick<FormErrors, 'name'>;
  onInputChange: (name: string, value: string) => void;
  onBlur: (name: string, value: string) => void;
}

export default function UserName({
  value,
  errors,
  onInputChange,
  onBlur,
}: UserNameProps) {
  return (
    <div className="flex flex-col gap-[0.3rem] sm:gap-[0.1rem]">
      <div className="flex gap-[0.5rem] items-end sm:items-center">
        <div className="text-1.25-700 text-gray-1 sm:text-1-700">이름</div>
        <p className="text-1-500 text-gray-7 sm:text-0.75-500">
          본명을 적어주세요.
        </p>
      </div>
      <Input
        name="name"
        placeholder="홍길동"
        width="21.25rem"
        value={value.name || ''}
        onChange={(e) => onInputChange('name', e.target.value)}
        onBlur={(e) => onBlur('name', e.target.value)}
        type="text"
      />
      {errors.name && <span className="text-red text-sm">{errors.name}</span>}
    </div>
  );
}

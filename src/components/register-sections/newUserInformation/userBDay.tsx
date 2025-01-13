// components/userInformation/userBDay.tsx
import { UserInfoFormData, FormErrors } from '@/types/types';
import Input from '@/components/input';

interface UserBDayProps {
  value: UserInfoFormData['user'];
  errors: Pick<FormErrors, 'birthday'>;
  onInputChange: any;
  onBlur: any;
}

export default function UserBDay({
  value,
  errors,
  onInputChange,
  onBlur,
}: UserBDayProps) {
  return (
    <div className="flex flex-col gap-[0.3rem] sm:gap-[0.1rem]">
      <div className="flex gap-[0.5rem] items-end sm:items-center">
        <div className="text-1.25-700 text-gray-1 sm:text-1-700">나이</div>
        <p className="text-1-500 text-gray-7 sm:text-0.75-500">
          생년월일을 적어주세요. (YYYY-MM-DD)
        </p>
      </div>
      <Input
        name="birthday"
        placeholder="YYYY-MM-DD"
        width="21.25rem"
        value={value.birthday || ''}
        onChange={(e) => onInputChange('birthday', e.target.value)}
        onBlur={(e) => onBlur('birthday', e.target.value)}
        type="text"
      />
      {errors.birthday && (
        <span className="text-red text-sm">{errors.birthday}</span>
      )}
    </div>
  );
}

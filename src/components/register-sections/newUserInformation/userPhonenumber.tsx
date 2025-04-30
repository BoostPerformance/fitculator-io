import Input from '../../input';
import { UserInfoFormData, FormErrors } from '@/types/types';

interface UserNameProps {
  value: UserInfoFormData['users'];
  errors: Pick<FormErrors, 'phone_number'>;
  onInputChange: (name: string, value: string) => void;
  onBlur: (name: string, value: string) => void;
}

export default function UserPhonenumber({
  value,
  errors,
  onInputChange,
  onBlur,
}: UserNameProps) {
  return (
    <div className="flex flex-col sm:gap-[0.75rem]">
      <div className="flex gap-[0.5rem] items-end sm:items-center">
        <h1 className="text-1.25-700 text-gray-6 sm:text-1-700">연락처</h1>
        <p className="text-1-500 text-gray-7 sm:text-0.75-500">
          번호만 입력해 주세요.
        </p>
      </div>
      <Input
        name="phone_number"
        placeholder="01012345678"
        width="w-[21.25rem]"
        value={value.phone_number || ''}
        onChange={(e) => onInputChange('phone_number', e.target.value)}
        onBlur={(e) => onBlur('phone_number', e.target.value)}
        type="tel"
      />
      {errors.phone_number && (
        <span className="text-red text-sm">{errors.phone_number}</span>
      )}
    </div>
  );
}

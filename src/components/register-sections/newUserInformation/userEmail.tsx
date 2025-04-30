import Input from '../../input';
import { useState } from 'react';
import { UserInfoFormData, FormErrors } from '@/types/types';

interface UserNameProps {
  value: UserInfoFormData['users'];
  errors: Pick<FormErrors, 'email'>;
  onInputChange: (name: string, value: string) => void;
  onBlur: (name: string, value: string) => void;
}

export default function UserEmail({
  value,
  errors,
  onInputChange,
  onBlur,
}: UserNameProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-[0.5rem] items-end sm:items-center">
        <h1 className="text-1.25-700 text-gray-6 sm:text-1-700">이메일 주소</h1>
        <p className="text-1-500 text-gray-7 sm:text-0.75-500">
          테스터 초대를 위해 App Store 또는 Google Play 계정을 입력해 주세요.
        </p>
      </div>
      <Input
        name="email"
        placeholder="fit@gmail.com"
        width="w-[21.25rem]"
        value={value.email || ''}
        onChange={(e) => onInputChange('email', e.target.value)}
        onBlur={(e) => onBlur('email', e.target.value)}
        type="email"
      />
      {errors.email && <span className="text-red text-sm">{errors.email}</span>}
    </div>
  );
}

import Input from '../input';
import RegisterItemTitle from './registerItemTitle';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
//import BatchesDropdown from '@/components/batchesDropdown';
import { UserInformationProps, DropdownOption } from '@/types/types';
import DatePicker from '../utils/datePicker';
import Router from 'next/router';
import UserName from './newUserInformation/userName';
import UserGender from './newUserInformation/userGender';
import UserBDay from './newUserInformation/userBDay';

export default function NewUserInformation({
  formData,
  setFormData,
}: UserInformationProps) {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    birthday: '',
    phone_number: '',
    start_date: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value,
      },
    }));
  };

  const handleGenderSelect = (
    gender: '남성' | '여성' | '기타' | '비공개' | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      user: { ...prevData.user, gender },
    }));
  };

  const handleDateChange = (start_date: string) => {
    console.log('선택된 날짜:', start_date); // 날짜 선택 시 로그 출력
    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        start_date,
      },
    }));
  };

  const handleBlurChange = (name: any) => {
    let error = '';
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div>
      <div className="flex gap-[5.19rem] w-[56.5625rem] mb-[5rem] sm:w-[20rem] sm:flex-col sm:gap-[1rem]">
        <RegisterItemTitle title="개인정보" required />

        <div className="flex flex-col gap-[3.12rem] sm:gap-[2.5rem]">
          <UserName
            value={formData.user}
            errors={errors}
            onInputChange={handleInputChange}
            onBlur={handleBlurChange}
          />
          <UserGender
            value={formData.user}
            onGenderSelect={handleGenderSelect}
          />
          <UserBDay
            value={formData.user}
            errors={errors}
            onInputChange={handleInputChange}
            onBlur={handleBlurChange}
          />
          {title !== 'Basic' && (
            <DatePicker
              value={formData.user.start_date || ''}
              onChange={handleDateChange}
              placeholder="날짜를 선택하세요"
              minDate={new Date()}
              width="31.25rem"
              title="시작일"
              description="프로그램 시작일을 선택해주세요."
            />
          )}
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="2"
        viewBox="0 0 938 2"
        fill="none"
      >
        <path d="M0 1H938" stroke="#CACACA" strokeWidth="5" />
      </svg>
    </div>
  );
}

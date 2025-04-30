import RegisterItemTitle from './registerItemTitle';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import UserEmail from './newUserInformation/userEmail';
import UserPhonenumber from './newUserInformation/userPhonenumber';
import { UserInformationProps, DropdownOption } from '@/types/types';
import DatePicker from '../utils/datePicker';
import UserName from './newUserInformation/userName';
import UserGender from './newUserInformation/userGender';
import UserBDay from './newUserInformation/userBDay';
import UserOS from './newUserInformation/userOS';

export default function NewUserInformation({
  formData,
  setFormData,
}: UserInformationProps) {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const [errors, setErrors] = useState({
    name: '',
    birthday: '',
    email: '',
    phone_number: '',
    os: '',
    start_date: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      users: {
        ...prevData.users,
        [name]: value,
      },
    }));
  };

  const handleGenderSelect = (
    gender: 'male' | 'female' | 'other' | 'undisclosed' | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      users: { ...prevData.users, gender },
    }));
  };

  const handleDateChange = (start_date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      users: {
        ...prevData.users,

        start_date,
      },
    }));
  };

  const emailValidation = (email: string) => {
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailRegex.test(email)) {
      return '* 이메일을 입력해 주세요.';
    }
    return '';
  };

  const phoneValidation = (phone_number: string) => {
    const phoneRegex = /^010[0-9]{8}$/;
    if (!phoneRegex.test(phone_number)) {
      return '* 전화번호만 입력해 주세요.';
    }
    return '';
  };

  const birthdayValidation = (birthday: string) => {
    const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthdayRegex.test(birthday)) {
      return '* 올바른 생년월일을 입력해 주세요.';
    }
    return '';
  };

  const nameValidation = (name: string) => {
    if (name.length < 2) {
      return '* 이름은 최소 두글자 이상이어야 합니다.';
    }
    return '';
  };
  const osValidation = (os: string) => {
    if (!os || os.trim() === '') {
      return '* 휴대전화 종류를 선택해 주세요.';
    }
    return '';
  };

  const handleBlurChange = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'email':
        error = emailValidation(value);
        break;
      case 'phone_number':
        error = phoneValidation(value);
        break;
      case 'birthday':
        error = birthdayValidation(value);
        break;
      case 'name':
        error = nameValidation(value);
      case 'os':
        error = osValidation(value);
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div>
      <div className="flex gap-[5.19rem] w-[56.5625rem] mb-[5rem] sm:w-[20rem] sm:flex-col sm:gap-[1rem]">
        <RegisterItemTitle title="개인정보" required />

        <div className="flex flex-col gap-[3.12rem] sm:gap-[2.5rem]">
          <UserName
            value={formData.users}
            errors={errors}
            onInputChange={handleInputChange}
            onBlur={handleBlurChange}
          />

          <UserBDay
            value={formData.users}
            errors={errors}
            onInputChange={handleInputChange}
            onBlur={handleBlurChange}
          />
          <UserOS
            value={formData.users}
            errors={errors}
            onInputChange={handleInputChange}
            onBlur={handleBlurChange}
          />
          <UserEmail
            value={formData.users}
            errors={errors}
            onInputChange={handleInputChange}
            onBlur={handleBlurChange}
          />
          <UserPhonenumber
            value={formData.users}
            errors={errors}
            onInputChange={handleInputChange}
            onBlur={handleBlurChange}
          />

          <UserGender
            value={formData.users}
            onGenderSelect={handleGenderSelect}
          />

          {title !== 'Basic' && (
            <DatePicker
              value={formData.users.start_date || ''}
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

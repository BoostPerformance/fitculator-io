import Input from '../input';
import RegisterItemTitle from './registerItemTitle';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import BatchesDropdown from './\bbatchesDropdown';
import { UserInformationProps, DropdownOption } from '@/types/types';

export default function UserInformation({
  formData,
  setFormData,
}: UserInformationProps) {
  const now = new Date();
  const koreanTimezoneOffset = 9 * 60; // 한국 시간대는 UTC+9
  now.setMinutes(now.getMinutes() + koreanTimezoneOffset);
  const startMonth = now.getMonth() + 2; // getMonth()는 0부터 시작하므로 +1, 다음 달을 받아야 하니 +2
  const startDay = now.getDate();

  // 기본 기수 설정 (예: 9기는 2024년 8월)
  const baseMonth = 9; // 9월이 기준
  const baseBatch = 10; // 10기가 기본

  const [batchStartDate, setBatchStartDate] = useState(`${startMonth}`);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone_number: '',
  });

  // 현재 월에 따른 기수 계산
  let rowNO;

  if (startMonth >= baseMonth) {
    rowNO = baseBatch + (startMonth - baseMonth);
  } else {
    rowNO = baseBatch + (startMonth + (12 - baseMonth));
  }

  const searchParams = useSearchParams();

  const pro: string | null = searchParams.get('pro');
  const proQuestions: boolean = pro === 'true' ? true : false;

  const handleSelectGender = (gender: '남성' | '여성') => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const emailValidation = (email: string) => {
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailRegex.test(email)) {
      return '* 이메일을 입력해주세요.';
    }
    return '';
  };

  const phoneValidation = (phone_number: string) => {
    const phoneRegex = /^010[0-9]{8}$/;
    if (!phoneRegex.test(phone_number)) {
      return '* 전화번호만 입력해주세요.';
    }
    return '';
  };
  const nameValidation = (name: string) => {
    if (name.length < 2) {
      return '* 이름은 최소 두글자 이상이어야 합니다.';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDropdownBlurChange = () => {
    console.log('blur');
  };

  const handleBlurChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'name') {
      error = nameValidation(value);
    } else if (name === 'email') {
      error = emailValidation(value);
    } else if (name === 'phone_number') {
      error = phoneValidation(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBatchesChange = (item: DropdownOption) => {
    setFormData((prev: any) => ({
      ...prev,
      subscription: {
        batchId: item.id,
      },
    }));

    const dropdownBatchStartedMonth =
      baseMonth + (parseInt(item.option) - baseBatch);
    const month =
      dropdownBatchStartedMonth > 12
        ? dropdownBatchStartedMonth - 12
        : dropdownBatchStartedMonth;

    setBatchStartDate(`${month}`);
  };

  return (
    <div>
      <div className="flex gap-[5.19rem] w-[56.5625rem] mb-[5rem]">
        <RegisterItemTitle title="개인정보" required />

        <div className="flex flex-col gap-[3.12rem]">
          <div className="flex flex-col">
            <div className="flex gap-[0.5rem] items-end">
              <label className="text-1.25-700 text-gray-1">이름</label>
              <p className="text-1-500 text-gray-7">본명을 적어주세요</p>
            </div>
            <Input
              name="name"
              placeholder="홍길동"
              width="21.25rem"
              value={formData.user.name || ''}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              type="text"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          {proQuestions ? (
            <div className="flex flex-col">
              <div>
                <div className="flex gap-[0.3rem] items-end">
                  <h1 className="text-1.25-700 text-gray-6">참여기수</h1>
                  <p className="text-1-500 text-gray-7">
                    시작일은 {batchStartDate}월 1일입니다
                  </p>
                </div>

                {startDay >= 21 && (
                  <span className="text-0.875-500 text-gray-7">
                    *{rowNO}기 마감이 얼마 안남았어요!
                  </span>
                )}
                <BatchesDropdown
                  rowNO={rowNO}
                  onChange={handleBatchesChange}
                  title="기수를"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[0.75rem]">
              <h1 className="text-1.25-700 text-gray-6">성별</h1>
              <div className="flex gap-[1.06rem]">
                <button
                  onClick={() => handleSelectGender('남성')}
                  type="button"
                  className="px-[1.25rem] py-[0.625rem] rounded-[0.375rem] border-[0.1rem] border-gray-7 text-gray-7 focus:border-blue-1 focus:text-blue-1"
                >
                  남성
                </button>
                <button
                  onClick={() => handleSelectGender('여성')}
                  type="button"
                  className="px-[1.25rem] py-[0.625rem] rounded-[0.375rem] border-[0.1rem] border-gray-7 text-gray-7 focus:border-blue-1 focus:text-blue-1"
                >
                  여성
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex gap-[0.5rem] items-end">
              <h1 className="text-1.25-700 text-gray-6">이메일 주소</h1>
              <p className="text-1-500 text-gray-7">
                이메일 주소를 입력해 주세요.
              </p>
            </div>
            <Input
              name="email"
              placeholder="fit@gmail.com"
              width="31.25rem"
              value={formData.user.email || ''}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              type="email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex gap-[0.5rem] items-end">
              <h1 className="text-1.25-700 text-gray-6">연락처</h1>
              <p className="text-1-500 text-gray-7">전화번호만 입력해주세요</p>
            </div>
            <Input
              name="phone_number"
              placeholder="01012345678"
              width="21.25rem"
              value={formData.user.phone_number || ''}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              type="tel"
            />
            {errors.phone_number && (
              <span className="text-red-500 text-sm">
                {errors.phone_number}
              </span>
            )}
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="938"
        height="2"
        viewBox="0 0 938 2"
        fill="none"
      >
        <path d="M0 1H938" stroke="#CACACA" strokeWidth="2" />
      </svg>
    </div>
  );
}

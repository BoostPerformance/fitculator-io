import Input from '../input';
import RegisterItemTitle from './registerItemTitle';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PersonalInformation() {
  const startMonth = 8;
  const startDay = 1;
  const rowNO = 8;

  const [selectGender, setSelectGender] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const pro: string | null = searchParams.get('pro');
  const proQuestions: boolean = pro === 'true' ? true : false;

  const handleSelectGender = (gender: string) => {
    setSelectGender(gender);
    console.log('Selected gender:', selectGender);
  };

  useEffect(() => {
    if (selectGender) {
      console.log('Selected gender:', selectGender);
    }
  }, [selectGender]);

  return (
    <div>
      <div className="flex gap-[5.19rem] w-[56.5625rem] mb-[5rem]">
        <RegisterItemTitle title="개인정보" required />

        <div className="flex flex-col gap-[3.12rem]">
          <div className="flex flex-col">
            <div>
              <label className="text-1.25-700 text-gray-1">이름</label>
              <p className="text-1-500 text-gray-7">본명을 적어주세요</p>
            </div>
            <Input placeholder="홍길동" width="21.25rem" />
          </div>

          {proQuestions ? (
            <div className="flex flex-col">
              <div>
                <h1 className="text-1.25-700 text-gray-6">참여기수</h1>
                <p className="text-1-500 text-gray-7">
                  시작일은 {startMonth}월 {startDay}일입니다
                </p>
              </div>
              <span className="text-0.875-500 text-gray-7">
                *{rowNO}기 마감이 얼마 안남았어요!
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-[0.75rem]">
              <h1 className="text-1.25-700 text-gray-6">성별</h1>
              <div className="flex gap-[1.06rem]">
                <button
                  onClick={() => handleSelectGender('남성')}
                  className="px-[1.25rem] py-[0.625rem] rounded-[0.375rem] border-[0.1rem] border-gray-7 text-gray-7 focus:border-blue-1 focus:text-blue-1"
                >
                  남성
                </button>
                <button
                  onClick={() => handleSelectGender('여성')}
                  className="px-[1.25rem] py-[0.625rem] rounded-[0.375rem] border-[0.1rem] border-gray-7 text-gray-7 focus:border-blue-1 focus:text-blue-1"
                >
                  여성
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <div>
              <h1 className="text-1.25-700 text-gray-6">이메일 주소</h1>
              <p className="text-1-500 text-gray-7">
                이메일 주소를 입력해 주세요.
              </p>
            </div>
            <Input placeholder="fit@gmail.com" width="31.25rem" />
          </div>

          <div className="flex flex-col">
            <div>
              <h1 className="text-1.25-700 text-gray-6">연락처</h1>
              <p className="text-1-500 text-gray-7">천화번호만 입력해주세요</p>
            </div>
            <Input placeholder="0102345678" width="21.25rem" />
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

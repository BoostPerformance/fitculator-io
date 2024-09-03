import Dropdown from '../dropdown';
import GoalPercentage from '@/data/goalPercentage';
import ReferralSource from '@/data/referralSource';
import RegisterItemTitle from './registerItemTitle';
import MultiSelectionButtons from './multiselectionButtons';
import { useSearchParams } from 'next/navigation';
import RadioButtonSlide from './radioButtonSlide';
import ExerciseGuideline from './exerciseGuideline';
import {
  RegisterFormData,
  ExercisePreferenceProps,
  DropdownOption,
} from '@/types/types';
import { useState, useEffect } from 'react';
import ExerciseModal from './exerciseModal';

export default function ExercisePreference({
  formData,
  setFormData,
}: ExercisePreferenceProps) {
  const searchParams = useSearchParams();

  const pro: string | null = searchParams.get('pro');
  const proQuestions: boolean = pro === 'true' ? true : false;
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 모바일 기준 너비 설정 (예: 768px 이하를 모바일로 간주)
    };

    checkIsMobile(); // 초기 로드 시 모바일 감지

    window.addEventListener('resize', checkIsMobile); // 윈도우 크기 변경 시 감지

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleGoalChange = (item: DropdownOption) => {
    setFormData((prev: any) => ({
      ...prev,
      exercisePreference: {
        ...prev.exercisePreference,
        exercise_goal: item.option,
      },
    }));
  };

  const handleReferralSourceChange = (item: DropdownOption) => {
    setFormData((prev: any) => ({
      ...prev,
      exercisePreference: {
        ...prev.exercisePreference,
        ReferralSource: item.option,
      },
    }));
  };

  const handleRadioChange = (id: number) => {
    setFormData((prev: any) => ({
      ...prev,
      exercisePreference: {
        ...prev.exercisePreference,
        exerciseLevel: id,
      },
    }));
  };

  const handleMultiSelectChange = (item: string[]) => {
    setFormData((prev: RegisterFormData) => ({
      ...prev,
      exercise_goal: item,
    }));
  };

  const handleModal = () => {
    setShowModal(false);
  };

  const handleGuidelineClick = () => {
    if (isMobile) {
      setShowModal(true);
    }
  };

  return (
    <div>
      <div className="flex gap-[5.19rem] w-[56.5625rem] mb-[5rem] sm:w-auto sm:flex-col sm:gap-[1rem] sm:mt-[3.75rem]">
        <RegisterItemTitle title="운동정보" required />

        <div className="flex flex-col gap-[3.12rem] sm:gap-[2.5rem]">
          <div className="flex flex-col">
            <div className="flex gap-[0.5rem] items-end sm:flex-col sm:items-start">
              <h1 className="text-1.25-700 text-gray-1 sm:text-1-700">
                운동 목표
              </h1>
              <p className="text-1-500 text-gray-7 sm:text-0.75-500">
                운동 목표를 선택 해 주세요. (복수 선택 가능)
              </p>
            </div>
            <MultiSelectionButtons onChange={handleMultiSelectChange} />
          </div>

          <div className="flex flex-col gap-[3rem]">
            <div className="flex items-end gap-1 sm:flex-col sm:items-start sm:mt-[5rem]">
              <h1 className="text-1.25-700 text-gray-6 sm:text-1-700">
                운동 수행 능력(1-7)
              </h1>
              <p className="text-1-500 text-gray-7 sm:text-0.75-500">
                본인이 생각하는 운동 수행력을 선택해주세요
              </p>
            </div>

            <RadioButtonSlide onChange={handleRadioChange} />
          </div>
          {proQuestions ? (
            <div className="flex flex-col gap-[0.7rem]">
              <h1 className="text-1.25-700 text-gray-6 sm:text-1-700">
                나의 이번 기수 목표운동량을 선택해주세요
              </h1>
              <div>
                <p className="text-1-500 text-gray-7 sm:text-0.875-500">
                  선택하신 &apos;목표운동량 + 근력운동 2회&apos;를 매주
                  달성하셔야 페이백 대상자가 됩니다.
                </p>
                <span className="text-1-500 text-gray-7 sm:text-0.75-500">
                  *핏큘레이터가 처음이라면 &apos;100&apos;을 추천해요!
                </span>
              </div>

              <Dropdown
                data={GoalPercentage}
                onChange={handleGoalChange}
                title="목표운동량을"
              />
              <div className="w-[34.81rem] sm:w-auto ">
                <span
                  onMouseEnter={() => !isMobile && setShowModal(true)}
                  onMouseLeave={() => !isMobile && setShowModal(false)}
                  role="button"
                  className="text-1-500 text-gray-7 sm:cursor-pointer sm:text-0.75-500"
                  onClick={handleGuidelineClick}
                >
                  *목표운동량이란?
                </span>
                {showModal && !isMobile && <ExerciseGuideline />}
                {showModal && isMobile && (
                  <ExerciseModal handleModal={handleModal} /> // 모바일에서는 전체화면 모달 열기
                )}
              </div>
            </div>
          ) : (
            <div>
              <div>
                <h1 className="text-1.25-700 text-gray-6">
                  FITCULATOR를 알게된 경로
                </h1>
                <p className="text-1-500 text-gray-7">
                  저희를 어떻게 알게 되셨나요?
                </p>
              </div>
              <Dropdown
                data={ReferralSource}
                onChange={handleReferralSourceChange}
                title="옵션을"
              />
            </div>
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

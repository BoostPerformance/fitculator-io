import { AccordionItem } from '../accordion';
import Dropdown from '../dropdown';
import GoalPercentage from '@/data/goalPercentage';
import HowFoundFitculator from '@/data/howFoundFitculator';
import RegisterItemTitle from './registerItemTitle';
import MultiSelectionButtons from './multiselectionButtons';
import { useSearchParams } from 'next/navigation';
import RadioButtonSlide from './radioButtonSlide';

export default function ExerciseInformation() {
  const searchParams = useSearchParams();

  const pro: string | null = searchParams.get('pro');
  const proQuestions: boolean = pro === 'true' ? true : false;

  return (
    <div>
      <div className="flex gap-[5.19rem] w-[56.5625rem] mb-[5rem]">
        <RegisterItemTitle title="운동정보" required />

        <div className="flex flex-col gap-[3.12rem]">
          <div className="flex flex-col">
            <div>
              <h1 className="text-1.25-700 text-gray-1">운동목표</h1>
              <p className="text-1-500 text-gray-7">
                운동 목표를 선택 해 주세요. (복수 선택 가능)
              </p>
              <MultiSelectionButtons />
            </div>
          </div>

          <div className="flex flex-col gap-[3rem]">
            <div className="flex items-end gap-1">
              <h1 className="text-1.25-700 text-gray-6">운동 수행 능력(1-7)</h1>
              <p className="text-1-500 text-gray-7">
                본인이 생각하는 운동 수행력을 선택해주세요
              </p>
            </div>
            <RadioButtonSlide />
          </div>
          {proQuestions ? (
            <div className="flex flex-col">
              <div>
                <h1 className="text-1.25-700 text-gray-6">
                  나의 이번 기수 목표운동량을 선택해주세요
                </h1>
                <p className="text-1-500 text-gray-7">
                  선택하신 &apos;목표운동량 + 근력운동 2회&apos;를 달성하셔야
                  페이백 대상자가 됩니다.
                </p>
              </div>
              <Dropdown data={GoalPercentage} />
              <span>*핏큘레이터가 처음이라면 &apos;100&apos;을 추천해요!</span>
              <div className="w-[34.81rem]">
                <AccordionItem
                  path={false}
                  title="What is a Secure Key?"
                  content={
                    <>
                      <div>content</div>
                    </>
                  }
                />
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
              <Dropdown data={HowFoundFitculator} />
            </div>
          )}
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

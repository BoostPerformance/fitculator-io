import Input from '@/components/input';
import { FormErrors } from '@/types/types';

interface UserOSProps {
  value: any;
  errors: Pick<FormErrors, 'os'>;
  onInputChange: (name: string, value: string) => void;
  onBlur: (name: string, value: string) => void;
}

export default function UserOS({
  value,
  errors,
  onInputChange,
  onBlur,
}: UserOSProps) {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      console.log('OS 선택됨:', e.target.value);

      onInputChange('os', e.target.value);

      onBlur('os', e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className="flex gap-[0.5rem] sm:gap-[0.1rem] md:gap-[0.1rem] items-end sm:flex-col sm:items-start md:flex-col md:items-start">
        <h1 className="text-1.25-700 text-gray-6 sm:text-1-700">
          사용 중인 휴대전화 종류를 선택해주세요.
        </h1>
        <p className="text-1-500 text-gray-7 sm:text-0.75-500">
          앱 설치를 위해 사용 중인 휴대전화를 선택해주세요.
        </p>
      </div>
      <div className="flex flex-col space-y-2 mt-2 items-start ">
        <label
          htmlFor="os-ios"
          className="flex gap-3 items-center cursor-pointer"
        >
          <Input
            name="os"
            type="radio"
            value="ios"
            height="1rem"
            width="1rem sm:w-[1rem]"
            className="m-0 p-0"
            onChange={handleRadioChange}
          />
          <div className="text-1-400 text-gray-6">아이폰 (iOS)</div>
        </label>
        <label
          htmlFor="os-android"
          className="flex gap-3 items-center cursor-pointer"
        >
          <Input
            name="os"
            type="radio"
            value="android"
            height="1rem sm:w-[1rem] "
            width="1rem"
            className="m-0 p-0 "
            onChange={handleRadioChange}
          />
          <div className="text-1-400 text-gray-6">안드로이드 (Android)</div>
        </label>
        {errors.os && <span className="text-red text-sm">{errors.os}</span>}
      </div>
    </div>
  );
}

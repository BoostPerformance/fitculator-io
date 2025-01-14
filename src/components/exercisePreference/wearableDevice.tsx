import MultiSelectionButtons from '../multiselectionButtons';
import WearableDevice from '@/data/wearableDevice';

interface WearableDeviceProps {
  onChange: (item: string[]) => void; // onChange의 타입을 명시
}

const WearableDeviceChoice: React.FC<WearableDeviceProps> = ({ onChange }) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-[0.5rem] items-end sm:flex-col sm:items-start">
        <h1 className="text-1.25-700 text-gray-1 sm:text-1-700">
          사용 중인 웨어러블 디바이스
        </h1>
        <p className="text-1-500 text-gray-7 sm:text-0.75-500">
          (복수 선택 가능)
        </p>
      </div>
      <MultiSelectionButtons onChange={onChange} data={WearableDevice} />
    </div>
  );
};

export default WearableDeviceChoice;

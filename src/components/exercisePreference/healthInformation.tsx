import DropdownMenu from '../dropdown';
import { totalColesterole, LDLColesterole } from '@/data/healthItems';
import { DropdownOption } from '@/types/types';

export default function HealthInformation({
  onChange,
}: {
  onChange: (item: DropdownOption) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-0">
        <h1 className="text-1.25-700 text-gray-6 sm:text-1-700">
          총 콜레스테롤 수치를 선택해주세요
        </h1>
        <DropdownMenu
          data={totalColesterole}
          onChange={onChange}
          title="수치를"
        />
      </div>

      <div className="flex flex-col gap-0">
        <h1 className="text-1.25-700 text-gray-6 sm:text-1-700">
          LDL 콜레스테롤 수치를 선택해주세요
        </h1>
        <DropdownMenu
          data={LDLColesterole}
          onChange={onChange}
          title="수치를"
        />
      </div>
    </>
  );
}

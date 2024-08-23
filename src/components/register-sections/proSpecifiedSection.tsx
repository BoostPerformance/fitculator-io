import RegisterItemTitle from './registerItemTitle';
import Input from '../input';

export default function ProSpecifiedSection() {
  return (
    <div className="flex gap-[5.19rem] w-[56.5625rem] mb-[5rem]">
      <RegisterItemTitle title="운동고민" required={false} />

      <div className="w-auto flex flex-col gap-[0.75rem]">
        <h1 className="text-1.25-700 text-gray-1">바라는 점/운동 고민</h1>
        <p className="text-1-500 text-gray-7">
          평소 갖고 있었던 운동 관련 고민, 또는 저희 FITCULATOR 팀에게 하고 싶은
          말이 있다면 작성해주세요. <br />이 내용을 최대한 반영하여 더 좋은
          서비스를 제공해드릴게요.
        </p>
        <Input placeholder="자유롭게 작성해주세요." width="42.75rem" />
      </div>
    </div>
  );
}

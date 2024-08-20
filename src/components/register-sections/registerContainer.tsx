import RegisterItemTitle from './registerItemTitle';

export default function RegisterContainer() {
  return (
    <div className="flex gap-[5rem]">
      <RegisterItemTitle required title="개인정보" />

      <div>
        <h1>참여기수</h1>
        <p></p>
        <span></span>
      </div>
    </div>
  );
}

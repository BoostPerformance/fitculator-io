interface InputProps {
  placeholder: string;
  width?: string; // width를 선택적으로 받음
}

export default function Input({ placeholder, width = '15rem' }: InputProps) {
  return (
    <>
      <input
        className={`h-[3rem] pl-[1rem] rounded-[0.375rem] border-gray-9 border-[0.1rem]`}
        style={{ width }}
        type="text"
        placeholder={placeholder}
      />
    </>
  );
}

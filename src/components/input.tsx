export default function Input({ placeholder }: { placeholder: string }) {
  return (
    <>
      <input
        className="h-[3rem] pl-[1rem] rounded-[0.375rem] w-[15rem] border-black border-[0.1rem]"
        type="text"
        placeholder={placeholder}
      />
    </>
  );
}

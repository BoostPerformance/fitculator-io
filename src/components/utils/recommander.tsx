import Input from '../input';

interface Recommander {
  formData: {
    user?: {
      name?: string;
    };
  };
  setFormData: () => void;
}

export default function Recommander({ formData, setFormData }: Recommander) {
  return (
    <div className="flex flex-col gap-[0.3rem] sm:gap-[0.1rem]">
      <div className="flex gap-[0.5rem] items-end sm:items-center">
        <div className="text-1.25-700 text-gray-1 sm:text-1-700">추천인</div>
        <p className="text-1-500 text-gray-7 sm:text-0.75-500">선택</p>
      </div>
      <Input
        name="name"
        placeholder="홍길동"
        width="21.25rem"
        value={formData?.user?.name || ''}
        onChange={() => console.log('onchange')}
        onBlur={() => console.log('onBlur')}
        type="text"
      />
      {/* {errors.name && <span className="text-red text-sm">{errors.name}</span>} */}
    </div>
  );
}

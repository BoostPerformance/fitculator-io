import Button from '@/components/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="flex py-[8rem] justify-center relative sm:items-center sm:flex-col sm:py-[6rem] sm:left-0">
      <Image
        src="/images/sneakers.png"
        width={100}
        className="sm:w-[10rem] hidden sm:inline z-0 sm:relative pb-[2rem]"
        height={40}
        alt="신발이미지
        "
      />
      <div className="flex flex-col gap-[2rem] w-[40rem] sm:w-auto sm:px-[3rem]">
        <Image
          src="/svg/logo.svg"
          width={200}
          height={0}
          alt="logo"
          className="sm:hidden"
        />
        <div className="flex flex-col sm:items-center sm:justify-center font-theJamsil">
          <h1 className="text-1.875-300">결제를 완료했습니다.</h1>
          <h2 className="text-1.875-300 pt-[1rem]">
            이제 핏큘레이터와 <br /> 함께 운동해요!
          </h2>
        </div>
        <p className="text-1.875-100 sm:text-center sm:text-[1.7rem]">
          <br /> 아래 버튼을 누르면 <br />
          디스코드로 입장하실 수 있습니다.
        </p>

        <Link href="./">
          <Button
            text="Discord 입장"
            size="sm"
            variant="white"
            className="sm:ml-[0.5rem] border-[0.1rem] border-blue-1"
          />
        </Link>
      </div>
      <div className="absolute z-0 right-[20rem] sm:right-0 sm:hidden md:relative md:right-[20rem] md:z-[-1]">
        <Image
          src="/images/sneakers.png"
          width={500}
          className="w-[27rem] h-[20.875rem] md:w-[30rem]"
          height={40}
          alt="404 이미지"
        />
      </div>
    </div>
  );
}

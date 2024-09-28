'use client';
import Button from '@/components/button';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const basic: boolean = title === 'Basic' ? true : false;

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
      <div className="flex flex-col gap-[3rem] w-[40rem] sm:w-auto sm:px-[3rem]">
        <Image
          src="/images/logo.png"
          width={200}
          height={0}
          alt="logo"
          className="sm:hidden"
        />
        <div className="flex flex-col sm:items-center sm:justify-center ">
          <h1 className="text-1.875-300 font-theJamsil">
            {`${basic ? '신청' : '결제'}를 완료했습니다.`}
          </h1>
          <h2 className="text-1.875-500 pt-[1rem] font-theJamsil">
            이제 핏큘레이터와 <br /> 함께 운동해요!
          </h2>
          <p className="text-1.5-400 sm:text-center sm:text-[1.7rem]">
            <br /> 곧 디스코드 입장 링크를
            <br />
            휴대폰으로 전송 드릴게요!
          </p>
        </div>

        <Link href="./">
          <Button
            text="홈으로 가기"
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

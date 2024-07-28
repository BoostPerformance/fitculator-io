import Link from 'next/link';
import Header from './header';
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className="h-[30rem]">
      <div className="text-gray-1">
        <Header />
      </div>
      <div className="flex flex-row justify-around mt-[4.5rem] sm:flex-col sm:items-center sm:gap-3">
        <p className="sm:text-0.7-700 sm:text-center">
          FITCULATOR (핏큘레이터) <br />
          사업자등록번호: 262-67-00523 | 대표:류현지 <br />
          통신판매신고: 2023-서울서대문-0576 <br />
          고객센터: 010-7977-1101 <br />
          서울특별시 중구 청계천로 100 (시그니처타워) 서관 10층 1029호 <br />
          ©2024 FITCULATOR. All rights reserved.
        </p>
        <Link
          className="flex flex-row items-start gap-2 sm:text-0.7-700"
          href="https://instagram.com/fitculator_official/"
        >
          <Image
            className="sm:size-[1rem]"
            src="/svg/instagram.svg"
            alt="instagram"
            width={24}
            height={10}
          />
          @fitculator_official
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

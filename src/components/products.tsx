'use client';
import ProductItem from './productItem';
import Image from 'next/image';
import Toggle from './toggle';
import { useState } from 'react';

const Product = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1개월');

  const handleToggleProduct = (period: string) => {
    setSelectedPeriod(period);
  };
  const perMonth = selectedPeriod;

  return (
    <div
      className="h-auto bg-gray-2 w-full md:w-full py-[6.25rem] flex flex-col items-center gap-[3rem] sm:gap-[1rem] sm:mx-[1.3rem] sm:w-full leading-tight"
      id="product-section"
    >
      <Image src="/images/logo-2.png" alt="logo" width={50} height={50} />
      <div className="flex-row gap-0 flex sm:flex-col sm:items-center sm:mb-[3rem]">
        <h1 className="text-2.5-900 sm:text-1.75-900">
          비대면 운동관리 프로그램
        </h1>
        <h1 className="text-2.5-900 sm:text-1.75-900">
          &nbsp;핏큘레이터 신청하기
        </h1>
      </div>
      {/* <Toggle
        handleToggleProduct={handleToggleProduct}
        selectedPeriod={selectedPeriod}
      /> */}

      <div className="flex flex-row h-auto gap-[3rem] w-[50rem] md:gap-[1.3rem] md:w-[95%] justify-center sm:flex-col sm:items-center">
        <ProductItem
          title="Basic"
          descriptions={[
            '운동량 계산 및 분석',
            '피로도 관리',
            <>
              <div>피트니스 특화 챗봇</div>
              <div>(질문답변, 프로그램 피드백 등)</div>
            </>,
            '커뮤니티 활동',
          ]}
          price={0}
          selectedPeriod={selectedPeriod}
          basic
        />
        <ProductItem
          title="PLUS"
          descriptions={[
            '운동량 계산 및 분석',
            '피로도 관리',
            <>
              <div>피트니스 특화 챗봇</div>
              <ol className="list-disc list-inside">
                <li>질문답변, 프로그램 피드백</li>
              </ol>
            </>,
            '커뮤니티 활동',
            <>
              <div className="flex flex-col items-start">
                <div className="flex flex-col items-start sm:gap-1">
                  <div>전담 코치 배정</div>
                  <ol className="list-disc list-inside">
                    <li>개별 운동 루틴, 데일리 피드백</li>
                  </ol>
                </div>
              </div>
            </>,
          ]}
          price={24900}
          perMonth="1개월"
          secondCard
          selectedPeriod={selectedPeriod}
        />
        <ProductItem
          title="PRO"
          descriptions={[
            '운동량 계산 및 분석',
            '피로도 관리',
            <>
              <div>피트니스 특화 챗봇</div>
              <ol className="list-disc list-inside">
                <li>질문답변, 프로그램 피드백</li>
              </ol>
            </>,
            '커뮤니티 활동',
            <>
              <div>전담 코치 배정</div>
              <ol className="list-disc list-inside">
                <li>개별 운동 루틴, 데일리 피드백</li>
              </ol>
            </>,
          ]}
          targetCustomer="식습관 및 운동습관을 점검받아보고 싶으신 분"
          price={74900}
          perMonth="1개월"
          selectedPeriod={selectedPeriod}
          thirdCard
        />
      </div>
    </div>
  );
};

export default Product;

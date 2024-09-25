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

  return (
    <div
      className="h-auto bg-gray-2 w-full py-[6.25rem] flex flex-col items-center gap-[3rem] sm:gap-[1rem] sm:mx-[1.3rem] sm:w-full"
      id="product-section"
    >
      <Image src="/images/logo-2.png" alt="logo" width={50} height={50} />
      <div className="flex-row gap-0 flex sm:flex-col sm:items-center sm:mb-[3rem]">
        <h1 className="text-2.5-900 sm:text-1.75-900">
          비대면 운동관리 프로젝트
        </h1>
        <h1 className="text-2.5-900 sm:text-1.75-900">핏큘레이터 신청하기</h1>
      </div>
      <Toggle
        handleToggleProduct={handleToggleProduct}
        selectedPeriod={selectedPeriod}
      />

      <div className="flex flex-row h-auto gap-[3rem] sm:flex-col">
        <ProductItem
          title="LITE"
          descriptions={[
            '운동량 계산 및 분석',
            '피로도 관리',
            <>
              <div>피트니스 특화 챗봇</div>
              <div>• 질문답변, 프로그램 피드백</div>
            </>,
            '커뮤니티 활동',
          ]}
          price={20000}
          perMonth="1달"
          selectedPeriod={selectedPeriod}
        />

        <ProductItem
          title="PRO"
          descriptions={[
            '운동량 계산 및 분석',
            '피로도 관리',
            <>
              <div>피트니스 특화 챗봇</div>
              <div>• 질문답변, 프로그램 피드백</div>
            </>,
            '커뮤니티 활동',
            <>
              <div className="flex flex-col items-start">
                <div className="flex items-center sm:gap-1">
                  <div>전담 코치 배정</div>
                  <span className="rounded-[1.125rem] py-0 px-[0.5rem] border-[0.1rem] border-white text-white bg-transparent sm:text-0.75-500 2 hidden sm:inline">
                    인기
                  </span>
                </div>
                <div className="flex items-center sm:flex-row gap-1">
                  <div>• 개별 운동 루틴, 데일리 피드백</div>
                  <span className="rounded-[1.125rem] py-[0.1rem] px-[0.625rem] border-[0.1rem] border-white text-white bg-transparent text-0.875-700 sm:text-0.7-700 sm:hidden">
                    인기
                  </span>
                </div>
              </div>
            </>,
          ]}
          price={70000}
          perMonth="1달"
          pro
          selectedPeriod={selectedPeriod}
        />
      </div>
    </div>
  );
};

export default Product;

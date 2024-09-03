'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const RegisterTitle: React.FC<{ title: string }> = ({ title }) => {
  const searchParams = useSearchParams();

  const period: string | null = searchParams.get('period');

  return (
    <>
      <div className="w-[56.4375rem] sm:w-[20rem] sm:mb-[2rem]">
        <h1 className="text-3-700 sm:text-1.5-700">
          FITCULATOR
          <span className="text-blue-1 ">
            &nbsp;{title}&nbsp;{period}
          </span>
          신청
        </h1>
        <p className="text-1.25-700 text-gray-1 sm:text-0.875-700">
          WHO 표준운동량에 맞게 운동해보세요!
        </p>
      </div>
    </>
  );
};

export default RegisterTitle;

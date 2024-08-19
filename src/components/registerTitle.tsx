'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const RegisterTitle: React.FC = () => {
  const searchParams = useSearchParams();

  const title: string | null = searchParams.get('title');
  const period: string | null = searchParams.get('period');
  return (
    <>
      <div className="text-1.75-500">
        <h1>
          FITCULATOR{' '}
          <span className="text-blue-1">
            {title} &nbsp;{period}
          </span>
          신청
        </h1>
        <p>WHO 표준운동량에 맞게 운동해보세요!</p>
      </div>
    </>
  );
};

export default RegisterTitle;

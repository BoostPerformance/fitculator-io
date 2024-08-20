'use client';
import Button from '@/components/button';
import ExerciseInformation from '@/components/register-sections/exerciseInformation';
import PaymentInformation from '@/components/register-sections/paymentInformation';
import PersonalInformation from '@/components/register-sections/personalInformation';
import ProSpecifiedSection from '@/components/register-sections/proSpecifiedSection';
import RegisterTitle from '@/components/registerTitle';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Register = () => {
  const searchParams = useSearchParams();

  const price: string | null = searchParams.get('price');

  return (
    <div className="flex flex-col items-center gap-[5rem] p-[6.88rem]">
      <RegisterTitle />
      <PersonalInformation />
      <ExerciseInformation />
      <ProSpecifiedSection />
      <PaymentInformation />
      <div className="text-gray-9 text-1-500 flex flex-col items-center gap-[0.6rem]">
        <Button
          className="mt-0"
          text={`${price}원 결제하기`}
          size="md"
          variant="default"
        />
        <p>약관 및 주문 내용을 확인했으며, 정보 제공등에 동의합니다.</p>
      </div>
    </div>
  );
};

export default Register;

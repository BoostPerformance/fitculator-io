'use client';
import Button from '@/components/button';
import { useState } from 'react';
import React from 'react';
import { RegisterFormData, ApiResponse } from '@/types/types';
import RefundPolicy from './refundPolicy';
import UserInformation from './register-sections/userInformation';
import ExercisePreference from './register-sections/exercisePreference';
import ExerciseConcern from './register-sections/exerciseConcern';
import RegisterTitle from './registerTitle';
import { useSearchParams, useRouter } from 'next/navigation';

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const period: string | null = searchParams.get('period');
  const router = useRouter();

  const title = searchParams.get('title');

  const [formData, setFormData] = useState<RegisterFormData>({
    user: {
      name: '',
      email: '',
      phone_number: '',
      gender: '남성',
    },
    exercisePreferences: {
      exercise_level: 1,
      exercise_goal: '',
      exercise_performance_level: '',
      exercise_concern: '',
      referral_source: '',
    },
    programs: {
      type: `${title}`,
      duration_in_months: parseInt(`${period}`),
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log('리스폰스 받기 성공', responseData);
      if (response.ok) {
        router.push('/payment');
      }
      return responseData;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col items-center gap-[5rem] p-[6.88rem] md:w-auto sm:w-auto sm:gap-[0.4rem] sm:bg-white sm:m-[1.25rem] sm:p-[2rem]">
        <RegisterTitle title={title} period={period} />
        <UserInformation formData={formData} setFormData={setFormData} />
        <ExercisePreference formData={formData} setFormData={setFormData} />
        <ExerciseConcern formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex flex-col gap-[0.5rem] items-center">
        <Button
          className="mt-0"
          text={`결제하기`}
          size="lg"
          variant="default"
          type="submit"
        />
        <p className="sm:text-0.75-500 sm:text-center  text-gray-7 ">
          약관 및 주문 내용을 확인했으며, <br className="hidden sm:block" />
          정보 제공등에 동의합니다.
        </p>
      </div>
      <div className="w-[29rem] text-gray-7 sm:w-[20rem] pb-[5rem]">
        <RefundPolicy />
      </div>
    </form>
  );
};

export default RegisterForm;

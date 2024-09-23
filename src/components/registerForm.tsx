'use client';
import Button from '@/components/button';
import { useState, useEffect } from 'react';
import React from 'react';
import { RegisterFormData, ApiResponse } from '@/types/types';
import RefundPolicy from './refundPolicy';
import UserInformation from './register-sections/userInformation';
import ExercisePreference from './register-sections/exercisePreference';
import ExerciseConcern from './register-sections/exerciseConcern';
import RegisterTitle from './registerTitle';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const period: string | null = searchParams.get('period');
  const router = useRouter();

  const title = searchParams.get('title');
  const priceParam = searchParams.get('price');
  const price = priceParam ? Number(priceParam.replace(/,/g, '')) : 0;

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
    subscriptions: {
      batch_id: null,
    },
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 필수 항목이 모두 입력되었는지 확인하는 useEffect
  useEffect(() => {
    const { name, email, phone_number } = formData.user;
    const { exercise_goal } = formData.exercisePreferences;
    const { duration_in_months } = formData.programs;

    // 필수 항목들이 모두 채워졌는지 확인
    if (
      name.trim() !== '' &&
      email.trim() !== '' &&
      phone_number.trim() !== '' &&
      exercise_goal.trim() !== '' &&
      duration_in_months > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tossPayments = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'no key'
    );

    if (!process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY) {
      throw new Error('TOSS_CLIENT_KEY가 설정되지 않았습니다.');
    }

    await tossPayments.requestPayment('카드', {
      amount: Number(`${price}`),
      orderId: Math.random().toString(36).slice(2),
      orderName: `${title} ${period}`,
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    });

    if (isButtonDisabled) {
      return;
    }
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
          disabled={isButtonDisabled}
        />
        {isButtonDisabled ? (
          <div className="text-red">필수 항목을 입력해주세요</div>
        ) : (
          <></>
        )}
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

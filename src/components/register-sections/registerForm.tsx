'use client';
import Button from '@/components/button';
import { useState, useEffect } from 'react';
import React from 'react';
import { RegisterFormData, ApiResponse } from '@/types/types';
import RefundPolicy from '../refundPolicy';
import UserInformation from './userInformation/userInformation';
import ExercisePreference from './exercisePreference';
import ExerciseConcern from './exerciseConcern';
import RegisterTitle from './registerTitle';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useMutation } from '@tanstack/react-query';

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
      birthday: '',
      phone_number: '',
      gender: '',
    },
    exercisePreferences: {
      exercise_level: 1,
      exercise_goal: '',
      exercise_performance_level: '',
      exercise_concern: '',
      referral_source: '',
      total_cholesterol: '',
      ldl_cholesterol: '',
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

  useEffect(() => {
    const { name, email, phone_number } = formData.user;
    const {
      exercise_goal,
      total_cholesterol,
      ldl_cholesterol,
      referral_source,
    } = formData.exercisePreferences;
    const { duration_in_months } = formData.programs;

    const isHealthQuestionComplete =
      total_cholesterol?.trim() !== '' && ldl_cholesterol?.trim() !== '';

    if (
      name?.trim() !== '' &&
      email?.trim() !== '' &&
      phone_number?.trim() !== '' &&
      referral_source?.trim() !== '' &&
      (exercise_goal?.trim() !== '' || isHealthQuestionComplete) &&
      duration_in_months > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formData]);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('폼 제출에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('성공적으로 전송되었습니다', data);
      router.push('/payment');
    },
    onError: (error) => {
      console.error('폼 제출 중 에러 발생:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tossPayments = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'no key'
    );

    // TossPayments 클라이언트 키가 설정되지 않은 경우 에러를 발생시킵니다.
    if (!process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY) {
      throw new Error('TOSS_CLIENT_KEY가 설정되지 않았습니다.');
    }
    console.log('Form Data:', formData);

    const orderId = Math.random().toString(36).slice(2);
    console.log('새로운 주문번호 생성:', orderId);

    await tossPayments.requestPayment('카드', {
      amount: Number(`${price}`),
      orderId,
      orderName: `${title} ${period}`,
      successUrl: `${window.location.origin}/payment/complete?orderId=${orderId}&amount=${price}`,
      failUrl: `${window.location.origin}/payment-fail`,
    });

    mutation.mutate();

    if (isButtonDisabled) {
      return;
    }
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col items-center gap-[5rem] p-[6.88rem] md:w-auto sm:w-auto sm:gap-[0.4rem] sm:bg-white sm:m-[1.25rem] sm:p-[2rem]">
        <RegisterTitle
          title={title}
          period={`${title !== 'Health' ? '1개월' : period}`}
        />
        <UserInformation formData={formData} setFormData={setFormData} />
        <ExercisePreference formData={formData} setFormData={setFormData} />
        <ExerciseConcern formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex flex-col gap-[0.5rem] items-center">
        <Button
          className="mt-0"
          text={`${title === 'Basic' ? '신청하기' : '결제하기'}`}
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

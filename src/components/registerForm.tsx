'use client';
import Button from '@/components/button';
import ExercisePreference from '@/components/register-sections/exercisePreference';
// import PaymentInformation from '@/components/register-sections/paymentInformation';
import UserInformation from '@/components/register-sections/userInformation';
import ExerciseConcern from '@/components/register-sections/exerciseConcern';
import RegisterTitle from '@/components/registerTitle';
import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import React from 'react';
import { RegisterFormData, ApiResponse } from '@/types/types';
import CalculateStartEndDate from './calculateStartEndDate';
import RefundPolicy from './register-sections/refundPolicy';

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const price: string | null = searchParams.get('price');
  const landing: string | null = searchParams.get('/');
  const error: string | null = searchParams.get('404');
  const period: string | null = searchParams.get('period');

  const [formData, setFormData] = useState<RegisterFormData>({
    user: {
      name: '',
      email: '',
      phone_number: '',
      gender: '남성',
    },
    userSubscription: {
      batchId: null,
      programId: null,
      start_date: '',
      end_date: '',
    },
    program: {
      name: '',
    },
    exercisePreference: {
      exercise_level: 1,
      exercise_goal: [],
      exercise_performance_level: '',
      referral_source: '',
      exercise_concern: '',
    },
  });

  useEffect(() => {
    const title = searchParams.get('title');
    if (title) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        program: {
          ...prevFormData.program,
          name: title,
        },
      }));
    }
  }, [searchParams]);

  const submitForm = async (
    newData: RegisterFormData
  ): Promise<ApiResponse> => {
    const response = await fetch('/api/subscriptions/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      (error as any).response = errorData; // 에러 객체에 응답 데이터를 추가
      throw error;
    }
    console.log('리스폰스 받기 성공', response.json());
    return response.json();
  };

  const mutation = useMutation<ApiResponse, Error, RegisterFormData>({
    mutationFn: (newData) => submitForm(newData),
    onSuccess: (data) => {
      console.log('성공:', data);
      if (landing) {
        window.location.href = landing; // 성공 시 리다이렉션 처리
      }
    },
    onError: (error: any) => {
      let errorResponse;
      try {
        errorResponse = JSON.parse(error.message); // 에러 메시지 파싱
      } catch (parseError) {
        errorResponse = { message: error.message }; // 파싱 실패 시 기본 에러 메시지
      }

      console.error('에러 발생:', errorResponse);
      if (errorResponse.status) {
        console.log('응답 상태 코드:', errorResponse.status);
      }
      if (errorResponse.message) {
        console.log('응답 데이터:', errorResponse.message);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Array.isArray(formData.exercisePreference.exercise_goal)) {
      console.error(
        'exercise_performance_level value:',
        formData.exercisePreference.exercise_performance_level
      );
      // console.error(
      //   'exercise_goal value:',
      //   formData.exercisePreference.exercise_goal
      // );
      return;
    }

    const updatedFormData = {
      ...formData,
      exercisePreference: {
        ...formData.exercisePreference,
        exercise_goal: formData.exercisePreference.exercise_goal.join(','),
      },
    };

    console.log('Updated Form Data:', updatedFormData);
    console.log(typeof updatedFormData.exercisePreference.exercise_goal);
    mutation.mutate(updatedFormData);
  };

  return (
    <form
      className="flex flex-col items-center gap-[5rem] p-[6.88rem] md:w-auto sm:w-auto sm:gap-[0.4rem] sm:bg-white sm:m-[1.25rem]"
      onSubmit={handleSubmit}
      noValidate
    >
      <RegisterTitle title={formData.program.name} />
      <UserInformation formData={formData} setFormData={setFormData} />
      <ExercisePreference formData={formData} setFormData={setFormData} />
      <ExerciseConcern formData={formData} setFormData={setFormData} />
      <div className="text-gray-9 text-1-500 flex flex-col items-center gap-[0.6rem]">
        <Button
          className="mt-0"
          text={`${price}원 결제하기`}
          size="lg"
          variant="default"
          type="submit"
        />
        <p className="sm:text-0.75-500 sm:text-center">
          약관 및 주문 내용을 확인했으며, <br className="hidden sm:block" />
          정보 제공등에 동의합니다.
        </p>
        <div className="w-[29rem] mt-0 text-gray-7 sm:w-[20rem] ">
          <RefundPolicy />
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
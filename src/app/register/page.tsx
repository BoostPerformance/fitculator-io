'use client';
import Button from '@/components/button';
import ExercisePreference from '@/components/register-sections/exercisePreference';
import PaymentInformation from '@/components/register-sections/paymentInformation';
import UserInformation from '@/components/register-sections/userInformation';
import ExerciseConcern from '@/components/register-sections/exerciseConcern';
import RegisterTitle from '@/components/registerTitle';
import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import React from 'react';
import { RegisterFormData, ApiResponse } from '@/types/types';

const Register = () => {
  const searchParams = useSearchParams();
  const price: string | null = searchParams.get('price');
  const landing: string | null = searchParams.get('/');
  const error: string | null = searchParams.get('404');

  const [formData, setFormData] = useState<RegisterFormData>({
    userId: 0,
    name: '',
    email: '',
    phone: '',
    gender: '남성',
    programType: '',
    subscription: {
      batchId: null,
      startDate: '2024-09-01',
      endDate: '2024-09-30',
    },
    payment: {
      method: '신용카드',
      amount: price ? parseFloat(price) : 0,
    },
    exerciseLevel: 1,
    exerciseGoal: [],
    referralSource: '지인 소개',
    exerciseConcern: '', // 운동 우려 사항 추가
  });

  const submitForm = async (
    newData: RegisterFormData
  ): Promise<ApiResponse> => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error('Error submitting form');
    }

    return response.json();
  };

  const mutation = useMutation<ApiResponse, Error, RegisterFormData>({
    mutationFn: (newData) => submitForm(newData),
    onSuccess: (data) => {
      console.log('Success:', data);
      landing;
    },
    onError: () => {
      error;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // 폼 데이터를 전송
    mutation.mutate(formData);
  };

  return (
    <form
      className="flex flex-col items-center gap-[5rem] p-[6.88rem]"
      onSubmit={handleSubmit}
    >
      <RegisterTitle />
      <UserInformation formData={formData} setFormData={setFormData} />
      <ExercisePreference formData={formData} setFormData={setFormData} />
      <ExerciseConcern formData={formData} setFormData={setFormData} />
      <PaymentInformation formData={formData} setFormData={setFormData} />
      <div className="text-gray-9 text-1-500 flex flex-col items-center gap-[0.6rem]">
        <Button
          className="mt-0"
          text={`${price}원 결제하기`}
          size="md"
          variant="default"
          type="submit"
        />
        <p>약관 및 주문 내용을 확인했으며, 정보 제공등에 동의합니다.</p>
      </div>
    </form>
  );
};

export default Register;

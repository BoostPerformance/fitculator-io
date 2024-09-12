'use client';
import Button from '@/components/button';
import { useState } from 'react';
import React from 'react';
import { RegisterFormData, ApiResponse } from '@/types/types';
import RefundPolicy from './refundPolicy';
import UserInformation from './register-sections/userInformation';
import ExercisePreference from './register-sections/exercisePreference';
import ExerciseConcern from './register-sections/exerciseConcern';

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    user: {
      name: '',
      email: '',
      phone_number: '',
    },
    exercisePreferences: {
      exercise_level: 1,
      exercise_goal: '',
      exercise_performance_level: '',
      exercise_concern: '',
      referral_source: '',
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
      return responseData;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-[5rem] p-[6.88rem] md:w-auto sm:w-auto sm:gap-[0.4rem] sm:bg-white sm:m-[1.25rem]"
      onSubmit={handleSubmit}
      noValidate
    >
      <UserInformation formData={formData} setFormData={setFormData} />
      <ExercisePreference formData={formData} setFormData={setFormData} />
      <ExerciseConcern formData={formData} setFormData={setFormData} />
      <Button
        className="mt-0"
        text={`결제하기`}
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
    </form>
  );
};

export default RegisterForm;

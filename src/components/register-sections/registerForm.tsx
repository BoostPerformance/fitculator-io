'use client';
import Button from '@/components/button';
import { useState, useEffect } from 'react';
import React from 'react';
import { RegisterFormData } from '@/types/types';
import RefundPolicy from '../refundPolicy';
import ExercisePreference from './exercisePreference';
import ExerciseConcern from './exerciseConcern';
import RegisterTitle from './registerTitle';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import NewUserInformation from './newUserInformation';

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const period: string | null = searchParams.get('period');
  const router = useRouter();
  const title = searchParams.get('title');
  const priceParam = searchParams.get('price');
  const price = priceParam ? Number(priceParam.replace(/,/g, '')) : 0;
  const [formData, setFormData] = useState<RegisterFormData>({
    users: {
      name: '',
      birthday: '',
      email: '',
      phone_number: '',
      gender: null,
      start_date: '',
      os: '',
    },
    exercise_preferences: {
      exercise_level: 1,
      exercise_goal: '',
      exercise_concern: '',
      referral_source: '',
      wearable_device: '',
    },
    programs: {
      name: `${title}`,
    },
    payment_info: {
      amount: 0,
      payment_method: '',
      payment_key: '',
      order_id: '',
      order_name: `${title} ${period}`,
      status: '',
      card_type: '',
      owner_type: '',
      payment_date: '',
      currency: 'KRW',
      approve_no: null,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const mutation = useMutation({
    mutationFn: async (formData: RegisterFormData) => {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('폼 제출에 실패했습니다.');
      }

      const responseData = response.json();
      //console.log('responseData:', responseData);

      return responseData;
    },
    onSuccess: (data) => {
      //   console.log('성공적으로 전송되었습니다', data);
      setIsLoading(false);
      router.push('/payment-success');
      return;
    },
    onError: (error) => {
      console.error('폼 제출 중 에러 발생:', error);
      setIsLoading(false);
      router.push('/payment-fail');
    },
  });

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return emailRegex.test(email);
  };

  const isPhoneNumberValid = (phone_number: string) => {
    const phoneRegex = /^010[0-9]{8}$/;
    return phoneRegex.test(phone_number);
  };

  const isBdayValid = (birthday: any) => {
    const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
    return birthdayRegex.test(birthday);
  };

  useEffect(() => {
    const { name, gender, email, phone_number, birthday, start_date } =
      formData.users;
    const { exercise_goal, exercise_level, referral_source, wearable_device } =
      formData.exercise_preferences;

    const isFormValid =
      name?.trim() !== '' &&
      gender?.trim() !== '' &&
      email?.trim() !== '' &&
      isEmailValid(email) &&
      phone_number?.trim() !== '' &&
      isPhoneNumberValid(phone_number) &&
      birthday?.trim() !== '' &&
      (title === 'Basic' ? true : start_date?.trim() !== '') &&
      isBdayValid(birthday) &&
      wearable_device?.trim() !== '' &&
      exercise_goal?.trim() !== '' &&
      exercise_level != null &&
      referral_source?.trim() !== '';

    //console.log(isFormValid);

    setIsButtonDisabled(!isFormValid);
  }, [formData, title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isButtonDisabled) {
      return;
    }

    if (title === 'Basic') {
      setIsLoading(true);
      mutation.mutate(formData);
    } else {
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'no key'
      );

      // console.log('Form Data:', formData);

      const orderId = Math.random().toString(36).slice(2);

      localStorage.setItem('formData', JSON.stringify(formData));

      // console.log('새로운 주문번호 생성:', orderId);
      //console.log('Form data saved:', JSON.stringify(formData));

      await tossPayments.requestPayment('카드', {
        amount: Number(`${price}`),
        orderId,
        orderName: `${title} ${period}`,
        successUrl: `${window.location.origin}/payment/complete`,
        failUrl: `${window.location.origin}/payment-fail`,
      });
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
          <Image
            src="/images/logo-2.png"
            alt="로딩중 로고"
            width={100}
            height={100}
            className="animate-spin"
          />
        </div>
      )}
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col items-center gap-[5rem] p-[6.88rem] md:w-auto sm:w-auto sm:gap-[0.4rem] sm:bg-white sm:m-[1.25rem] sm:p-[2rem]">
          <RegisterTitle
            title={title}
            period={title === 'Basic' ? '' : '1개월'}
          />
          <NewUserInformation formData={formData} setFormData={setFormData} />
          <ExercisePreference formData={formData} setFormData={setFormData} />
          <ExerciseConcern formData={formData} setFormData={setFormData} />
          {/*  <UserInformation formData={formData} setFormData={setFormData} />
           */}
        </div>
        <div className="flex flex-col gap-[0.5rem] items-center">
          {title === 'Basic' && (
            <div className="sm:text-0.75-500 sm:text-center  text-gray-7 ">
              Basic 플랜은 신청하신 날부터 사용 가능합니다.
            </div>
          )}
          <Button
            className="mt-0"
            text={`${title === 'Basic' ? '신청하기' : '결제하기'}`}
            size="lg"
            variant="default"
            type="submit"
            disabled={isButtonDisabled}
          />
          {isButtonDisabled ? (
            <div className="text-red">필수 항목을 입력해 주세요.</div>
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
    </div>
  );
};

export default RegisterForm;

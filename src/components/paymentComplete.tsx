'use client';
import Button from '@/components/button';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/components/loading';
import { useMutation } from '@tanstack/react-query';

export default function PaymentComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData) => {
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
      // 결제 완료 후 이동 처리
      router.push('/payment-success');
    },
    onError: (error) => {
      console.error('폼 제출 중 에러 발생:', error);
      // 결제 실패 시 처리
      router.push('/payment-fail');
    },
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (!savedFormData) {
      console.error('신청 폼 데이터가 없습니다.');
      return;
    }

    if (isConfirmed) return;

    const formData = JSON.parse(savedFormData);
    console.log('폼 데이터:', formData);
    // console.log('Form data loaded:', savedFormData);

    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };

    // 1. 결제 성공 확인 함수 호출
    function confirm() {
      fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            // 결제 실패 시, 실패 페이지로 이동
            router.push(
              `/payment-fail?message=${json.message}&code=${json.code}`
            );
            return;
          }
          setResponseData(json); // 결제 성공 응답 저장
          setIsConfirmed(true);

          console.log('requestData:', requestData);
          // 2. 신청 폼 데이터 가져오기 및 결제 정보와 함께 mutation 호출

          mutation.mutate({
            ...formData, // 신청 폼 데이터
            paymentInfo: {
              amount: requestData.amount,
              order_id: requestData.orderId,
              payment_key: requestData.paymentKey,
              cardType: json.card?.cardType || '카드 타입', // 결제 응답에서 받아옴
              ownerType: json.card?.ownerType || '개인', // 결제 응답에서 받아옴
              currency: json.currency || 'undefined', // 고정된 값 또는 응답에서 받아옴
            },
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          router.push(`/payment-fail?message=Unknown error`);
        });
    }

    confirm(); // 1. confirm 함수 호출
  }, [searchParams, router, mutation, isConfirmed]);

  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    ></Suspense>
  );
}

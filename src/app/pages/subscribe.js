// pages/subscribe.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SubscribePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userId: '', // 실제로는 인증된 사용자의 ID를 사용해야 합니다
    programType: '',
    personalInfo: { name: '', email: '', phoneNumber: '' },
    exercisePreference: {
      exerciseType: '',
      exerciseLevel: 1,
      exerciseGoal: '',
    },
    subscription: { batchId: '', startDate: '', endDate: '' },
    payment: { method: '', amount: 0 },
  });

  const handleChange = (e) => {
    // 폼 데이터 업데이트 로직
    // ...
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Subscription created successfully!');
        router.push('/dashboard'); // 성공 후 대시보드로 리디렉션
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Subscribe</button>
    </form>
  );
}

import RegisterForm from '@/components/registerForm';
import React, { Suspense } from 'react';

const Register = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
};

export default Register;

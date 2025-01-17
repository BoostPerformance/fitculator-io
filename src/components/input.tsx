import React from 'react';

interface InputProps {
  name?: string;
  value: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  width?: string; // width를 선택적으로 받음
  type: string;
  readOnly?: any;
  className?: string;
  disabled?: any;
}

export default function Input({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  width = '15rem',
  type,
  readOnly,
  className,
  disabled,
}: InputProps) {
  return (
    <>
      <input
        className={`h-[3rem] pl-[1rem] rounded-[0.375rem] border-gray-9 border-[0.1rem] ${width} sm:w-[16.4rem] ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
      />
    </>
  );
}

import React from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type ButtonVariant = 'default' | 'outline' | 'white';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}
const Button: React.FC<ButtonProps> = ({
  text,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles = 'flex justify-center items-center bg-blue-1';

  const variantStyles: Record<ButtonVariant, string> = {
    default: 'text-white',
    outline: 'border border-blue-2',
    white: 'bg-white text-blue-1',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    xs: 'h-[2.75rem] w-[15.5rem] rounded-[0.375rem] text-1.25-900  sm:w-[8.625rem] sm:h-[1.875rem] sm:py-[1rem] sm:px-[0rem] sm:text-0.875-700',
    sm: 'w-[22rem] h-[3.5rem] sm:w-[17rem] items-center rounded-[0.375rem] text-1.25-900 py-[1.75rem] px-[4.25rem]',
    md: 'w-[29rem]  text-white rounded-[0.75rem] mt-[6.25rem] md:w-[20rem] md:mt-[2rem] md:py-[1rem] md:px-[2rem] sm:w-[17rem] sm:py-[1rem] sm:ml-[2.5rem] text-1.75-900 md:text-1.5-900 sm:text-1.125-700 py-[1.75rem] px-[4.25rem]',
    lg: 'w-[29rem] text-white rounded-[0.75rem] mt-[6.25rem]  text-1.75-900 md:w-[20rem] md:mt-[2rem] md:py-[1rem] md:px-[2rem] sm:w-[18rem] sm:py-[1.25rem] md:text-1.5-900 sm:text-1.125-900 py-[1.75rem] px-[4.25rem]',
  };

  const buttonClassName = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className || ''
  );

  return (
    <button className={buttonClassName} {...props}>
      {text}
    </button>
  );
};

export default Button;

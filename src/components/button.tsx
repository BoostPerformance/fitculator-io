import React from 'react';

function classNames(...classes: string[]){
  return classes.filter(Boolean).join(' ');
}

type ButtonVariant = 'default' | 'outline' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}
const Button: React.FC<ButtonProps> = ({ 
  text, 
  variant = 'default', 
  size='md', 
  className, 
  ...props}) => {


  const baseStyles ='flex justify-center py-[1.75rem] px-[4.25rem]'  

  const variantStyles: Record<ButtonVariant, string> ={
    default: 'text-white',
    outline: 'border border-blue-2',
    white: 'bg-white text-blue-1'
  }

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'w-[25rem] h-[2.5rem] sm:h-[3.5rem] items-center bg-blue-1 rounded-[0.375rem] text-1.25-900',
    md: 'w-[29rem] bg-blue-1 text-white rounded-[0.75rem] mt-[6.25rem] md:w-[20rem] md:mt-[2rem] md:py-[1rem] md:px-[2rem] sm:w-[17rem] sm:py-[1rem] sm:ml-[2rem]  text-1.75-900 md:text-1.5-900 sm:text-1.125-700',
    lg: 'w-[30rem]'
  }
 
  const buttonClassName = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className || ''
    
  );

  return (
    <button
      className={buttonClassName} {...props}>
      {text}
    </button>
  );
};

export default Button;

import React from 'react';
interface ButtonProps {
  children: string;
  version?: 'ver1' | 'ver2';
}
const Button: React.FC<ButtonProps> = ({ children, version = 'ver1' }) => {
  const buttonStyles = {
    ver1: 'flex w-[29rem] py-[1.75rem] px-[4.25rem] justify-center items-center bg-blue-500 text-white rounded ',
    ver2: 'flex w-[29rem] py-[1.75rem] px-[4.25rem] justify-center items-start bg-blue-1 text-white rounded mt-[6.25rem] sm:w-[25rem] sm:py-[1.5rem] sm:px-[3rem] sm:mt-[5rem]',
  };
  const buttonClass = buttonStyles[version];

  return (
    <button className={`${buttonClass} text-1.75-900 sm:text-1.5-900`}>
      {children}
    </button>
  );
};

export default Button;

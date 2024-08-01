import React from 'react';
interface ButtonProps {
  children: string;
  version?: 'ver1' | 'ver2';
}
const Button: React.FC<ButtonProps> = ({ children, version = 'ver1' }) => {
  const buttonStyles = {

    ver1: 'flex w-[22rem] h-[3.5rem] justify-center items-center bg-blue-1 text-white rounded-[0.65rem] text-1.25-900',
    ver2: 'flex w-[29rem] py-[1.75rem] px-[4.25rem] justify-center bg-blue-1 text-white rounded-[0.75rem] mt-[6.25rem] md:w-[20rem] md:mt-[2rem] md:py-[1rem] md:px-[2rem] sm:w-[17rem] sm:py-[1rem] sm:ml-[2rem]  text-1.75-900 md:text-1.5-900 sm:text-1.125-700',

  };
  const buttonClass = buttonStyles[version];

  return (
    <button
      className={`${buttonClass}`}
    >
      {children}
    </button>
  );
};

export default Button;

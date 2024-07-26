import React from 'react';
interface ButtonProps {
  children: string;
  version?: 'ver1' | 'ver2';
}
const Button: React.FC<ButtonProps> = ({ children, version = 'ver1' }) => {
  const buttonStyles = {
    ver1: 'flex w-[29rem] py-[1.75rem] px-[4.25rem] justify-center items-center bg-blue-500 text-white rounded',
    ver2: 'flex w-[29rem] py-[1.75rem] px-[4.25rem] justify-center items-start bg-[#00BBF5] text-white rounded',
  };
  const buttonClass = buttonStyles[version];

  return (
    <button className={`${buttonClass} font-[900] text-[1.75rem]`}>
      {children}
    </button>
  );
};

export default Button;

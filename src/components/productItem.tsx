import Image from 'next/image';
import React, { ReactNode } from 'react';
import Button from './button';

interface ProductItemProps {
  title: string;
  descriptions: (string | ReactNode)[];
  price: string;
  perMonth: string;

}

const ProductItem: React.FC<ProductItemProps> = ({
  title,
  descriptions,
  price,
  perMonth,

}) => {
  return (
    <div className="w-[27rem] min-h-[34rem] border-2 border-gray-3 rounded-[1.25rem] px-[2.44rem] py-[2.5rem] flex flex-col justify-around items-center gap-[1.8rem] shadow-lg sm:w-[25rem] sm:h-[34rem] bg-white hover:bg-blue-1">
      <div className="w-[22rem] h-auto  flex-start flex flex-col justify-center flex-grow gap-[1.88rem]">
        <div>
        <h1 className="text-3.7-900 font-black">{title}</h1>
        </div>
        <div>
          <ul className="flex flex-col gap-[1rem]">
          {descriptions.map((description, index) => (
            <li
              key={index}
              className="flex flex-row gap-2 items-center sm:text-1-500 relative"
            >
              <Image
                src="/images/check-blue.png"
                alt="check"
                width={25}
                height={25}
              />
                <p className="text-1.25-500 sm:text-1-500">{description}</p>
       
            </li>
          ))}
        </ul>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="w-[22rem] border-[0.02rem] border-gray-3 mb-2"></span>
        <div className="flex items-baseline justify-end ">
          <p className="text-2.5-900 text-blue-1">{price}</p>
          <p className="text-1.25-500">/ {perMonth}</p>
        </div>
      </div>

      <Button>신청하기</Button>

    </div>
  );
};

export default ProductItem;

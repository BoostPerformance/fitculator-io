import Image from 'next/image';
import React, { ReactNode } from 'react';

interface ProductItemProps {
  title: string;
  descriptions: (string | string[])[];
  price: string;
  perMonth: string;
  special?: ReactNode;
}

const ProductItem: React.FC<ProductItemProps> = ({
  title,
  descriptions,
  price,
  perMonth,
  special,
}) => {
  return (
    <div className="w-[27rem] h-[37rem] border-2 border-gray-3 rounded-[1.25rem] flex flex-col justify-around items-center gap-1 shadow-lg md:w-[22rem] sm:w-[24rem] ">
      <div className="w-[22rem] flex-start flex flex-col justify-center gap-[1.88rem] md:w-[18rem] sm:w-[16rem]">
        <h1 className="text-3.7-900 md:text-2.5-900 sm:text-2-700">{title}</h1>

        <ul className="flex flex-col gap-[1rem]">
          {descriptions.map((description, index) => (
            <li
              key={index}
              className="flex flex-row gap-2 items-center sm:text-1-500"
            >
              <Image
                src="/images/check-circle.png"
                alt="check"
                width={25}
                height={25}
              />
              {Array.isArray(description) ? (
                <div className="flex flex-col text-left">
                  {description.map((line, idx) => (
                    <p key={idx} className="text-1.25-500">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-1.25-500 sm:text-1-500">{description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      {special && <div> {special}</div>}

      <span className="w-[70%] border-[0.02rem] border-gray-3 mx-auto" />

      <div className="flex items-baseline  ml-[10rem] md:ml-[8rem] sm:ml-[4rem]">
        <p className="text-2.5-700 sm:text-2-500">{price}</p>
        <p className="text-1.25-500 sm:text-1-500">/ {perMonth}</p>
      </div>
    </div>
  );
};

export default ProductItem;

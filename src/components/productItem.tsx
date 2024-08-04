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
    <div className="w-[27rem] h-[37rem] border-2 border-gray-3 rounded-[1.25rem] flex flex-col justify-around items-center gap-1 shadow-lg sm:w-[25rem] sm:h-[34rem]">
      <div className="w-[22rem] flex-start flex flex-col justify-center gap-2">
        <h1 className="text-3.7-900">{title}</h1>

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
      <div className="flex flex-col mt-4 ml-[10rem]">
        <span className="w-full border-[0.02rem] border-gray-3 mb-2"></span>
        <div className="flex items-baseline">
          <p className="text-2.5-700">{price}</p>
          <p className="text-1.25-500">/ {perMonth}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

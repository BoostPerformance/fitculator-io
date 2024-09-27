import Image from 'next/image';
import React, { ReactNode } from 'react';
import Button from './button';
import Link from 'next/link';

interface ProductItemProps {
  title: string;
  descriptions: (string | ReactNode)[];
  price: number;
  perMonth?: string;
  pro?: boolean | ReactNode;
  health?: boolean | ReactNode;
  selectedPeriod: string;
  targetCustomer?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  title,
  descriptions,
  price,
  perMonth,
  pro,
  health,
  targetCustomer,
  selectedPeriod,
}) => {
  const calcPrice = selectedPeriod === '3개월' ? 360000 : price;
  const buttonVariant = pro ? 'white' : 'default';
  const priceString = calcPrice.toLocaleString();

  return (
    <div
      className={`min-h-auto md:w-[40%] sm:w-full border-2 border-gray-3 rounded-[1.25rem] px-[2.44rem] md:px-[0.3rem] py-[2.5rem] sm:pt-[1.19rem] sm:pb-[1.5rem] sm:px-[1.38rem] sm:gap-[1rem] flex flex-col justify-around items-center gap-[1.8rem] shadow-lg bg-white ${
        pro ? 'from-blue-2 bg-gradient-to-tl to-blue-1 from-17% text-white' : ''
      }`}
    >
      <div className="w-[22rem] md:w-[90%] sm:w-[17rem] h-auto flex flex-col justify-start flex-grow sm:grow-0 gap-[1.88rem]">
        <div>
          <h1 className="text-3.7-900 md:text-1.5-900 sm:text-1.5-900">
            {title}
          </h1>
        </div>

        <div>
          <ul className="flex flex-col gap-[1rem]">
            {descriptions.map((description, index) => (
              <li
                key={index}
                className="flex flex-row gap-2 items-start sm:text-1-500 relative"
              >
                <div className="relative w-[1.125rem] h-[1.125rem] top-[0.2rem]">
                  {pro ? (
                    <Image
                      src="/svg/checkbox-white.svg"
                      alt="check"
                      layout="fill"
                    />
                  ) : (
                    <Image
                      src="/svg/checkbox-blue.svg"
                      alt="check"
                      layout="fill"
                    />
                  )}
                </div>
                <div
                  className={`text-1.25-500 md:text-1-500 sm:text-1-500 ${
                    pro ? '' : 'text-gray-1'
                  } `}
                >
                  {description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {(pro || health) && (
        <div
          className={`md:px-[1rem] pt-[2rem] ${
            pro ? `text-white` : `text-gray-1`
          }`}
        >
          <h1 className="text-1.125-700 md:text-0.875-700 sm:text-0.875-700">
            추천대상:
          </h1>
          <span className="text-1.125-500 md:text-0.875-500 sm:text-0.875-500">
            {targetCustomer}
          </span>
        </div>
      )}
      <div className="flex flex-col ">
        <span className="w-[22rem] md:w-[12rem] border-[0.02rem] border-gray-3 mb-2 sm:w-[17rem]"></span>
        <div className="flex items-baseline justify-end md:w-[100%]">
          <p
            className={`text-2.5-900 md:text-1.5-900 sm:text-1.75-900 ${
              pro ? 'text-white' : 'text-blue-1'
            }`}
          >
            {pro ? '70,000 원' : health ? `${priceString} 원` : 'Free'}
          </p>
          <p className="text-1.25-500 ">
            {pro || health ? `/ ${perMonth}` : ''}
          </p>
        </div>
      </div>

      <Link
        href={{
          pathname: './register',
          query: {
            title: title,
            period: selectedPeriod,
            price: priceString,
            pro: pro ? true : false,
          },
        }}
      >
        <Button text="신청하기" variant={buttonVariant} size="sm" />
      </Link>
    </div>
  );
};
export default ProductItem;

import Image from 'next/image';
import React, { ReactNode } from 'react';
import Button from './button';

interface ProductItemProps {
  title: string;
  descriptions: (string | ReactNode)[];
  price: number;
  perMonth: string;
  pro?: boolean | ReactNode;
  selectedPeriod:string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  title,
  descriptions,
  price,
  perMonth,
  pro,
  selectedPeriod
}) => {

  const calcPrice = selectedPeriod === '3개월' ? price * 3 : price;
  const buttonVariant = pro ? 'white' : 'default';

  return (
    <div className={`w-[27rem] min-h-[34rem] sm:w-auto sm:min-h-auto border-2 border-gray-3 rounded-[1.25rem] px-[2.44rem] py-[2.5rem] sm:pt-[1.38rem] sm:pb-[1.5rem] flex flex-col justify-around items-center gap-[1.8rem] shadow-lg bg-white ${pro ? 'from-blue-2 bg-gradient-to-tl to-blue-1 from-17% text-white' : ''}`}>

      <div className="w-[22rem] h-auto flex flex-col justify-start flex-grow gap-[1.88rem]">
        <div>
          <h1 className="text-3.7-900 sm:text-1.7-900">{title}</h1>
        </div>


        <div >
          <ul className="flex flex-col gap-[1rem]">
          {descriptions.map((description, index) => (
            <li
              key={index}
              className="flex flex-row gap-2 items-center sm:text-1-500 relative"
            >
              <div className="relative w-[1.125rem] h-[1.125rem]">
              { pro ? <Image
                src="/svg/checkbox-white.svg"
                alt="check"
                layout='fill'
              /> :
              <Image src="/svg/checkbox-blue.svg"
                alt="check"
                layout='fill'
          
              />}
     
              </div>
                <div className="text-1.25-500 sm:text-1-500">{description}</div>
            </li>
          ))}
        </ul>
        </div>
      </div>
      <div className="flex flex-col ">
        <span className="w-[22rem] border-[0.02rem] border-gray-3 mb-2 sm:w-[20rem]"></span>
        <div className="flex items-baseline justify-end">
          <p className={`text-2.5-900 sm:text-1.75-900 ${pro? 'text-white' :'text-blue-1' }`}>{calcPrice.toLocaleString()} 원</p>
          <p className="text-1.25-500">/ {perMonth}</p>
        </div>
      </div>

      <Button text='신청하기' variant={buttonVariant} size='sm'/>

    </div>
  );
};

export default ProductItem;

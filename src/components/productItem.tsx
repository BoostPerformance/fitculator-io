import Image from 'next/image';
import React from 'react';

interface ProductItemProps {
  title: string;
  description: string;
  price: string;
  perMonth: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  title,
  description,
  price,
  perMonth,
}) => {
  return (
    <>
      <h1>{title}</h1>
      <p>
        <Image
          src="/images/check-circle.png"
          alt="logo"
          width={10}
          height={10}
        />{' '}
        {description}
      </p>
      <span />
      <p>{price}</p>
      <p>{perMonth}</p>
    </>
  );
};

export default ProductItem;

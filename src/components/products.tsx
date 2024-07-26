import ProductItem from './productItem';
import Image from 'next/image';
const Product = () => {
  return (
    <>
      <Image src="/images/logo-2.png" alt="logo" width={10} height={10} />
      <h1>4주 비대면 운동관리 프로젝트 핏큘레이터 신청하기</h1>
      <div className="flex flex-row h-auto">
        <ProductItem
          title="LITE"
          description="description"
          price="20,000원"
          perMonth="1달"
        />
        <ProductItem
          title="LITE"
          description="description"
          price="20,000원"
          perMonth="1달"
        />
        <ProductItem
          title="LITE"
          description="description"
          price="20,000원"
          perMonth="1달"
        />
      </div>
    </>
  );
};

export default Product;

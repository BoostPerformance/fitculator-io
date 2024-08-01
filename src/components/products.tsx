import ProductItem from './productItem';
import Image from 'next/image';


const Product = () => {
  return (
    <div className="h-auto bg-gray-2 w-full py-[6.25rem] flex flex-col items-center gap-[3rem]">
      <Image src="/images/logo-2.png" alt="logo" width={50} height={50} />
      <h1 className="text-2.5-900 sm:text-1.75-900">
        비대면 운동관리 프로젝트 핏큘레이터 신청하기
      </h1>
      <div className="flex flex-row h-auto gap-[3rem] sm:flex-col ">
        <ProductItem
          title="LITE"
          descriptions={[
            '운동량 계산 및 분석',
            '피로도 관리',
            ['피트니스 특화 챗봇', '(질문답변, 프로그램 피드백 등)'],
            '커뮤니티 활동',
          ]}
          price="20,000원"
          perMonth="1달"
        />
        
        <ProductItem
          title="PRO"
          descriptions={[
            '운동량 계산 및 분석',
            '피로도 관리',
            ['피트니스 특화 챗봇', '• 질문답변, 프로그램 피드백'],
            '커뮤니티 활동',
            ['전담 코치 배정', '• 개별 운동 루틴, 데일리 피드백' ]
          ]}
          price="70,000원"
          perMonth="1달"
          special={
              <span className="rounded-[1.125rem] py-[0.25rem] px-[0.625rem] border-[0.1rem] border-blue-1 text-blue-1 bg-blue text-0.875-700">
               인기
              </span>
          }
        />

    
      </div>
    </div>
  );
};

export default Product;

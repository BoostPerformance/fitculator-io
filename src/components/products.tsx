import ProductItem from './productItem';
import Image from 'next/image';
const Product = () => {
  return (
    <div className="h-auto bg-gray-2 w-full py-[6.25rem] flex flex-col items-center gap-[3rem]">
      <Image src="/images/logo-2.png" alt="logo" width={50} height={50} />
      <h1 className="text-2.5-900">
        4주 비대면 운동관리 프로젝트 핏큘레이터 신청하기
      </h1>
      <div className="flex flex-row h-auto gap-[3rem]">
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
          title="LITE"
          descriptions={[
            '운동량 계산 및 분석',
            '피로도 관리',
            ['피트니스 특화 챗봇', '(질문답변, 프로그램 피드백 등)'],
            '커뮤니티 활동',
          ]}
          price="45,000원"
          perMonth="3달"
        />
        <ProductItem
          title="PRO"
          descriptions={[
            '운동량 계산 및 분석',
            '피로도 관리',
            ['피트니스 특화 챗봇', '(질문답변, 프로그램 피드백 등)'],
            '커뮤니티 활동',
            ['전담 코치 배정 ', '(개별 운동 루틴 제공, 데일리 피드백 등)'],
          ]}
          price="70,000원"
          perMonth="1달"
          special={
            <>
              <div className="rounded-[0.625rem] border-[0.4rem] border-blue-1 px-[1.375rem] py-[0.8rem] bg-blue">
                <h1 className="text-1.5-700">+ 전담 코치 배정</h1>
                <h2 className="text-1.25-500">
                  (개별 운동 루틴 제공, 데일리 피드백 등)
                </h2>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Product;

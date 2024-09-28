import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="/images/logo-2.png"
        alt="로딩중 로고"
        width={100}
        height={100}
        className="animate-spin"
      />
    </div>
  );
}

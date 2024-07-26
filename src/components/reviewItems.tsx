import Image from 'next/image';

export default function ReviewItems() {
  return (
    <>
      <div>
        <Image
          src="/svg/quotation-mark.svg"
          width={30}
          height={10}
          alt="quotation mark"
        />
        <div></div>
        <h1>title</h1>
        <p>contents</p>
        <p>author</p>
      </div>
    </>
  );
}

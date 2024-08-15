import Link from 'next/link';
import Image from 'next/image';

export default function SnsIcons() {
  return (
    <div className="flex gap-[0.94rem] sm:mt-[1.2rem]">
      <Link href="mailto:info@fitculator.io">
        <Image
          className="sm:size-[1rem]"
          src="/svg/email.svg"
          alt="email"
          width={24}
          height={10}
        />
      </Link>
      <Link href="https://www.threads.net/@fitculator_official">
        <Image
          className="sm:size-[1rem]"
          src="/svg/threads-logo.svg"
          alt="threads-logo"
          width={24}
          height={10}
        />
      </Link>
      <Link href="https://instagram.com/fitculator_official/">
        <Image
          className="sm:size-[1rem]"
          src="/svg/instagram.svg"
          alt="instagram-logo"
          width={24}
          height={10}
        />
      </Link>
    </div>
  );
}

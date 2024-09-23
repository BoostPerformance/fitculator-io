import Link from 'next/link';
import Image from 'next/image';

const NavLogo = () => {
  return (
    <Link className="p-2 sm:pl-0" href="./">
      <Image
        className="w-[15rem] sm:w-[7.125rem] sm:h-[1.625rem]"
        src="/images/logo.png"
        alt="main "
        width={1000}
        height={1000}
      />
    </Link>
  );
};

export default NavLogo;

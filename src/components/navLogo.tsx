import Link from 'next/link';
import Image from 'next/image';

const NavLogo = () => {
  return (
    <Link className="p-2 sm:pl-0" href="./">
      <Image
        className="sm:w-[16rem] sm:h-[3.7rem]"
        src="/images/logo.png"
        alt="main "
        width={174}
        height={40}
      />
    </Link>
  );
};

export default NavLogo;

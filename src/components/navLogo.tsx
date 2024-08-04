import Link from 'next/link';
import Image from 'next/image';

const NavLogo = () => {
  return (
    <Link className="p-2" href="./">
      <Image
        className="sm:w-[16rem]"
        src="/images/logo.png"
        alt="main "
        width={174}
        height={40}
      />
    </Link>
  );
};

export default NavLogo;

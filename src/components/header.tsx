import Link from 'next/link';
import Nav from './nav';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex place-content-around items-center">
      <Link className="p-2" href='./'>
        <Image
          className="sm:w-[7rem]"
          src="/images/logo.png"
          alt="main "
          width={174}
          height={40}
        />
      </Link>

      <Nav />
    </header>
  );
};

export default Header;

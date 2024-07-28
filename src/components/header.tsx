import Nav from './nav';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex place-content-around items-center">
      <div className="p-2">
        <Image
          className="sm:w-[7rem]"
          src="/images/logo.png"
          alt="main "
          width={174}
          height={40}
        />
      </div>

      <Nav />
    </header>
  );
};

export default Header;

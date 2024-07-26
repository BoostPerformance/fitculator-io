import Nav from './nav';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex place-content-around align-middle">
      <div className="p-2">
        <Image src="/images/logo.png" alt="main " width={174} height={40} />
      </div>

      <Nav />
    </header>
  );
};

export default Header;

import Button from './button';
import NavLogo from './navLogo';
import NavMenu from './navMenu';
import React from 'react';
import Link from 'next/link';

interface NavProps {
  navMenu?: boolean;
}

const Nav: React.FC<NavProps> = ({ navMenu = false }) => {
  return (
    <nav
      className={`w-auto flex text-gray-1 place-content-around items-center py-[0.88rem] sticky top-0 bg-gray-2 sm:flex-row sm:gap-[4rem] ${
        navMenu ? ' sm:items-start sm:gap-[1.62rem] sm:flex-col' : ''
      }`}
    >
      <NavLogo />
      {navMenu ? (
        <NavMenu />
      ) : (
        <Link href="/#product-section">
          <Button text="핏큘레이터 신청하기" size="xs" variant="default" />
        </Link>
      )}
    </nav>
  );
};

export default Nav;

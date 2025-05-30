import Button from './button';
import NavLogo from './navLogo';
import NavMenu from './navMenu';
import React from 'react';
import Link from 'next/link';

interface NavProps {
  navMenu?: boolean;
  smWidth?: string;
}

const Nav: React.FC<NavProps> = ({ navMenu = false, smWidth = '' }) => {
  return (
    <nav
      className={`w-auto px-[2.2rem] flex text-gray-1 place-content-around items-center py-[0.88rem] sticky top-0 bg-gray-2 sm:flex-row sm:gap-[2rem] sm:px-[1rem] z-50 ${
        navMenu
          ? ' gap-[7rem] md:gap-[2rem] sm:items-start sm:gap-[1.62rem] sm:flex-col '
          : ''
      }`}
    >
      <NavLogo smWidth={smWidth} />
      {navMenu ? (
        <NavMenu />
      ) : (
        <Link href="/#product-section">
          <Button text="시작하기" size="xs" variant="default" />
        </Link>
      )}
    </nav>
  );
};

export default Nav;

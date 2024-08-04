import Link from 'next/link';
import Button from './button';
import Image from 'next/image';
import NavLogo from './navLogo';
import NavMenu from './navMenu';
import React from 'react';

interface NavProps {
  navMenu?: boolean
}

const Nav: React.FC<NavProps> = ({navMenu = false}) => {
  return (
    <nav className="flex place-content-around items-center py-[0.88rem] sticky top-0 z-50 bg-gray-2 sm:flex-col">
      <NavLogo/>
      {navMenu ? <NavMenu/ > : <Button version="ver1">핏큘레이터 신청하기</Button> }
    </nav>
  );
};

export default Nav;

import Link from 'next/link';

const NavMenu = () => {
  return (
    <div className="flex gap-[4rem] p-[0.6rem] text-1.125-700 sm:text-1.125-700 sm:gap-3 sm:p-0">
      <Link href="https://airtable.com/apprBZkCTk4gpMmSW/pagWPcKsiuiwaS8zs/form">
        CONTACT US
      </Link>

      <Link href="/team">TEAM</Link>

      <Link href="https://airtable.com/apprBZkCTk4gpMmSW/pagWPcKsiuiwaS8zs/form">
        FAQ
      </Link>

      <Link href="https://airtable.com/apprBZkCTk4gpMmSW/pagWPcKsiuiwaS8zs/form">
        개인정보 처리방침
      </Link>
    </div>
  );
};

export default NavMenu;

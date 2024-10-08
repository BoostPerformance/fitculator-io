import Link from 'next/link';

const NavMenu = () => {
  return (
    <div className="flex justify-end gap-[2rem] p-[0.6rem] text-1.125-700 md:text-1-700 sm:gap-3 sm:p-0 sm:flex-col sm:w-auto w-[60rem] ">
      <Link href="https://airtable.com/apprBZkCTk4gpMmSW/pagWPcKsiuiwaS8zs/form">
        CONTACT US
      </Link>

      <Link href="https://fitculator.notion.site/Team-Fitculator-e403f49b2528426fb2447835567eadd0">
        TEAM
      </Link>

      <Link href="https://airtable.com/apprBZkCTk4gpMmSW/pagWPcKsiuiwaS8zs/form">
        FAQ
      </Link>

      <Link href="/privacy-policy">개인정보처리방침</Link>
    </div>
  );
};

export default NavMenu;

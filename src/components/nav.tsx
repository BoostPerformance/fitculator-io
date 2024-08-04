import Link from 'next/link';

const Nav = () => {
  return (
    <div className="flex gap-[4rem] p-[0.6rem] text-1.125-700 sm:text-0.7-700 sm:gap-3">
      <div>
        <Link href="/team">
          <h3>TEAM</h3>
        </Link>
      </div>
      <div>
        <Link href="https://airtable.com/apprBZkCTk4gpMmSW/pagWPcKsiuiwaS8zs/form">
          <h3>FAQ</h3>
        </Link>
      </div>
      <div>
        <Link href="https://airtable.com/apprBZkCTk4gpMmSW/pagWPcKsiuiwaS8zs/form">
          <h3>CONTACT US</h3>
        </Link>
      </div>
    </div>
  );
};

export default Nav;

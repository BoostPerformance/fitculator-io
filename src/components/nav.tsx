import Link from 'next/link';

const Nav = () => {
  return (
    <div className="flex gap-[4rem] p-[0.6rem] text-[1.25rem] font-[700] ">
      <div>
        <Link href="/team">
          <h3>TEAM</h3>
        </Link>
      </div>
      <div>
        <Link href="/faq">
          <h3>FAQ</h3>
        </Link>
      </div>
      <div>
        <Link href="/contact-us">
          <h3>CONTACT US</h3>
        </Link>
      </div>
    </div>
  );
};

export default Nav;

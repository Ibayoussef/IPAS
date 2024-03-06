
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ data }) => {

  const { logo, phone, email, links } = data;

  return (
    <div className="w-full border-b border-secondary">
      <nav className="container relative flex flex-wrap items-center justify-between mx-auto lg:justify-between xl:px-0">
        <div className="flex items-center justify-between w-full bg-primary lg:w-auto">
          <Link href="/">
            <Image src={logo?.filename} width={100} height={100} alt="logo" />
          </Link>
        </div>
        <div className='flex flex-row items-center gap-8'>
          {links?.thead?.map((link) => <p className='text-xs font-medium uppercase cursor-pointer text-secondary hover:underline underline-offset-1' key={link?.value}>{link?.value}</p>)}
        </div>
        <div className="hidden lg:flex nav__item">

          <Link className="p-6 font-semibold underline uppercase text-primary bg-secondary " href="/en">En</Link>
          <Link
            href="#contact"
            className="p-6  text-primary underline font-semibold bg-secondary border-[#121B2466] border-x"
          >
            {email}
          </Link>
          <Link
            href="#contact"
            className="p-6 font-semibold underline text-primary bg-secondary "
          >
            {phone}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
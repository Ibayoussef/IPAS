"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ data, lang }) => {
  const [open, setOpen] = useState(false)
  const { logo, phone, email, links } = data;

  return (
    <div className="w-full border-b border-secondary">
      <nav className="relative flex flex-wrap items-center justify-between w-full lg:justify-between">
        <div className="flex items-center justify-between object-contain h-12 ml-20 w-fit bg-primary lg:w-auto">
          <Link className='object-contain w-full h-full' href="/">
            <Image className='object-contain w-full h-full' src={logo?.filename} width={100} height={100} alt="logo" />
          </Link>
        </div>
        <div className='flex flex-row items-center gap-4 mr-20 lg:hidden'>
          <div className="relative flex flex-row items-center gap-2 p-6 cursor-pointer " onClick={() => setOpen(prev => !prev)}>
            <p className='font-semibold underline uppercase text-secondary '>{lang}</p>
            <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className='fill-secondary' d="M2.97 3.93949L3.3942 4.36369L6.7884 0.969494L5.94 0.121094L3.3942 2.66629L0.8484 0.121094L0 0.969494L2.97 3.93949Z" fill="#121B24" />
            </svg>
            {open && <div className='absolute z-[9999] left-0 flex flex-col w-full h-fit top-16 '>
              <Link className='py-4 font-medium text-center cursor-pointer text-secondary' href="/ar">AR</Link>
              <Link className='py-4 font-medium text-center cursor-pointer text-secondary' href="/fr">FR</Link>
              <Link className='py-4 font-medium text-center cursor-pointer text-secondary' href="/en">EN</Link>
            </div>}
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 7.00098H20.25C20.6642 7.00098 21 7.33676 21 7.75098C21 8.16519 20.6642 8.50098 20.25 8.50098H3.75C3.33579 8.50098 3 8.16519 3 7.75098C3 7.33676 3.33579 7.00098 3.75 7.00098Z" fill="#AA9A81" />
            <path d="M6.75 11.251H20.25C20.6642 11.251 21 11.5868 21 12.001C21 12.4152 20.6642 12.751 20.25 12.751H6.75C6.33579 12.751 6 12.4152 6 12.001C6 11.5868 6.33579 11.251 6.75 11.251Z" fill="#AA9A81" />
            <path d="M3.75 15.499H20.25C20.6642 15.499 21 15.8348 21 16.249C21 16.6632 20.6642 16.999 20.25 16.999H3.75C3.33579 16.999 3 16.6632 3 16.249C3 15.8348 3.33579 15.499 3.75 15.499Z" fill="#AA9A81" />
          </svg>

        </div>
        <div className='flex-row items-center hidden gap-8 lg:flex'>
          {links?.thead?.map((link) => <Link href={`#${link.value}`} key={link?.value}><p className='text-xs font-medium uppercase cursor-pointer text-secondary hover:underline underline-offset-1' >{link?.value}</p></Link>)}
        </div>
        <div className="hidden lg:flex nav__item">

          <div className="relative flex flex-row items-center gap-2 p-6 cursor-pointer bg-secondary" onClick={() => setOpen(prev => !prev)}>
            <p className='font-semibold underline uppercase text-primary '>{lang}</p>
            <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.97 3.93949L3.3942 4.36369L6.7884 0.969494L5.94 0.121094L3.3942 2.66629L0.8484 0.121094L0 0.969494L2.97 3.93949Z" fill="#121B24" />
            </svg>
            {open && <div className='absolute z-[9999] left-0 flex flex-col w-full h-fit top-16 bg-secondary'>
              <Link className='py-4 font-medium text-center text-black cursor-pointer' href="/ar">AR</Link>
              <Link className='py-4 font-medium text-center text-black cursor-pointer' href="/fr">FR</Link>
              <Link className='py-4 font-medium text-center text-black cursor-pointer' href="/en">EN</Link>
            </div>}
          </div>
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
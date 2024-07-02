import React from 'react'
import Link from "next/link";
import Image from "next/image";
function Footer({ data }) {
    const { logo, links } = data;
    return (
        <nav className="relative flex flex-col flex-wrap justify-between w-full px-20 sm:items-center sm:flex-row gap-9 mt-28 lg:justify-between ">
            <div className="flex items-center justify-between h-12 w-fit bg-primary lg:w-auto">
                <Link className='object-contain w-full h-full' href="/">
                    <Image className='object-contain w-full h-full' src={logo} width={100} height={100} alt="logo" />
                </Link>
            </div>
            <div className='flex flex-col gap-8 sm:items-center sm:flex-row'>
                {links?.map((link) => <Link href={`#${link}`} key={link}><p className='text-xs font-medium uppercase cursor-pointer text-secondary hover:underline underline-offset-1' >{link}</p></Link>)}
            </div>
            <div className='flex flex-col w-full gap-3 mb-7 mt-28'>
                <div className='flex flex-row items-center gap-[6px]'>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                            <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#AA9A81" />
                            <path d="M12.3 11C13.1752 11 14.0146 11.3477 14.6335 11.9665C15.2523 12.5854 15.6 13.4248 15.6 14.3C15.6 15.1752 15.2523 16.0146 14.6335 16.6335C14.0146 17.2523 13.1752 17.6 12.3 17.6C11.4248 17.6 10.5854 17.2523 9.96655 16.6335C9.34768 16.0146 9 15.1752 9 14.3C9 13.4248 9.34768 12.5854 9.96655 11.9665C10.5854 11.3477 11.4248 11 12.3 11ZM17.25 11.55C18.075 11.55 18.625 12.7815 18.625 14.3C18.625 15.8186 18.075 17.05 17.25 17.05C16.425 17.05 15.875 15.8186 15.875 14.3C15.875 12.7815 16.425 11.55 17.25 11.55ZM19.45 11.825C19.659 11.825 19.8416 12.2799 19.934 13.0603L19.9599 13.304L19.9703 13.4332L19.9868 13.7049L19.9923 13.8474L19.9989 14.1449L20 14.3L19.9989 14.4551L19.9923 14.7527L19.9868 14.8957L19.9703 15.1668L19.9593 15.2961L19.9346 15.5397C19.8416 16.3207 19.6596 16.775 19.45 16.775C19.241 16.775 19.0584 16.3201 18.966 15.5397L18.9402 15.2961C18.9364 15.253 18.9329 15.2099 18.9297 15.1668L18.9132 14.8951C18.9111 14.8476 18.9092 14.8001 18.9077 14.7527L18.9011 14.4551V14.1449L18.9077 13.8474L18.9132 13.7043L18.9297 13.4332L18.9407 13.304L18.9655 13.0603C19.0584 12.2793 19.2404 11.825 19.45 11.825Z" fill="#AA9A81" />
                        </g>
                    </svg>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                            <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#AA9A81" />
                            <path d="M11.0986 10.0149C11.0985 10.284 10.9878 10.542 10.7909 10.7321C10.594 10.9223 10.3271 11.029 10.0488 11.0289C9.7705 11.0287 9.50365 10.9217 9.30697 10.7314C9.11028 10.5411 8.99986 10.283 9 10.0139C9.00014 9.74488 9.11083 9.48691 9.30771 9.29676C9.50459 9.10661 9.77155 8.99987 10.0498 9C10.3281 9.00013 10.595 9.10714 10.7917 9.29748C10.9884 9.48782 11.0988 9.7459 11.0986 10.0149ZM11.1301 11.7801H9.03148V18.1304H11.1301V11.7801ZM14.446 11.7801H12.3578V18.1304H14.425V14.798C14.425 12.9416 16.9276 12.7691 16.9276 14.798V18.1304H19V14.1082C19 10.9787 15.2959 11.0953 14.425 12.6322L14.446 11.7801Z" fill="#AA9A81" />
                        </g>
                    </svg>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                            <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#AA9A81" />
                            <path d="M11.0986 10.0149C11.0985 10.284 10.9878 10.542 10.7909 10.7321C10.594 10.9223 10.3271 11.029 10.0488 11.0289C9.7705 11.0287 9.50365 10.9217 9.30697 10.7314C9.11028 10.5411 8.99986 10.283 9 10.0139C9.00014 9.74488 9.11083 9.48691 9.30771 9.29676C9.50459 9.10661 9.77155 8.99987 10.0498 9C10.3281 9.00013 10.595 9.10714 10.7917 9.29748C10.9884 9.48782 11.0988 9.7459 11.0986 10.0149ZM11.1301 11.7801H9.03148V18.1304H11.1301V11.7801ZM14.446 11.7801H12.3578V18.1304H14.425V14.798C14.425 12.9416 16.9276 12.7691 16.9276 14.798V18.1304H19V14.1082C19 10.9787 15.2959 11.0953 14.425 12.6322L14.446 11.7801Z" fill="#AA9A81" />
                        </g>
                    </svg>

                </div>
                <div className='w-full h-px bg-secondary'></div>
                <div className='flex flex-row items-center justify-between'>
                    <p className='text-xs text-secondary'>Copyright © 2006-2024</p>
                    <p className='text-xs underline text-secondary'>Privacy policy - Terms of use</p>
                </div>
            </div>
        </nav>
    )
}

export default Footer
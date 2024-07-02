
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Hero({ data,links }) {
    
    const { bigText, smallText, heroImg, buttonText, description } = data
    const value = links[4]
    return (
        <div className={`relative flex flex-wrap items-end justify-between w-full gap-12 px-16  py-96`}>
            <div className='relative z-50 flex w-[75rem] flex-col gap-5'>
                <p className='text-[0.65rem] font-bold text-secondary'>{smallText}</p>
                <h1 className='text-[8.5rem] font-normal leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>{bigText}</h1>
            </div>
            <div className='relative z-50 flex w-[30rem] flex-col gap-8'>
                <div className='h-[1px] w-32 bg-[#E7E1D8]'></div>
                <p className='text-base font-normal text-[#E7E1D8] '>{description}</p>
                <Link href={`#${value}`} className='text-secondary text-base leading-[4rem]  font-semibold tracking-[-1px] cursor-pointer'>{buttonText} →</Link>
            </div>
            <div className='absolute top-1/2 -translate-y-1/2 e-0 w-3/4 h-[40rem]'>
                <Image className='relative top-0 left-0 object-cover w-full h-full' src={heroImg} width={1000} height={1000} alt='hero-img' />
            </div>
        </div>
    )
}

export default Hero
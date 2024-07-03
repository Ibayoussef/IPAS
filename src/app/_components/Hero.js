"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

function Hero({ data, links }) {
    const { bigText, smallText, heroImg, buttonText, description } = data
    const value = links[4]

    return (
        <div className={`relative flex flex-wrap items-end justify-between w-full gap-12 px-16 py-96`}>
            <div className='relative z-50 flex w-[75rem] flex-col gap-5'>
                <p className='text-[0.65rem] font-bold text-secondary'>{smallText}</p>
                <h1 className='text-[8.5rem] font-normal leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>{bigText}</h1>
            </div>
            <div className='relative z-50 flex w-[30rem] flex-col gap-8'>
                <div className='h-[1px] w-32 bg-[#E7E1D8]'></div>
                <p className='text-base font-normal text-[#E7E1D8]'>{description}</p>
                <motion.div whileHover="hover" initial="rest">
                    <Link href={`#${value}`} className='text-secondary text-base leading-[4rem] font-semibold tracking-[-1px] cursor-pointer inline-flex items-center'>
                        {buttonText}
                        <motion.span
                            className="ml-2"
                            variants={{
                                rest: { x: 0 },
                                hover: { x: 5 }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            →
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
            <div className='absolute top-1/2 -translate-y-1/2 right-0 w-3/4 h-[80%]'>
            <div className='absolute z-50 w-full h-full top-0 right-0 bg-black opacity-50'></div>
                <Image className='relative z-40 top-0 right-0 object-cover w-full h-full' src={heroImg} width={1000} height={1000} alt='hero-img' />
            </div>
        </div>
    )
}

export default Hero
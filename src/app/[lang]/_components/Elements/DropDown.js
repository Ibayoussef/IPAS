"use client"
import React, { useState } from 'react';
import Image from 'next/image'

export const Dropdown = ({ title, description, img }) => {
    const [open, setOpen] = useState(false)
    const splitDescription = (description) => {
        const middleIndex = Math.floor(description.length / 2);
        const firstHalfEndIndex = description.indexOf(' ', middleIndex);
        const firstPart = description.substring(0, firstHalfEndIndex);
        const secondPart = description.substring(firstHalfEndIndex + 1);
        return [firstPart, secondPart];
    };
    const [firstPart, secondPart] = splitDescription(description);
    return <><div onClick={() => setOpen(prev => !prev)} className={`cursor-pointer flex flex-row items-center justify-between ${open ? 'border-b-0' : 'border-b'} first:border-t border-secondary`}>
        <h4 className='text-[4rem] text-secondary leading-[5rem] font-["Scheherazade_New"] uppercase tracking-tighter'>{title}</h4>
        {!open ? <svg width="2rem" height="2.1rem" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.5625 20.625H23.875V0.9375H20.125V20.625H0.4375V24.375H20.125V44.0625H23.875V24.375H43.5625V20.625Z" fill="#AA9A81" />
        </svg>
            : <svg width="2rem" height="5" viewBox="0 0 44 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.5625 0.625H23.875H20.125H0.4375V4.375H20.125H23.875H43.5625V0.625Z" fill="#AA9A81" />
            </svg>
        }
    </div>
        {open && <div className='flex flex-row gap-40 py-8 border-b border-secondary'>
            <div className='w-1/2 h-1/2'>
                <Image src={img} className='w-full h-full' alt={'service img'} width={1000} height={1000} />
            </div>

            <p className='text-black text-base font-normal leading-5 w-[40%]'>
                <div>{firstPart}.</div>
                <br />
                <div>{secondPart}.</div>
            </p>
        </div>}
    </>
}
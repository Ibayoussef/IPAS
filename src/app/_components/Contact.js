"use client"
import React from 'react'
import Image from 'next/image'
import Input from './Elements/Input'
function Contact({ data,links }) {
    const { asset, title, description, sendButton, inputs } = data
    const value = links[4]
    return (
        <div id={value} className='flex flex-row'>
            <div className='flex flex-col w-full gap-8 px-20 py-28'>
                <h1 className='text-[8.5rem] font-normal leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>{title}</h1>
                <div className=' w-[80%] flex flex-col gap-5'>
                    <div className='w-40 h-px bg-secondary'></div>
                    <p className='font-["Montserrat"] text-base text-white'>{description}</p>
                </div>
                <div className='grid w-full grid-cols-1 sm:grid-cols-3 gap-9'>
                    {inputs.map((p, i) => i !== inputs.length - 1 && <Input key={p} label={p} />)}
                </div>
                <Input label={inputs[inputs.length - 1]} />
                <p className='text-secondary mt-16 text-base  font-semibold tracking-[-1px] cursor-pointer'>{sendButton} →</p>
            </div>
            <div>
                <Image className='hidden w-full h-full lg:block' src={asset} alt={'contact img'} width={1000} height={1000} />

            </div>

        </div>
    )
}

export default Contact
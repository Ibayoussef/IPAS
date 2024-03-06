import React from 'react'
import Image from 'next/image'

const Companies = ({ data }) => {
    const { title, description, companylogos } = data
    return (
        <div id='Worked with' className='flex flex-col items-center justify-center w-full h-full px-64 text-center py-28'>
            <div className='h-px w-28 bg-secondary'></div>
            <p className='text-white text-base font-normal leading-5 w-[60%] mt-5'>{description}</p>
            <h4 className='mt-20 uppercase text-[0.65rem] tracking-[0.8rem] text-secondary'>{title}</h4>
            <div className='flex flex-row flex-wrap items-center justify-center gap-40 mt-4'>
                {companylogos.map(p => <Image key={p.filename} className='w-28' src={p.filename} alt='company-img' width={500} height={500} />)}
            </div>
        </div>
    )
}

export default Companies
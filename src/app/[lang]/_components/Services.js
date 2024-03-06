import React from 'react'
import { Dropdown } from './Elements/DropDown'

function Services({ data }) {
    const { Title, description, dropdownContect, dropdownImgs } = data
    return (
        <div className='bg-[#E7E1D8] px-16 py-48 '>
            <div className='flex flex-col gap-8 w-[50%]'>
                <h1 className='text-[8.5rem] font-normal leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>{Title}</h1>
                <div className='w-40 h-px bg-secondary'></div>
                <p className='text-base text-black'>{description}</p>
            </div>

            <div className='mt-12'>
                {dropdownContect?.thead?.map((content, index) => <Dropdown key={content.value}
                    title={content.value}
                    description={dropdownContect?.tbody[0]?.body?.[index]?.value}
                    img={dropdownImgs?.[0]?.filename}
                />)}
            </div>
        </div>
    )
}

export default Services
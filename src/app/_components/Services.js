import React from 'react'
import { Dropdown } from './Elements/DropDown'

function Services({ data,links }) {
    const { Title, description, dropdownContent } = data
    const value = links[0]
   
    return (
        <div id={value} className='bg-[#E7E1D8] px-5 sm:px-16 py-48 '>
            <div className='flex flex-col gap-8 w-[50%]'>
                <h1 className='text-[8.5rem] font-normal leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>{Title}</h1>
                <div className='w-40 h-px bg-secondary'></div>
                <p className='text-base text-black'>{description}</p>
            </div>

            <div className='mt-12'>
                {dropdownContent?.map((content, index) => <Dropdown key={content.title}
                    title={content.title}
                    description={content.description}
                    img={content.img}
                />)}
            </div>
        </div>
    )
}

export default Services
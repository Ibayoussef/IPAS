import React from 'react'

const Pricing = ({ data }) => {
    const { title, description, prices, pricesDescriptions } = data
    return (
        <div className='bg-[#E7E1D8] px-16 py-48 '>
            <div className='flex flex-row items-center justify-between '>
                <h1 className='text-[8.5rem] font-normal leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>{title}</h1>
                <div className=' w-[50%] flex flex-col gap-5'>
                    <div className='w-40 h-px bg-secondary'></div>
                    <p className='font-["Montserrat"] text-base text-black'>{description}</p>
                </div>

            </div>
            <div className='flex flex-row flex-wrap justify-between w-full h-full'>
                {prices.thead.map((price, index) => <div className='px-8 mt-16 border-l w-[25rem] first:border-0 border-[#AA9A8166]' key={price.value}>
                    <h4 className='uppercase text-[0.65rem] tracking-[0.8rem] text-secondary'>{price.value}</h4>
                    <p className='text-[2.5rem] font-normal mt-8 text-secondary font-["Scheherazade_New"] tracking-[px] uppercase'>{prices.tbody[0].body[index].value}</p>
                    <div className='w-full h-px mt-8 bg-[#AA9A8166]' ></div>
                    <p className='mt-8 font-normal text-black'>{pricesDescriptions.tbody[0].body[index].value}</p>
                </div>)}
            </div>
        </div>
    )
}

export default Pricing
import React from 'react'

const Input = ({ label, onChange }) => {
    return (
        <div className='w-full'>
            <p className='text-xs text-white uppercase'>{label}</p>
            <input type="text" className='w-full border-0 border-b border-white bg-transparent outline-none appearance-none text.white p-2' />
        </div>
    )
}

export default Input
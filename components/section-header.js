import React from 'react'

function SectionHeader({children}) {
    return (
        <div className='text-white bg-black mb-4 rounded-lg'>
            <h1 className='text-2xl text-center uppercase'>
            {children}
            </h1>
        </div>
    )
}

export default SectionHeader



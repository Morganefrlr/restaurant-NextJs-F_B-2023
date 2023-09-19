import React from 'react';

const Offer = () => {
    return (
        <div className='flex flex-col w-[50vw] mx-auto h-[25vh] shadow-lg border-[1px] border-green-500 rounded-full justify-center items-center gap-4 my-36'>
            <h1 className='lg:text-2xl text-xl font-bold font-serif text-gray-800'>Get Special Discounts!</h1>
            <p className='lg:text-sm text-xs w-[60%] text-center text-gray-400 '>Input email address and complete your subscription to get our special offer.</p>
            <div className='flex w-[60%] border-[1px] border-gray-100 rounded-full my-2 justify-between items-center h-14 p-1'>
                <input type="text" placeholder='info@example.com' className='flex rounded-full h-full text-xs p-2 w-[70%] focus:outline-none'/>
                <button className='text-sm text-gray-100 bg-green-500 h-full rounded-full w-28 cursor-pointer'>Subscribe</button>
            </div>
        </div>
    );
};

export default Offer;
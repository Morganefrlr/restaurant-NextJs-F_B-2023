import Image from 'next/image';
import React from 'react';

const Start = () => {
    return (
        <div className='flex flex-col w-screen md:flex-row h-[88vh] md:h-[58vh]'>
            <div className='flex-1 flex flex-col gap-6 justify-center items-center md:items-start md:ml-5 lg:ml-20 2xl:ml-40'>
                <div className='flex flex-col text-2xl md:w-full font-serif md:text-6xl items-center md:items-start'>
                    <p className='text-red-600'>The Classic</p>
                    <p className='text-green-500'>Tomato & Cheese</p>
                    <p className='text-yellow-300'>Crunchy Pizza</p>
                </div>
                <div className='w-[75%] text-gray-400 text-xs md:text-base'>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, officia sed officiis quasi debitis deleniti labore quibusdam quod.</span>
                </div>
                <button className='text-gray-100 bg-green-500 md:w-1/4 p-3 rounded-md shadow-md cursor-pointer text-xs md:text-base'>Order Now</button>
            </div>
            <div className='flex-1 flex justify-center'>
                <Image src='/temporary/p3.png' width={300} height={300} alt='' className='object-contain  w-[75%]'/>
            </div>
        </div>
    );
};

export default Start;
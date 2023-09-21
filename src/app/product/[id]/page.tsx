
import DeleteButton from '@/components/DeleteButton';
import Price from '@/components/Price';

import { ProductType } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai";



const getData = async (id:string) =>{
    const res= await fetch(`http://localhost:3000/api/products/${id}`, {
        cache:"no-store"
    })

    if(!res.ok){
      
        throw new Error('Failed!')
    }
    return res.json()
}

const SingleProduct = async ({params} : {params:{id:string}}) => {

    const singleProduct:ProductType = await getData(params.id)
    console.log(singleProduct)

    return (
        <div className='flex md:h-[59vh] flex-col-reverse md:flex-row relative'>
            <div className='md:flex-1 flex text-gray-800 justify-center items-center flex-col'>
                <div className='w-full items-center md:w-[70%] md:items-start flex flex-col gap-8'>
                    <h1 className='text-3xl text-center md:text-5xl md:text-start tracking-wider md:leading-snug font-serif'><strong>Order your</strong> <br />favourite Foods</h1>
                    <p className='text-justify text-sm w-[70%]'>{singleProduct.desc}</p>
                    <Price product={singleProduct}/>
                </div>
            </div>
            <div className='md:flex-1 flex flex-col items-center justify-center my-10 md:mt-0 xl:mt-10' >
            {singleProduct.img && <Image src={singleProduct.img} alt='' width={200} height={200} className='w-[65%] object-cover h-auto xl:w-[60%] 2xl:w-[50%]'/>}
                <div className='text-gray-100 flex bg-yellow-400 w-1/2 rounded-xl p-5 flex-col justify-center items-center gap-4 shadow-xl m-5'>
                    <div className='flex gap-10 w-full justify-center items-center'>
                        <h1 className='text-2xl'>{singleProduct.title}</h1>
                        <div className='flex justify-center items-center gap-1 text-xl'>
                            <AiFillStar />
                            <p className='text-lg'>{5}</p>
                        </div>
                    </div>
                    <div className='flex gap-3 w-fit text-sm justify-center items-center bg-gray-800 p-2 px-4 rounded-full border-gray-100 border-[1px] '>
                        <AiOutlineClockCircle />
                        <p>10-18 mins</p>
                    </div>
                </div>
            </div>
            <DeleteButton id={singleProduct.id}/>
        </div>
    );
};

export default SingleProduct;

/*{singleProduct.img && <Image src={singleProduct.img} alt='' width={200} height={200} className='w-[65%] object-cover h-auto xl:w-[60%] 2xl:w-[50%]'/>}*/



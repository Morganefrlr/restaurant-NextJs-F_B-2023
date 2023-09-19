
import { ProductType } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const getData = async (category:string) =>{
    const res= await fetch(`http://localhost:3000/api/products?cat=${category}`, {
        cache:"no-store"
    })
    if(!res.ok){
        throw new Error('Failed!')
    }
    return res.json()
}


type Props ={
    params:{category: string}
}

const CategoryPage = async ({params} : Props) => {

   const products:ProductType[] = await getData(params.category)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-col-6 text-gray-800 mt-5'>
            {products.map(item =>
            <div className='group'>
                <Link href={`/product/${item.id}`} key={item.id} className='w-[90%] h-[40vh] mx-auto my-6 rounded-xl shadow-2xl p-4 flex flex-col justify-between group-hover:border-2 group-hover:border-yellow-300'>
                    {item.img && 
                <div className='relative h-[60%]'>
                   <Image src={item.img} alt='' fill className='object-contain'/> 
                </div>
                }
                <div className='flex group-hover:flex-col items-center justify-between font-bold'>
                    <h1 className='text-xl uppercase p-2 text-center w-1/2'>{item.title}</h1>
                    <h2 className='group-hover:hidden text-xl'>$ {item.price}</h2>
                    <button className='hidden group-hover:block uppercase bg-red-600 text-gray-100 p-2 rounded mt-2'>Add to Cart</button>
                </div>
                </Link>
            </div>
            
            )}
        </div>
    );
};

export default CategoryPage;
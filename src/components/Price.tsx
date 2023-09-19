'use client'
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { ProductType } from '@/types/types';
import { useCartStore } from '@/utils/store';
import { toast } from 'react-toastify';




const Price = ({product} : {product:ProductType}) => {
    const [total, setTotal]= useState(product.price)
    const [quantity, setQuantity]= useState(1)
    const [selected, setSelected]= useState(0)

    const {addToCart} = useCartStore()


    useEffect(() =>{
        useCartStore.persist.rehydrate()
    },[])

    useEffect(() =>{
        if(product.options?.length){
            setTotal(quantity * product.price + product.options[selected].additionalPrice)
        }
    },[quantity, selected, product])

    const handleCart = () =>{
        addToCart({
            id:product.id,
            title:product.title,
            img: product.img,
            price:total,
            ...(product.options?.length && {optionTitle:product.options[selected].title}),
            quantity:quantity,
        })
        toast.success('The product added to the cart!')
    }

    return (
        <div className='flex flex-col my-10'>
            <div className='flex gap-2 items-center text-2xl md:text-3xl'>
                <h2 className='font-extralight'>Total order:</h2>
                <p className='font-bold'>${total}</p>
            </div>
            <div className='flex gap-2 my-5'>
                {product.options?.length && product.options?.map((item, index) =>
                    <button key={item.title} 
                            className='w-24 p-3 flex justify-center items-center rounded-full border-[1px] border-yellow-400 text-gray-800' 
                            style={{
                                background: selected === index ? 'rgb(250 204 21)' : '',
                                color: selected === index ? 'rgb(243 244 246)' : '',
                                fontWeight: selected === index ? 'bold' : '',
                                boxShadow: selected === index ? '1px 2px 3px gray' : ''

                            }}
                            onClick={() => setSelected(index)}
                    >{item.title}</button>
                )}
            </div>
            <div className='flex gap-8 h-fit items-center'>
                <div className='flex w-36 h-fit p-2 rounded-full justify-around items-center border-[1px] border-yellow-400'>
                    <MdKeyboardArrowDown onClick={() => setQuantity(prev=>(prev>1 ? prev-1 : 1))} className='text-green-500 cursor-pointer'/>
                    <hr className='flex h-6 border-[0.5px]'/>
                    <p className='text-gray-800 text-sm font-bold mx-4'>{quantity}</p>
                    <hr className='flex h-6 border-[0.5px]'/>
                    <MdKeyboardArrowUp onClick={() => setQuantity(prev=>(prev<9 ? prev+1 : 9))} className='text-green-500 cursor-pointer'/>
                </div>
                <div className='w-40 bg-green-500 rounded-full shadow-xl h-12 flex items-center p-1 gap-4 cursor-pointer' onClick={handleCart}>
                    <div className='w-10 h-10 bg-yellow-400 border-[1px] border-gray-100 rounded-full flex justify-center items-center'><FiShoppingCart className='text-gray-100 ' /></div>
                    <p className='text-gray-100'>Buy Now</p>
                </div>
            </div>
            
        </div>
    );
};

export default Price;
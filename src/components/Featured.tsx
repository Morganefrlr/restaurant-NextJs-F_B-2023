'use client'
import * as React from 'react';
import Image from 'next/image';
import Star from './Star';
import { FiArrowLeftCircle, FiArrowRightCircle, FiShoppingCart } from "react-icons/fi";
import Link from 'next/link';
import { ProductType } from '@/types/types';


type Props ={
    products: ProductType[]
}

const Featured = ({products}:Props) => {
     

    

    const [slideNumber, setSlideNumber] = React.useState(0)
    const listRef = React.useRef<any>()
   
    const[startClick, setStartClick] = React.useState([0])


    const handleClick = (direction:string) =>{

        let screenWidth = screen.width
        let distance = 0
        let boxWidth = 0

        setStartClick([...startClick, listRef.current.getBoundingClientRect().x])

        if(screenWidth < 640 ){
            boxWidth = 8
        }
        if(screenWidth > 640 && screenWidth < 1024){
            boxWidth = 7
        }
        if(screenWidth > 1024 && screenWidth < 1280){
            boxWidth = 6
        }
        if(screenWidth > 1280){
            boxWidth = 5
        }
        
        
        if(!startClick[1]){
            distance = listRef.current.getBoundingClientRect().x - listRef.current.getBoundingClientRect().x
        }
        if(startClick[1]){
            distance = listRef.current.getBoundingClientRect().x - startClick[1]
        }


        if(direction === 'left' && slideNumber>0){
            setSlideNumber(slideNumber - 1)
            listRef.current.style.transform = `translateX(${264 + distance}px)`
           }
       if(direction === 'right' && slideNumber < boxWidth){
            setSlideNumber(slideNumber + 1)
            listRef.current.style.transform = `translateX(${-264 + distance}px)`
       }
      
    }
    
    return(
        <div className='flex justify-center items-center gap-2 sm:gap-4 mt-20 sm:mt-10 2xl:mt-16'>
            <FiArrowLeftCircle className="text-3xl text-gray-400 hover:text-green-500 cursor-pointer" onClick={() => handleClick('left')}/>
            <div className='w-[264px] h-[400px] relative flex items-end overflow-hidden  sm:w-[528px] lg:w-[792px] xl:w-[1056px]'>
                    <div className='flex translate-x-0 transition-all duration-500 ease-linear' ref={listRef}>
                        {products.map(item =>
                            <div className='w-56 h-60 m-5 shadow-xl flex  flex-col rounded-3xl snap-start' key={item.id}>
                                <div className='flex-1 relative'>
                                    {item.img && <Image src={item.img} width={100} height={20} alt='' className='absolute bottom-1 right-2 w-[90%]'/>}
                                </div>
                                <div className='flex-1 flex flex-col p-4 justify-evenly gap-3'>
                                    <span className='font-semibold text-gray-800 '>{item.title}</span>
                                    <Star rate={5}/>

                                    <div className='flex justify-between items-center'>
                                        <span className='font-medium text-gray-800 '>${item.price}</span>
                                        <Link href={`/product/${item.id}`} className='w-8 h-8 rounded-full bg-red-600 text-gray-100 text-lg flex justify-center items-center cursor-pointer'>
                                            <FiShoppingCart />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            </div>
            <FiArrowRightCircle className="text-3xl text-gray-400 hover:text-green-500 cursor-pointer" onClick={() => handleClick('right')}/>
       </div>
    );
        
};

export default Featured;

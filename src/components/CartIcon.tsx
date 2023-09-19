'use client'
import { useCartStore } from "@/utils/store";
import { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";

const CartIcon = () => {
    const {totalItems} = useCartStore()
    useEffect(() =>{
        useCartStore.persist.rehydrate()
    },[])
    return (
            <div className="flex gap-3 justify-center items-center cursor-pointer md:relative">
                <FiShoppingCart className="text-lg"/>
                <span className="md:hidden">Cart ({totalItems})</span>
                <span className="max-md:hidden absolute bottom-3 left-3 rounded-full bg-red-600 w-4 h-4 text-center text-gray-100 border-gray-100 border-[1px] text-xs">{totalItems}</span>
            </div>
    );
};

export default CartIcon;
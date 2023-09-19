'use client'

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiPlus } from "react-icons/fi";
import CartIcon from "./CartIcon";

const Menu = () => {
    const [open, setOpen] = useState(false)
    const user = false

    const links = [
        {id: 1, title:"Homepage", url:'/'},
        {id: 2, title:"Menu", url:'/menu'},
        {id: 3, title:"Working Hours", url:'/'},
        {id: 4, title:"Contact", url:'/'},
    ]
    return (
        <div>
            <div className={`w-9 h-9 border-green-500 border-2 rounded-xl flex justify-center items-center ${open ? 'bg-green-500 rounded-br-none rounded-bl-none' : ''}`}>
                {!open ? (<FiMenu className='text-green-500 text-2xl' onClick={() => setOpen(true)}/>) : (<FiPlus className='text-gray-100 text-3xl rotate-45' onClick={() => setOpen(false)}/>)}
            </div>
            {open && 
                <div className="bg-green-500 text-gray-100 text-xl uppercase absolute right-0 h-[88vh] w-[80vw] mr-3 rounded-tl-xl rounded-bl-xl flex flex-col justify-center items-center gap-8 z-10">
                    {links.map(item => 
                        <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
                            {item.title}
                        </Link>
                    )}
                    {!user ? (<Link href={'/login'} onClick={() => setOpen(false)}>Login</Link>) : (<Link href={'/orders'} onClick={() => setOpen(false)}>Orders</Link>)}
                    <Link href="/cart" onClick={() => setOpen(false)}>
                        <CartIcon />
                    </Link>
                </div>
            }
        </div>
    );
};

export default Menu;
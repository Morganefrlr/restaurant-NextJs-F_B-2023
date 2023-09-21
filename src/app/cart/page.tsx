'use client'
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoTrashBinOutline } from "react-icons/io5";

const CartPage = () => {

    const {products, totalItems, totalPrice, removeFromCart} = useCartStore()
    const {data:session} = useSession()
    const router = useRouter()

    useEffect(() =>{
        useCartStore.persist.rehydrate()
    },[])
   
    const handleCheckout = async () => {
        if (!session) {
          router.push("/login");
        } else {
          try {
            const res = await fetch("http://localhost:3000/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                price: totalPrice,
                products,
                status: "Not Paid!",
                userEmail: session.user.email,
              }),
            });
            const data =await res.json()
            router.push(`/pay/${data.id}`)
          } catch (err) {
            console.log(err);
          }
        }
    };
    return (
        <div className="flex flex-col md:flex-row md:h-[59vh] md:w-[95vw] md:mx-auto">
            {/*products */}
            <div className="flex flex-col w-full my-5 md:w-2/3 md:h-[90%] md:my-0 md:mt-5 xl:w-1/2">
                {products && products.map((item,index) =>
                    <div className="flex w-[90%] mx-auto my-1 p-2 justify-between items-center rounded-2xl shadow-lg border-[1px] border-green-500 md:mx-0" key={index}>
                       {item.img && <Image src={item.img} width={100} height={100} alt="" className="h-[80%] object-contain"/>}
                        <div className="flex flex-col gap-1 text-gray-800">
                            <p className="uppercase font-semibold text-sm">{item.title} x {item.quantity}</p>
                            <p className="text-xs">{item.optionTitle}</p>
                            <p className="font-bold text-lg">${item.price}</p>
                        </div>
                        <IoTrashBinOutline className='text-red-600 cursor-pointer' onClick={() => removeFromCart(item)}/>
                    </div>
                )}
            </div>
            

            {/*Payment */}
            <div className="flex flex-col w-[95%] mx-auto my-5 pt-5 bg-yellow-400 text-gray-800 rounded-xl shadow-lg md:w-1/3 md:h-[90%] md:my-0 md:mt-5 xl:w-1/2">
                <div className="flex w-full p-3 justify-between">
                    <span className="">Subtotal ({totalItems} items)</span>
                    <span className="">${totalPrice}</span>
                </div>
                <div className="flex w-full p-3 justify-between">
                    <span className="">Service Cost</span>
                    <span className="">$0.00</span>
                </div>
                <div className="flex w-full p-3 justify-between">
                    <span className="">Delivery Cost</span>
                    <span className="text-green-500">FREE!</span>
                </div>
                <hr className="w-[90%] mx-auto border-gray-800 my-5 opacity-20"/>
                <div className="flex w-full p-3 justify-between">
                    <span className="">TOTAL(INCL. VAT)</span>
                    <span className="font-bold">${totalPrice}</span>
                </div>
                <button className="w-1/2 h-10 bg-gray-800 text-gray-100 rounded-xl self-end mx-3 my-10 cursor-pointer" onClick={handleCheckout}>CHECKOUT</button>
            </div>
        </div>
    );
};

export default CartPage;
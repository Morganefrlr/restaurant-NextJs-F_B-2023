import Link from "next/link";
import { LiaFacebookF, LiaInstagram, LiaTwitter,LiaLinkedinIn } from "react-icons/lia";
import Image from "next/image";

const items = [
    {
        id:1,
        title: "Support",
        cats:[
            "Faq",
            "Shipping & Returns",
            "Contact Us",
            "Our Partners"
        ]
        
    },
    {
        id:2,
        title: "Info",
        cats:[
            "About Us",
            "Our Restaurants",
            "Size Guide",
            "Our Piercing Service"
        ]
        
    },
    {
        id:3,
        title: "Contact",
        cats:[
            "New York, USA",
            "info@example.com",
            "+123 4568 7856 22",
            "Lorem Ipsum"
        ]
        
    }
]
const Footer = () => {
    return (
        <div className="bg-green-500 text-gray-100 flex flex-col justify-between items-center w-[95vw] md:h-[30vh] h-[20vh] p-2 mx-auto rounded-tr-xl rounded-tl-xl ">
            <div className="flex h-[90%] w-[100%]">
                <div className="flex flex-col justify-center items-center w-full md:w-[25vw] h-full gap-3">
                    <Image src="/logo.png" width={200} height={200} alt="" className="object-contain absolute opacity-10 w-20"/>
                    <div className="flex flex-col items-center relative gap-1 top-2">
                        <Link href='/' className="text-2xl font-semibold hover:text-yellow-300">Find Food</Link>
                        <div className="flex text-lg gap-1">
                            <LiaFacebookF className="hover:fill-red-600 cursor-pointer"/>
                            <LiaInstagram className="hover:fill-red-600 cursor-pointer"/>
                            <LiaTwitter className="hover:fill-red-600 cursor-pointer"/>
                            <LiaLinkedinIn className="hover:fill-red-600 cursor-pointer"/>
                        </div>
                    </div>
                    
                </div>
                <div className="hidden md:flex w-[80%] h-full justify-around items-center">
                    {items.map(item => 
                        <div className="flex flex-col gap-4 w-[10vw]" key={item.id}>
                            <h1 className="text-2xl font-bold">{item.title}</h1>
                            {item.cats.map(cat => 
                                <p className="text-sm">{cat}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <hr className="w-[90%] opacity-50 mb-3"/>
            <p className="text-xs ">2023 © ALL RIGHTS RESERVED</p>
        </div>
    );
};

export default Footer;
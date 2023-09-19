import Image from "next/image";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";

const Navbar = () => {

    const user = false
    return (
        <div className="flex justify-between items-center w-[95vw] px-3 h-[4vh] mx-auto">
            <Link href='/' className="flex gap-1 w-fit h-fit cursor-pointer">
                <Image src="/logo.png" width={30} height={30} alt="" className="object-contain mr-2 md:w-10 md:h-10"/>
                <span className="text-red-600 text-2xl font-medium md:text-4xl md:font-normal">Find</span>
                <span className="text-yellow-300 text-2xl font-medium md:text-4xl md:font-normal">Food</span>
            </Link>
            <div className="hidden md:flex gap-8 text-gray-400">
                <Link href='/'>Homepage</Link>
                <Link href='/menu'>Menu</Link>
                <Link href='/'>Contact</Link>
            </div>
            <div className="hidden md:flex gap-5 text-gray-400">
                <Link href='/cart' className="flex items-center"><CartIcon /></Link>
                <UserLinks/>
            </div>
            <div className="md:hidden">
                <Menu/>
            </div>
        </div>
    );
};

export default Navbar;
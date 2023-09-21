"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";

const AddButton = () => {

    const {data:session , status} =useSession()
    const router = useRouter()

    if(status === 'loading'){
        return <p>Loading.....</p>
    }

    if(status === 'unauthenticated' || !session?.user.isAdmin){
        return 
    }

    return (
        <Link href={'/add'} className="absolute top-8 right-5 text-red-500 cursor-pointer text-center text-4xl"><IoIosAddCircle/></Link>
            
        
    );
};

export default AddButton;
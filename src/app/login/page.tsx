'use client'
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const LoginPage = () => {
    const {data,status} = useSession()
    const router = useRouter()

    if(status === 'loading'){
        return <p>Loading...</p>
    }
    if(status === 'authenticated'){
        router.push('/')
    }

    return (
        <div className="p-4 h-[69vh] flex items-center justify-center">
            <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
                <div className="relative h-1/3 w-full md:h-full md:w-1/2">
                    <Image src="/loginBg.png" alt="" fill className="object-cover"/>
                </div>
                <div className="p-10 flex flex-col gap-8 md:h-1/2 ">
                    <h1 className="font-bold  text-xl xl:text-3xl">Welcome</h1>
                    <p>Log into your account or create a new one using social buttons</p>
                    <button className="flex gap-4 p-4 ring-1 ring-orange-100 rounded" onClick={() => signIn('google')}>
                        <FcGoogle/>
                        <span>Sign in with Google</span>
                    </button>
                    <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded">
                        <FaFacebook className='text-blue-600'/>
                        <span>Sign in with Facebook</span>
                    </button>
                    <p className="text-sm ">Have a problem?<Link href="/" className="underline"> Contact us</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
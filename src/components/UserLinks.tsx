'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";



const UserLinks = () => {
    const {status} = useSession()
    return (
        <div>
            {status === 'authenticated' ? (
                <>
                    <Link href='/orders'>Orders</Link>
                    <span className="ml-4 cursor-pointer" onClick={() => signOut()}>Logout</span>
                </>
            ): (
            <Link href='/login' className="bg-green-500 p-1 w-20 text-center text-gray-100 rounded-md shadow cursor-pointer">Login</Link>
            )}
        </div>
    );
};

export default UserLinks;
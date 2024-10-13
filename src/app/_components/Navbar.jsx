'use client'
import { FaSignOutAlt } from 'react-icons/fa'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import toast, { Toaster } from 'react-hot-toast';
export const Navbar = () => {
    const pathname = usePathname(); 

    const handle = ()=>{
      toast.success('Logout Succesfully')
    }
    return (
        <div className="h-[77px] bg-black w-full flex justify-between items-center px-10 sm:px-24">
          
            <Link href="/" className="text-white text-xl font-bold">
               LOGO
            </Link>

          
            {pathname !== '/' && ( 
                <Link href='/' onClick={handle} className="flex items-center text-white">
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </Link>
            )}
            <Toaster />
        </div>
    );
};

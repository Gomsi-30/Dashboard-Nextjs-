'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaUser, FaCog } from 'react-icons/fa'; 

const Dashboard = () => {
  const pathname = usePathname(); 
  console.log(pathname);

  return (
    <div className='flex absolute bottom-0 flex-row lg:flex-col items-center h-40 w-full lg:h-[89vh] overflow-hidden bg-pink-200 lg:w-[22%] p-6'>
      <nav className='flex w-full flex-row lg:flex-col space-x-8 lg:space-x-0 lg:space-y-8 justify-center'>
       
        <Link 
          href="/dashboard" 
          className={`flex items-center justify-center lg:justify-start py-2 px-4 rounded-md transition duration-300 ease-in-out ${pathname === '/dashboard' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} hover:bg-black hover:text-white`}
        >
         
          <FaTachometerAlt className="text-1xl sm:text-2xl" />
        
          <span className="hidden sm:inline sm:inline ml-2">Dashboard</span>
        </Link>

        {/* Profile Link */}
        <Link 
          href="/profile" 
          className={`flex items-center justify-center lg:justify-start py-2 px-4 rounded-md transition duration-300 ease-in-out ${pathname === '/profile' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} hover:bg-black hover:text-white`}
        >

          <FaUser className="text-1xl sm:text-2xl" />
        
          <span className="hidden sm:inline sm:inline ml-2">Profile</span>
        </Link>

 
        <Link 
          href="/settings" 
          className={`flex items-center justify-center lg:justify-start py-2 px-4 rounded-md transition duration-300 ease-in-out ${pathname === '/settings' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} hover:bg-black hover:text-white`}
        >
      
          <FaCog className="text-1xl sm:text-2xl" />
     
          <span className="hidden sm:inline sm:inline ml-2">Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard;

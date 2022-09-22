import React from 'react';
import {useSession, signOut} from "next-auth/react";
import Image from "next/image";

const LeftBar = () => {
     const { data: session } = useSession()

     return (
          <div className="w-3/12 px-1 mr-4  greyish-color rounded-2xl drop-shadow-lg sm:w-full sm:p-0 md:w-full md:p-0 sm:mt-12">
               <div className="flex mx-4 py-2 ">
                    <div className='w-12 h-12 relative' onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>
                         <Image src={session?.user?.image!} layout='fill' className='rounded-3xl cursor-pointer' alt={session?.user?.name!} />
                    </div>
                    <div className="ml-4">
                         <h1 className="text-white">{session?.user?.name}</h1>
                         <h1 className="text-white">{session?.user?.email}</h1>
                    </div>
               </div>
          </div>
     );
};

export default LeftBar;

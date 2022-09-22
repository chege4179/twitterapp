import React from 'react';
import Image from "next/image";
import {useSession} from "next-auth/react";

const HomeComponent = () => {
     const { data: session } = useSession()
     return (
          <div>
               <div className="w-full h-12 flex items-center justify-center">
                    <h1 className="text-white text-xl">Home</h1>
               </div>
               <div className="w-full h-40">
                    <div className="flex w-full ">
                         <div className='w-12 h-12 relative'>
                              <Image src={session?.user?.image!} layout='fill' className='rounded-3xl cursor-pointer' alt={session?.user?.name!} />
                         </div>
                         <div className="w-full">
                              <input type="text" className=""/>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default HomeComponent;

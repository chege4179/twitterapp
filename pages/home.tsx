import React from 'react';
import {NextPage} from "next";
import HomeLayout from "../components/HomeLayout";
import {useSession} from "next-auth/react";
import CenterBar from "../components/CenterBar";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";

const HomePage:NextPage = () => {
     return (
          <HomeLayout>
               <div className='flex justify-center w-full h-full'>
                    <div className='max-w-screen-xl  rounded-2xl w-full h-full flex sm:p-0 md:flex-col md:items-center'>
                         <LeftBar/>
                         <CenterBar/>
                         <RightBar/>
                    </div>
               </div>
          </HomeLayout>
     );
};

export default HomePage;

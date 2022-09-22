import React, {useEffect} from 'react';
import {NextPage} from "next";
import HomeLayout from "../components/HomeLayout";
import {useSession} from "next-auth/react";
import CenterBar from "../components/CenterBar";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import BASE_URL from "../util/BaseURL";

const HomePage:NextPage = () => {
     const { data:session } = useSession()
     async function addUserToDB(){
          try {
               const response = await fetch(`${BASE_URL}/api/users`,{
                    method:"POST",
                    headers:{
                         'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                         name:session?.user?.name,
                         email:session?.user?.email,
                         imageUrl:session?.user?.image
                    }),
               })
               const res = await response.json()
               console.log("Response",res)
          }catch (e){
               console.log("Error")
          }
     }
     useEffect(() => {
          addUserToDB()
     }, [session]);

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

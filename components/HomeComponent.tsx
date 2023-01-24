import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useSession} from "next-auth/react";
import BASE_URL from "../util/BaseURL";
import {toast, ToastContainer} from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css"
import {Tweet, TweetWithUser} from "../models/Tweet";
import TweetCard from "./TweetCard";
import {Like} from ".prisma/client";
import User from "../models/User";
import {useQuery, useQueryClient} from "react-query";


type Response = {
     tweets:TweetWithUser[]
     success:boolean,
     msg:string
}
const HomeComponent:React.FC = () => {
     const { data: session } = useSession()
     const [tweet,setTweet] = useState("")

     const queryClient = useQueryClient()

     const fetchTweetsPromise = () => fetch(`${BASE_URL}/api/tweets`).then((res) => res.json())
     const { isLoading,data ,error  } = useQuery<Response>(["tweets"],fetchTweetsPromise)


     const SendTweet = async () => {
          try {
               const response = await fetch(`${BASE_URL}/api/tweets`,{
                    method:"POST",
                    body:JSON.stringify({
                         tweetContent:tweet,
                         createdAt:moment().format('LT'),
                         createdOn:moment().format('L'),
                         userEmail:session?.user?.email
                    }),
                    headers:{
                         'Content-Type':'application/json'
                    },
               })
               const res = await response.json()
               if (res.success){
                    toast.success(res.msg)
                    setTweet("")
                    await queryClient.invalidateQueries("tweets")

               }else {
                    toast.error(res.msg)
               }
          }catch (e:any){
               console.log("Error sending tweet",e)
               toast.error(e.message)
          }
     }

     return (
          <>
               <ToastContainer position="top-center"/>
               <div className="w-full h-12 flex items-center justify-center">
                    <h1 className="text-white text-xl">Home</h1>
               </div>
               <div className="w-full h-24 p-4">
                    <div className="flex w-full h-full">
                         <div className='w-12 h-12 relative'>
                              <Image src={session?.user?.image!} layout='fill'
                                     className='rounded-3xl cursor-pointer'
                                     alt={session?.user?.name!}
                              />
                         </div>
                         <div className="w-full ml-2">
                              <textarea
                                   value={tweet}
                                   onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setTweet(e.target.value)}
                                   className="greyish-color w-full h-full text-white p-2 outline-none border border-gray-700 rounded-xl"
                                   placeholder="What's happening"/>
                         </div>
                    </div>
               </div>
               <div className="w-full h-20 flex items-end justify-end p-2">
                    <button disabled={tweet === ""} onClick={SendTweet} className="btn-primary">
                         Tweet
                    </button>
               </div>
               <hr className="border-gray-700 w-full"/>
               { isLoading && (<h1>Loading</h1>) }
               {
                    data && (
                         <>
                              {
                                   data.tweets.map((tweet:TweetWithUser,index:number) => {
                                        return(
                                             <TweetCard tweet={tweet} key={index}/>
                                        )
                                   })
                              }
                         </>
                    )
               }
               { error && (<h1>Error</h1>) }

          </>
     );
};

export default HomeComponent;

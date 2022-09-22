import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useSession} from "next-auth/react";
import BASE_URL from "../util/BaseURL";
import {toast, ToastContainer} from "react-toastify";
import ErrnoException = NodeJS.ErrnoException;
import moment from "moment";
import "react-toastify/dist/ReactToastify.css"
import {Tweet} from "../models/Tweet";
import TweetCard from "./TweetCard";

const HomeComponent = () => {
     const { data: session } = useSession()
     const [tweet,setTweet] = useState("")
     const [tweets,setTweets] = useState<Tweet[]>([])

     useEffect(() => {
          fetchTweets()
     },[])

     const fetchTweets = async () => {
          try {
               const response = await fetch(`${BASE_URL}/api/tweets`)
               const res = await response.json()
               if (res.success){
                    setTweets(res.tweets.reverse())
               }
          }catch (e){
               console.log(e)

          }
     }

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
                    fetchTweets()
               }else {
                    toast.error(res.msg)
               }
          }catch (e:any){
               console.log("Error sending tweet",e)
               toast.error(e.message)
          }
     }

     return (
          <div>
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
               {
                    tweets.map((tweet:Tweet,index) => {
                         return(
                              <TweetCard tweet={tweet} key={index}/>
                         )
                    })
               }
          </div>
     );
};

export default HomeComponent;

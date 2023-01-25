import React from 'react';
import {Tweet, TweetWithUser} from "../models/Tweet";
import Image from "next/image";
import {BiArrowBack, BiCommentDetail} from "react-icons/bi"
import {FiRepeat} from "react-icons/fi"
import {AiFillHeart} from "react-icons/ai"
import {BsUpload} from "react-icons/bs"
import {useRouter} from "next/router";


type Props = {
     tweet: TweetWithUser
}
const ExpandedTweetCard = ({tweet}: Props) => {
     const router = useRouter()

     return (
          <div className="w-full flex flex-col hover:bg-gray-900 hover:cursor-pointer " >
               <div className="w-full h-16 flex items-center">
                    <div className="mx-4" onClick={() => router.back()}>
                         <BiArrowBack color="white" size={30}/>
                    </div>
                    <div className="mx-4 ">
                         <h1 className="text-white font-bold text-lg">Tweet</h1>
                    </div>

               </div>
               <div className="w-full h-3/4 flex p-2 ">
                    <div className='w-12 h-12 relative'>
                         <Image src={tweet.tweetAuthor.imageUrl} layout='fill'
                                className='rounded-3xl cursor-pointer'
                                alt={tweet.tweetAuthor.imageUrl}
                         />
                    </div>
                    <div className="w-5/6 h-full flex flex-col ">
                         <div className="flex ">
                              <p className="text-white font-bold ml-2 mr-4">{tweet.tweetAuthor.displayName}</p>
                              <p className="text-gray-500">@{tweet.tweetAuthor.email}</p>
                         </div>
                         <div className="w-full h-full">
                              <p className="text-gray-500  ml-2 ">{tweet.tweetContent}</p>
                         </div>
                    </div>
               </div>
               <div className="w-full h-1/4 flex justify-evenly items-center p-2">
                    <div className="flex">
                         <BiCommentDetail size={25} className="mr-2"/>
                         <p className="text-gray-500">{0}</p>
                    </div>
                    <div className="flex">
                         <FiRepeat size={25} className="mr-2"/>
                         <p className="text-gray-500">{tweet.retweetCount}</p>
                    </div>
                    <div className="flex">
                         <AiFillHeart size={25} className="mr-2"/>
                         <p className="text-gray-500">{tweet.likeCount}</p>
                    </div>
                    <BsUpload size={25}/>
               </div>
               <hr className="border-gray-700 w-full"/>

          </div>
     );
};

export default ExpandedTweetCard;

import React from 'react';
import PropTypes from 'prop-types';
import {useRouter} from "next/router";
import HomeLayout from "../../components/HomeLayout";
import BASE_URL from "../../util/BaseURL";
import {TweetWithUser} from "../../models/Tweet";
import {useQuery} from "react-query";
import {ColorRing} from "react-loader-spinner";
import TweetCard from "../../components/TweetCard";
import ExpandedTweetCard from "../../components/ExpandedTweetCard";
import Image from "next/image";
import {useSession} from "next-auth/react";


type SingleTweetResponse = {
     success: boolean,
     msg: string,
     tweet: TweetWithUser,
}

const SingleTweet = () => {
     const router = useRouter()
     const {data: session} = useSession()
     const tweetId = router.query.tweetId
     const fetchSingleTweet = () => fetch(`${BASE_URL}/api/tweets/${tweetId}`).then((res) => res.json())
     const {isLoading, data, error} = useQuery<SingleTweetResponse>([tweetId], fetchSingleTweet)

     return (
          <HomeLayout>
               <>
                    {isLoading && (
                         <div className="w-full h-96 items-center justify-center flex ">
                              <ColorRing
                                   visible={true}
                                   height="80"
                                   width="80"
                                   ariaLabel="blocks-loading"
                                   wrapperStyle={{}}
                                   wrapperClass="blocks-wrapper"
                                   colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
                              />
                         </div>
                    )}
                    {
                         data && (
                              <>
                                   <ExpandedTweetCard tweet={data.tweet}/>
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
                                                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                       }}
                                                       className="greyish-color w-full h-full text-white p-2 outline-none border border-gray-700 rounded-xl"
                                                       placeholder="Tweet your reply "
                                                       />
                                             </div>
                                        </div>
                                   </div>
                                   <div className="w-full h-20 flex items-end justify-end p-2">
                                        <button disabled={false} onClick={() => {
                                        }} className="btn-primary">
                                             Tweet
                                        </button>
                                   </div>

                              </>
                         )
                    }


               </>

          </HomeLayout>
     );
};


export default SingleTweet;

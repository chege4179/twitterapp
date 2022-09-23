import {NextApiRequest, NextApiResponse} from "next";
import {MainDB} from "../../config/db";
import crypto from "crypto";
import {
     createCommentTable,
     createLikeTable,
     createRetweetsTable,
     getUserById,
     getUserInfo
} from "../../config/functions";

async function tweets(req: NextApiRequest, res: NextApiResponse) {
     switch (req.method){
          case "GET":
               try {
                    const tweets = await MainDB("tweets").select()
                    const TweetsPromises = tweets.map((tweet:any) => getUserInfo(tweet.tweetUserId))
                    const users = await Promise.all(TweetsPromises)
                    const newTweets = tweets.map((tweet:any) => {
                         return {
                              ...tweet,
                              user:users.find((user) => user.userId === tweet.tweetUserId)
                         }
                    })
                    return res.status(200).json({
                         success:true,
                         msg:"Tweets fetched successfully",
                         tweets : newTweets,

                    })
               }catch (e) {
                    console.log("Error>>>>>>>>>>>>>>>>>>..",e)
                    return res.json({
                         msg:"An unexpected error occurred",
                         success:true,
                         users:[]
                    })
               }
          case "POST":
               console.log("Request ",req.body)
               const { tweetContent,createdAt,createdOn,userEmail } = req.body
               const tweetId = crypto.randomBytes(16).toString("hex")
               const { userId } = await getUserById(userEmail)
               console.log("User id",userId)
               try {
                    const result = await MainDB("tweets").insert([{
                         tweetId:tweetId,
                         tweetContent:tweetContent,
                         tweetUserId:userId,
                         tweetImageUrl:null,
                         createdAt:createdAt,
                         createdOn:createdOn,
                    }])
                    await createRetweetsTable(tweetId)
                    await createLikeTable(tweetId)
                    await createCommentTable(tweetId)
                    return res.json({
                         msg:"Tweet sent successfully",
                         success:true,
                    })
               }catch (e){
                    console.log(e)
                    return res.json({
                         msg:"An unexpected error occurred",
                         success:false,
                    })
               }
          case "DELETE":

     }

}
export default tweets

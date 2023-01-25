import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../config/db";
import crypto from "crypto";

async function tweets(req: NextApiRequest, res: NextApiResponse) {
     switch (req.method){
          case "GET":

               try {
                    const tweets = await prisma.tweet.findMany({
                         include:{
                              likes:true,
                              comments:true,
                              tweetAuthor:true

                         }
                    })
                    return res.status(200).json({
                         success:true,
                         msg:"Tweets fetched successfully",
                         tweets : tweets,

                    })
               }catch (e) {
                    console.log("Error>>>>>>>>>>>>>>>>>>..",e)
                    return res.json({
                         msg:"An unexpected error occurred",
                         success:true,
                         tweets:[]
                    })
               }
          case "POST":
               console.log("Request ",req.body)
               const { tweetContent,createdAt,createdOn,userEmail } = req.body
               const tweetId = crypto.randomBytes(16).toString("hex")
               const  user  = await prisma.user.findFirst({
                    where:{
                         email:userEmail
                    }
               })
               try {

                    const result = await prisma.tweet.create({
                         // @ts-ignore
                         data:{

                              tweetContent:tweetContent,
                              tweetUserId:user?.userId,
                              tweetImageUrl:"",
                              createdAt:createdAt,
                              createdOn:createdOn,
                              likeCount:0,
                              retweetCount:0
                         }
                    })
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

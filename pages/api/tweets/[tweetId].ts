import {NextApiRequest, NextApiResponse} from "next";
import crypto from "crypto";
import prisma from "../../../config/db";
import {useRouter} from "next/router";
import tweetId from "../../tweet/[tweetId]";

async function tweets(req: NextApiRequest, res: NextApiResponse) {
     switch (req.method) {
          case "GET":
               const tweetId = req.query.tweetId as string

               try {
                    const tweets = await prisma.tweet.findUnique({
                         where: {
                              tweetId: tweetId
                         },
                         include: {
                              likes: true,
                              comments: true,
                              tweetAuthor: true

                         }
                    })
                    return res.status(200).json({
                         success: true,
                         msg: "Tweet found",
                         tweet: tweets,

                    })
               } catch (e) {
                    console.log("Error>>>>>>>>>>>>>>>>>>..", e)
                    return res.json({
                         msg: "An unexpected error occurred",
                         success: true,
                         tweet: []
                    })
               }
          case "DELETE":

     }

}

export default tweets

import User from "./User";
import {Like} from ".prisma/client";


export interface Tweet {
     tweetId: string;
     tweetContent: string;
     tweetUserId: string;
     tweetImageUrl?: string;
     createdAt: string;
     createdOn: string;
     likeCount: number;
     retweetCount: number;
     user: User;
}


export type TweetWithUser = Tweet & {likes: Like[], comments: Comment[], tweetAuthor: User}

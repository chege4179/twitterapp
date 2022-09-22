import User from "./User";


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

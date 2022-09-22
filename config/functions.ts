import {CommentsDB, LikeDB, MainDB, RetweetDB} from "./db";


async function createLikeTable(tweetId:string){
     try {
          await LikeDB.schema.createTableLike(tweetId, 'testliketable')
     }catch (e) {
          console.log("Error creating like table",e)
     }
}
async function createCommentTable(tweetId:string){
     try {
          await CommentsDB.schema.createTableLike(tweetId, 'testcommenttable')
     }catch (e) {
          console.log("Error creating comment table",e)
     }
}
async function createRetweetsTable(tweetId:string){
     try {
          await RetweetDB.schema.createTableLike(tweetId, 'testretweettable')
     }catch (e) {
          console.log("Error creating retweet table",e)
     }
}
async function getUserById(email:string){
     const user = await MainDB.select('userId', ).from("users").where({email})
     return user[0]
}
async function getUserInfo(userId:string){
     const user = await MainDB("users").select().where({userId})
     return user[0]
}
export {
     createCommentTable,
     createLikeTable,
     createRetweetsTable,
     getUserById,
     getUserInfo,
}


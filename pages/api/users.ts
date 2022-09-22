import {NextApiRequest, NextApiResponse} from "next";
import { MainDB } from "../../config/db";
import crypto from "crypto"

async function users(req: NextApiRequest, res: NextApiResponse) {
     switch (req.method){
          case "GET":
               try {
                    const users = await MainDB("users").select()

                    console.log("Users",users)
                    return res.status(200).json({
                         success:true,
                         msg:"Users fetched successfully",
                         users : users,

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

               const { name,email,imageUrl } = req.body
               const userId = crypto.randomBytes(16).toString("hex")
               try {
                    const existingUser = await MainDB("users").where({ email })
                    if (existingUser.length > 0){
                         return res.json({
                              msg:"A user with a similar address exists",
                              success:false
                         })
                    }else {
                         const result = await MainDB("users").insert([{
                              userId:userId,
                              displayName:name,
                              email:email,
                              imageUrl:imageUrl,
                         }])
                         return res.json({
                              msg:"New user added to the database",
                              success:true,
                         })
                    }
               }catch (e){
                    console.log(e)
                    return res.json({
                         msg:"An unexpected error occurred",
                         success:false,
                    })
               }
     }

}
export default users

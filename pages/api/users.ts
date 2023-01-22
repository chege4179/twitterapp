import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../config/db";
import crypto from "crypto"
import {TypedRequestBody} from "../../types/TypedRequestBody";

type RequestBody = {
     name:string,
     email:string,
     imageUrl:string
}
async function users(req: TypedRequestBody<RequestBody>, res: NextApiResponse) {
     switch (req.method){
          case "GET":
               try {
                    const users = await prisma.user.findMany({

                    })

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
               try {
                    const existingUser = await prisma.user.findFirst({
                         where:{
                              email:email
                         }
                    })
                    if (existingUser !== null){
                         return res.json({
                              msg:"A user with a similar address exists",
                              success:false
                         })
                    }else {
                         const result = await prisma.user.create({
                              data:{
                                   userId:crypto.randomBytes(16).toString("hex"),
                                   email:email,
                                   displayName:name,
                                   imageUrl:imageUrl,
                              }
                         })
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

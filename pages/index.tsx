import type {NextPage} from 'next'
import {signIn} from "next-auth/react";
import BASE_URL from "../util/BaseURL";


const Home: NextPage = () => {

     return (
          <div className="w-screen h-screen bg-black flex items-center justify-center">
               <button
                    className="btn-primary"
                    onClick={() => signIn("google",{ callbackUrl:`${BASE_URL}/home` })}
               >
                    Login With Google
               </button>
          </div>
     )
}

export default Home

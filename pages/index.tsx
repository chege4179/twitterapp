import type {NextPage} from 'next'
import {signIn} from "next-auth/react";


const Home: NextPage = () => {

     return (
          <div className="w-screen h-screen bg-black flex items-center justify-center">
               <button
                    className="btn-primary"
                    onClick={() => signIn("google",{ callbackUrl:"http://localhost:3000/home" })}
               >
                    Login With Google
               </button>
          </div>
     )
}

export default Home

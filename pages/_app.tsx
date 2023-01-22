import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {QueryClient, QueryClientProvider} from "react-query";


const client = new QueryClient()
// @ts-ignore
function MyApp({Component, pageProps ,session }: AppProps) {

     return (
          <QueryClientProvider client={client}>
               <SessionProvider session={session}>
                    <Component {...pageProps} />
               </SessionProvider>
          </QueryClientProvider>

     )
}

export default MyApp


let LOCAL_URL:string = "http://localhost:3000"
let REMOTE_URL:string = ""
let BASE_URL:string;
if (process.env.NODE_ENV === "development"){
     BASE_URL = LOCAL_URL
}else {
     BASE_URL = "https://twitterapp-seven.vercel.app"
}
export default BASE_URL

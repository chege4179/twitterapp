import React from 'react';
import HomeComponent from "./HomeComponent";
import {useRouter} from "next/router";

const CenterBar = () => {
     const router = useRouter()

     return (
          <div className="w-5/12  greyish-color flex flex-col rounded-2xl drop-shadow-lg sm:w-full sm:p-0 md:w-full md:p-0 sm:mt-12">
               <div className="w-full h-full overflow-scroll scrollbar-hide">
                    <HomeComponent/>
               </div>
          </div>
     );
};

export default CenterBar;

import React, {ReactElement} from 'react';
import LeftBar from "./LeftBar";
import CenterBar from "./CenterBar";
import RightBar from "./RightBar";

type Props = {
     children:ReactElement
}
const HomeLayout = ({ children } : Props) => {
     return (
          <div className="w-screen h-screen flex items-center bg-black overflow-hidden p-4">
               <div className='flex justify-center w-full h-full'>
                    <div className='max-w-screen-xl  rounded-2xl w-full h-full flex sm:p-0 md:flex-col md:items-center'>
                         <LeftBar/>
                         <div className="w-5/12  greyish-color flex flex-col rounded-2xl drop-shadow-lg sm:w-full sm:p-0 md:w-full md:p-0 sm:mt-12">
                              {children}
                         </div>
                         <RightBar/>
                    </div>
               </div>
          </div>
     );
};

export default HomeLayout;

import React from 'react';

type Props = {
     children:any
}
const HomeLayout = ({ children } : Props) => {
     return (
          <div className="w-screen h-screen flex items-center bg-black overflow-hidden p-4">
               {children}
          </div>
     );
};

export default HomeLayout;

import React from 'react';
import ReactLoading from "react-loading";

interface ILoadingProps {
   type:string;
   color:string;
   width:string;
   height:string
}

const Loading = ({
   type,
   color,
   width,
   height,
} : ILoadingProps) => {
   
  if(type === "small") {
     return <ReactLoading type="spin" width={width} height={height} color={color} />
  }

  return (
    <div className='loading-container'>
       <ReactLoading 
          type="spin"
          width={width}
          height={height}
          color={color}
       />
       <h2>Loading...</h2>
    </div>
  )
}

export default Loading
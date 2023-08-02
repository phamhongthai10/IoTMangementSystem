import React, { useEffect } from 'react';
//import { status } from '../mqtt_status';
import MyComponent  from './mqtt_status';
import { useState } from "react";


var status
var LEDStatus = () => {

  if(MyComponent().value === "ok") status =1;
  else status =0;
 // console.log(status);
  const color = status ? 'green'  : 'red';
  const text  = status ? 'dang chay' : 'dung hoat dong'
  return (
    <div>
        <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: color,
        
      }}
      
    />
    <p>{text}</p>
    </div>
    
    
  );
};

export default LEDStatus;
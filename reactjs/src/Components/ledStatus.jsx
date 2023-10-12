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




// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


// const CpuRamChart = ({ cpu, ram }) => {
//   const cpuData = [
//     { name: 'Used', value: cpu },
//     { name: 'Free', value: 100 - cpu },
//   ];

//   const ramData = [
//     { name: 'Used', value: ram },
//     { name: 'Free', value: 100 - ram },
//   ];

//   const COLORS = ['#DB0F27', '#0088FE'];

//   return (
//     <div>
//       <h2>CPU Usage</h2>
//       <PieChart width={300} height={300}>
//         <Pie
//           data={cpuData}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           fill="#8884d8"
//           label
//         >
//           {cpuData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>

//       <h2>RAM Usage</h2>
//       <PieChart width={300} height={300}>
//         <Pie
//           data={ramData}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           fill="#8884d8"
//           label
//         >
//           {ramData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// };

// export default CpuRamChart;

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CpuRamChart = ({ cpu, ram }) => {
  const cpuData = [
    { name: 'Used', value: cpu },
    { name: 'Free', value: 100 - cpu },
  ];

  const ramData = [
    { name: 'Used', value: ram },
    { name: 'Free', value: 100 - ram },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div>
      <h2>CPU Usage</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={cpuData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {cpuData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h2>RAM Usage</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={ramData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {ramData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CpuRamChart;

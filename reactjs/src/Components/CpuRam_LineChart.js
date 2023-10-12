import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CpuRam_LineChart = ({ cpuData, ramData }) => {
  return (
    <div>
      <h2>CPU Usage Over Time</h2>
      <LineChart width={2000} height={300} data={cpuData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cpuValue" stroke="#8884d8" name="CPU" />
      </LineChart>

      <h2>RAM Usage Over Time</h2>
      <LineChart width={2000} height={300} data={ramData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ramValue" stroke="#82ca9d" name="RAM" />
      </LineChart>
    </div>
  );
};

export default CpuRam_LineChart;

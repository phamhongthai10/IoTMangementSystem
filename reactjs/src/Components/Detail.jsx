import React, { useState, useEffect } from "react";
import { getGlobalValue } from "./Constant.js";
import CpuRamChart from "./CpuRamChart.jsx";

export default function Detail() {
  const globalValue = getGlobalValue();

  const [cpuUsage, setCpuUsage] = useState(7);
  const [ramUsage, setRamUsage] = useState(90);

  useEffect(() => {
    // Hàm này sẽ chạy sau mỗi lần render của component
    const interval = setInterval(() => {
      // Tăng giá trị của cpuUsage và ramUsage lên 1 đơn vị
      setCpuUsage((prevCpuUsage) => prevCpuUsage + 3);
      setRamUsage((prevRamUsage) => prevRamUsage - 5);
    }, 2000); // 1000ms = 1 giây

    // Hàm này sẽ được gọi khi component bị unmount để dọn dẹp interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Value to display: {globalValue}</h2>
      <CpuRamChart cpu={cpuUsage} ram={ramUsage} />
    </div>
  );
}

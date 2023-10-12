import React from "react";
import GaugeChart from "react-gauge-chart";

const CpuRamGaugeChart = ({ cpu, ram }) => {
  return (
    
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "20px" }}>
      <style>
        {`
          .gauge-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .gauge-label {
            font-size: 20px;
            font-weight: bold;
            margin-top: 10px;
          }
        `}
      </style>
        <h2>CPU Usage</h2>
        <div className="gauge-container">
          <GaugeChart
            id="cpu-gauge-chart"
            nrOfLevels={20}
            arcsLength={[0.3, 0.3, 0.3]}
            colors={["#5BE12C", "#F5CD19", "#EA4228"]}
            percent={cpu / 100}
            arcPadding={0.02}
            cornerRadius={10}
            style={{ width: "400px" }}
          />
          <div className="gauge-label">{cpu.toFixed(2)}%</div>
        </div>
      </div>

      <div>
        <h2>RAM Usage</h2>
        <div className="gauge-container">
          <GaugeChart
            id="ram-gauge-chart"
            nrOfLevels={20}
            arcsLength={[0.3, 0.3, 0.3]}
            colors={["#5BE12C", "#F5CD19", "#EA4228"]}
            percent={ram / 100}
            arcPadding={0.02}
            cornerRadius={10}
            style={{ width: "400px" }}
          />
          <div className="gauge-label">{ram.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
};

export default CpuRamGaugeChart;

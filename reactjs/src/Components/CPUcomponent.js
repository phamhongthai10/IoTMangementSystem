import React from "react";

const CPUComponent = ({ frequency }) => {
  return (
    <div className="cpu-component">
      <h1>CPU</h1>
      <p>Frequency: {frequency}</p>
      <div className="cpu-bar">
        <span style={{ width: frequency * 100 }} />
      </div>
    </div>
  );
};

export default CPUComponent;
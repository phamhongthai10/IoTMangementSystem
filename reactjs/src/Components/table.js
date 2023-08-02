import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import Detail from "./Detail";
import CpuRamChart from "./CpuRamChart";
import App from "../App";
import LEDStatus from "./ledStatus";
import { setGlobalValue } from "./Constant.js";
import  { useEffect } from "react";


const handleDeleteDevice = (index) => {
  deleteDevice(index);
};

const deleteDevice = (index) => {

  axios.post('http://localhost:3001/api/delete', { data: index })
    .then((response) => {
      console.log('Dữ liệu đã được xoá thành công:', response.data);
      window.alert('Đã xoá thiết bị thành công!');
      //setData(response.data); // Lưu dữ liệu trả về vào state (nếu cần)
    })
    .catch((error) => {
      console.error('Lỗi khi xoá dữ liệu:', error);
    });
}




const Table = ({ data }) => {
  const [columns, setColumns] = useState([
    {
      header: "deviceName",
      value: "deviceName",
    },
    {
      header: "topicName",
      value: "topicName",
    },
    {
      header: "Location",
      value: "location",
    },
  ]);
  // const cpuUsage = 70;
  // const ramUsage = 45;
  
  
  const handleClick = (value) => {
    setGlobalValue(value);  }; // Thay đổi giá trị của biến global
  return (
    <div>
      {data.map((row, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          {columns.map((column) => (
            <p key={column.value}>
              <strong>{column.header}:</strong> {row[column.value]}

            </p>
          ))}

          <Link to={`/edit/${row.deviceName}`} style={{ marginRight: "20px" }} onClick={() => handleClick(data[index][columns[0].value])}  >
            Chi tiết 
          </Link>
          {/* <CpuRamChart cpu={cpuUsage} ram={ramUsage} /> */}
          {/* <Routes>
          <Route path={`/edit/iot2050`} index element={<CpuRamChart cpu={cpuUsage} ram={ramUsage} />} />
          </Routes> */}
          <button onClick={() => handleDeleteDevice(data[index][columns[0].value])}>
            Xoá thiết bị
          </button>
        </div>
      ))}
          
    </div>
  );
};

export default Table;
//data[index][columns[0].value]
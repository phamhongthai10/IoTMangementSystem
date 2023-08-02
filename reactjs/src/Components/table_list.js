import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table from "./table";
import getInfoData from "./getInfoData";
import Detail from "./Detail";
const Table_list = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await getInfoData(); // Lấy dữ liệu từ máy chủ qua SSE
        
        setData(info);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   // Xử lý sau khi data thay đổi
  //   console.log("Data đã thay đổi:", data);
  // }, [data]);
  return (
    <Router>
      <div>
      
        {data.length > 0 ? (
          <Routes>
            <Route path="/" element={<Table data={data} />} />
            <Route path="/edit*" element={<Detail />} />
          </Routes>
        ) : (
          <p>Data empty</p>
        )}
        {/* <Table data={data} /> */}
      </div>
    </Router>
  )
};

export default Table_list;

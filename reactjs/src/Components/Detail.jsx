import React, { useState, useEffect } from "react";
import { getGlobalValue } from "./Constant.js";
import CpuRamGaugeChart from "./CpuRamChart.jsx";
import CpuRam_LineChart from "./CpuRam_LineChart.js";
import { fetchDataFromServer, fetchDataFromServer2 } from "./getCpuRamData.js";
import DeviceInfo from "./deviceInfo.js";
import axios from "axios";
import TerminalController from "./terminal.js";
import Cookies from 'js-cookie';

export default function Detail() {
  // const globalValue = getGlobalValue();
  const globalValue = Cookies.get('globalValue');

  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [cpuData, setCpuData]  = useState([{timestamp: '2023-07-31 10:00', cpuValue: 0}]);
  const [ramData, setRamData]  = useState([{timestamp: '2023-07-31 10:00', ramValue: 0}]);
  // const cpuData = [
  //   { time: '2023-07-31 10:00', cpu: 70 },
  //   { time: '2023-07-31 10:01', cpu: 75 },
  //   // Thêm các dữ liệu CPU khác vào đây
  // ];
  
  // const ramData = [
  //   { time: '2023-07-31 10:00', ram: 45 },
  //   { time: '2023-07-31 10:01', ram: 50 },
  //   { time: '2023-08-1 10:01', ram:20  },
  //   { time: '2023-08-2 10:01', ram: 25 },
  
  //   // Thêm các dữ liệu RAM khác vào đây
  // ];
  
 
  useEffect(() => {


    const interval = setInterval(() => {
      // Gọi API để lấy dữ liệu CPU và RAM từ server    
    fetchDataFromServer(globalValue)
      .then((data) => {
        // Dựa vào dữ liệu lấy về từ server, cập nhật giá trị CPU và RAM
        
        const getcpuData =data.data.cpuData;
        const getramData = data.data.ramData;
        if(getcpuData === undefined)
         {getcpuData =1
          getramData=1;}
        
        setCpuUsage(Math.ceil(getcpuData));
        setRamUsage(Math.ceil(getramData));
      })
      .catch((error) => {
        console.error('Error fetching data from server:', error);
        
      });
  }, 5000); // 1000ms = 1 giây

  const interval2 = setInterval(() => {
    // Gọi API để lấy dữ liệu CPU và RAM từ server    
  fetchDataFromServer2(globalValue)
    .then((data) => {
      // Dựa vào dữ liệu lấy về từ server, cập nhật giá trị CPU và RAM
      //console.log(data.data)
      const getcpuArray = data.data.map(({ timestamp, cpuValue }) => ({ timestamp, cpuValue }));
      
      const getramArray =  data.data.map(({ timestamp, ramValue }) => ({ timestamp, ramValue }));
      if(getcpuArray === undefined)
       {getcpuArray = []
        getramArray=[];}
      
      setCpuData(getcpuArray);
      setRamData(getramArray);
    })
    .catch((error) => {
      console.error('Error fetching data from server:', error);
      
    });
}, 7000); 
  // Hàm này sẽ được gọi khi component bị unmount để dọn dẹp interval
  return () => clearInterval(interval);
}, []);
  var deviceData;
const deviceData2 = [
  // {
    
  //   deviceType: 'Orange Pi 5',
  //   description: 'rockchip-rk3588',
  //   installationDate: '2023-08-21',
  //   location: 'Linux',
  //   status: 'BC711 NVMe SK hynix 128GB',
  //   specs: 'Armbian',
  //  // manufacturerInfo: 'ACME Sensors, hotline: 123-456-7890',
  //   eventHistory: '8.0 GB (7.51 GB usable)',
  //   version: '23.08.0-trunk jammy',
  //   manager: 'ARM  64 bits',
  // },
  // Thêm dữ liệu cho các thiết bị khác
  {
    
    name: 'Raspberry Pi 3 Model B Rev 1.2 ',
    processor: 'BCM2835',
    installationDate: '2023-08-21',
    os: 'Linux',
    status: 'SC64G',
    specs: 'Raspbian',
   // manufacturerInfo: 'ACME Sensors, hotline: 123-456-7890',
    eventHistory: '1.0 GB (0.97 GB usable)',
    version: 'Raspbian GNU/Linux 10 (buster)',
    architecture: 'ARM  32 bits',
    // networkName : "KTX khu A",
    // ip : "192.168.1.12"
  },
];

const deviceData1 = [
  {
    
    name: 'orangepi5',
    processor: 'rockchip-rk3588',
    installationDate: '2023-08-21',
    os: 'Linux',
    status: 'BC711 NVMe 128GB',
    specs: 'Armbian',
   // manufacturerInfo: 'ACME Sensors, hotline: 123-456-7890',
    eventHistory: '8.0 GB (7.51 GB usable)',
    version: '23.08.0-trunk jammy',
    architecture: 'ARM  64 bits',
  },
  // Thêm dữ liệu cho các thiết bị khác
  // {
    
  //   name: 'Raspberry Pi 3',
  //   processor: 'Broadcom BCM2836',
  //   installationDate: '2023-08-21',
  //   os: 'Linux',
  //   status: 'SanDisk 32 GB',
  //   specs: 'Raspberry Pi OS',
  //  // manufacturerInfo: 'ACME Sensors, hotline: 123-456-7890',
  //   eventHistory: '1.0 GB (0.92 GB usable)',
  //   version: 'Raspberry Pi OS Lite 32bit',
  //   architecture: 'ARM  32 bits',
  //   // networkName : "KTX khu A",
  //   // ip : "192.168.1.12"
  // },
];

const handleRebootDevice = (index) => {
 
  const shouldReboot = window.confirm(`Bạn có chắc muốn khởi động lại thiết bị không?`);
  if (shouldReboot) {
    rebootDevice(index);
  }

};

const rebootDevice = (index) => {

  axios.post('http://localhost:3001/api/reboot', { data: index })
    .then((response) => {
      console.log('Thiết bị đã gửi yêu cầu khởi động thành công:', response.data);
      window.alert('Đã gửi yêu cầu khởi động lại thiết bị thành công!');
      //setData(response.data); // Lưu dữ liệu trả về vào state (nếu cần)
    })
    .catch((error) => {
      console.error('Lỗi khi khởi động lại thiết bị:', error);
    });
}

  return (
    <div >
   
      <style>
        {`
          .box-container {
            border: 5px solid #E5E5E5;
            padding: 50px;
            margin-bottom: 50px;
            margin-left :30px;
            margin-right:30px;
            background-color: #f8f8f8;
            width:2200px;
            
          }
        `}
      </style>

      <div style={{ display: 'flex', alignItems: 'center' }}>
  <h1 style={{ marginRight: '20px' }}>Tên thiết bị: {globalValue}</h1>
  <button class="btn btn-danger" style={{ marginLeft: '1200px' }}  onClick={() => handleRebootDevice({globalValue})}>Khởi động lại</button>
</div>

<div className="box-container" id='1'>
  <h1 style={{ marginBottom: '30px' }}>Thông tin thiết bị</h1>
  {globalValue === 'orangepi'
    ? deviceData1.map((device) => <DeviceInfo key={device.id} device={device} />)
    : globalValue === 'raspberrypi'
    ? deviceData2.map((device) => <DeviceInfo key={device.id} device={device} />)
    : <h2>Không có thông tin thiết bị</h2> /* Thêm một điều kiện mặc định hoặc làm gì đó khác nếu cần */}
</div>


      <div className="box-container" id='2'>
        <h1 style={{ marginBottom: '30px' }}>Hiệu suất thiết bị</h1>
        <CpuRamGaugeChart cpu={cpuUsage} ram={ramUsage} />
        <CpuRam_LineChart cpuData={cpuData} ramData={ramData} />
      </div>


      <div className="box-container" >
        <h1 style={{ marginBottom: '30px' }}>Điều khiển thiết bị</h1>
        <TerminalController deviceName={globalValue}/>
      </div>


  
  </div>
    
    
  );
}

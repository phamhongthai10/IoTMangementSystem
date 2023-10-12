import React from 'react';
import '../Styles/deviceInfo.css'; // Import tệp CSS cho DeviceInfo

function DeviceInfo({ device }) {
  return (
    <div>
    <div className="device-info">
      <h2>Thông số phần cứng</h2>
      <p><strong>Tên host:</strong> {device.name}</p>
      <p><strong>Vi xử lý:</strong> {device.processor}</p>
      <p><strong>Dung lượng RAM:</strong> {device.eventHistory}</p>
      <p><strong>Bộ nhớ:</strong> {device.status}</p>
      <p><strong>Kiến trúc</strong> {device.architecture}</p>
    </div>

    <div className="device-info">
      <h2>Hệ điều hành</h2>
      <p><strong>Hệ điều hành:</strong> {device.os}</p>
      <p><strong>Chi tiết:</strong> {device.specs}</p>
      <p><strong>Phiên bản:</strong> {device.version}</p>
    </div>

  
    </div>
  );
}

export default DeviceInfo;

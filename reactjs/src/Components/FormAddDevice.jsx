// FormAddDevice.js
import React, { useState } from 'react';

const FormAddDevice = ({ onAddDevice }) => {
  const [deviceInfo, setDeviceInfo] = useState({ name: '' });

  const handleChange = (e) => {
    setDeviceInfo({ ...deviceInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDevice(deviceInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={deviceInfo.name}
        onChange={handleChange}
        placeholder="Nhập tên thiết bị"
        required
      />
      <button type="submit">Thêm thiết bị</button>
    </form>
  );
};

export default FormAddDevice;

import React, { useState } from 'react';
import axios from 'axios'; // Thêm thư viện axios để thực hiện HTTP request
import '../Styles/Modal.css';


// axios.use(cors())

const Modal = ({ isOpen, onClose }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    deviceName: '',
    topicName: '',
    cpuData: [],
    ramData: []
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeviceInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleAddDevice = () => {
    // Gửi dữ liệu của thiết bị lên server để lưu vào cơ sở dữ liệu MongoDB
    axios.post('http://localhost:3001/api/post-data', deviceInfo)
      .then((response) => {
        console.log('Dữ liệu đã được gửi thành công:', response.data);
        window.alert('Đã thêm thiết bị thành công!');
        //setData(response.data); // Lưu dữ liệu trả về vào state (nếu cần)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>Đóng</button>
        <div>
          <label>Tên thiết bị:</label>
          <input type="text" name="deviceName" value={deviceInfo.deviceName} onChange={handleChange} />
        </div>
        <div>
          <label>Tên topic:</label>
          <input type="text" name="topicName" value={deviceInfo.topicName} onChange={handleChange} />
        </div>

        {/* Các trường dữ liệu CPU và RAM, bạn có thể thêm các input phù hợp ở đây */}
       
        <button onClick={handleAddDevice}>Thêm thiết bị</button>
      </div>
    </div>
  );
};

export default Modal;

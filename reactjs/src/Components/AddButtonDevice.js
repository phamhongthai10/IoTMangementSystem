// TableList.js
import React, { useState } from 'react';
import FormAddDevice from './FormAddDevice';
import Modal from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const buttonStyles = {
  display: 'inline-block',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out',
};

const AddButtonDevice = () => {
  const [showModal, setShowModal] = useState(false);
  const [devices, setDevices] = useState([]);

  const handleAddDevice = (deviceInfo) => {
    setDevices([...devices, deviceInfo]);
    setShowModal(false); // Hide the modal after adding a device
  };

  return (
    <div>
      <button class="btn btn-outline-info" style={{ marginTop: '20px', marginBottom:'30px',marginLeft:'20px' }} onClick={() => setShowModal(true)}>Thêm mới thiết bị </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <FormAddDevice onAddDevice={handleAddDevice} />
      </Modal>
      <table>
        
      </table>
      
    </div>
  );
};

export default AddButtonDevice;

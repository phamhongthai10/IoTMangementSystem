// TableList.js
import React, { useState } from 'react';
import FormAddDevice from './FormAddDevice';
import Modal from './Modal';

const AddButtonDevice = () => {
  const [showModal, setShowModal] = useState(false);
  const [devices, setDevices] = useState([]);

  const handleAddDevice = (deviceInfo) => {
    setDevices([...devices, deviceInfo]);
    setShowModal(false); // Hide the modal after adding a device
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Thêm mới thiết bị </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <FormAddDevice onAddDevice={handleAddDevice} />
      </Modal>
      <table>
        
      </table>
      
    </div>
  );
};

export default AddButtonDevice;

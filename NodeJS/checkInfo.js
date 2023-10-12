const mqtt = require('mqtt');
const mongoose = require('mongoose')
// Kết nối tới máy chủ MQTT
const client = mqtt.connect('mqtt://test.mosquitto.org');
const deviceModel = require('./deviceModel');
const topic = 'orangepidata'
const receivedValues = [];


mongoose.connect('mongodb://localhost:27017/my_database')

const targetDeviceName = "orangepi";
(async () => {
  try {
    const devices = await deviceModel.find({ deviceName: targetDeviceName }).exec();
    
    const dataArray = devices.map(device => {
      return {
        timestamp: device.cpuData.timestamp,
        cpuValue: device.cpuData.value,
        ramValue: device.ramData.value
      };
    });
    console.log("CPU Data Array:", dataArray);
  } catch (error) {
    console.error("Error:", error);
  }
})();

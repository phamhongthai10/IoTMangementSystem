const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceName: String,
  topicName: String,
  cpuData: { timestamp: Date, value: Number },
  ramData: { timestamp: Date, value: Number }
});

const deviceModel = mongoose.model("Device", deviceSchema);

module.exports = deviceModel;

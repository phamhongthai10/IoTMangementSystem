const mongoose = require('mongoose');

const deviceSchemaInfo = new mongoose.Schema({
  name: String,
  processor: String,
  memory: String,
  disk: String,
  architecture:String,
  os:String,
  version:String,
});

const deviceInfo = mongoose.model("DeviceInfo", deviceSchemaInfo);

module.exports = deviceInfo;

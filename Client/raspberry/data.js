const mongoose = require('mongoose');

// Kết nối tới MongoDB
mongoose.connect('mongodb://127.0.0.1:28017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Định nghĩa mô hình (schema)
const dataSchema = new mongoose.Schema({
  timestamp: Date,
  cpuUsage: Number,
  ramUsage: Number
});

// Tạo mô hình từ schema
const Data = mongoose.model('Data', dataSchema);
// Tạo đối tượng mới từ mô hình
const newData = new Data({
  timestamp: new Date(),
  cpuUsage: 80,
  ramUsage: 50
});

// Lưu dữ liệu vào MongoDB
newData.save()
  .then(savedData => {
    console.log('Data saved:', savedData);
  })
  .catch(error => {
    console.error('Error saving data:', error);
  });
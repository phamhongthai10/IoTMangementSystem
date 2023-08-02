const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Route xử lý yêu cầu POST từ React
app.post('/api/post-data', (req, res) => {
  const data = req.body; // Dữ liệu gửi từ React
  console.log(data);
  // Xử lý dữ liệu ở đây (ví dụ: lưu vào cơ sở dữ liệu, xử lý dữ liệu, vv)

  // Gửi dữ liệu trả về cho React (nếu cần)
  //res.json(data);
});

// Khởi chạy server và lắng nghe cổng 3001
app.listen(3001, () => {
  console.log('Server đã khởi động và lắng nghe cổng 3001');
});

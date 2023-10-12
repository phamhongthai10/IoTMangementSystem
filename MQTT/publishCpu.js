const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const processDataFromMQTT = require('./processDatafromMQTT')
const deviceModel = require('./deviceModel'); // Đường dẫn đến tệp chứa deviceModel




// const topic = "orangepi";
app.use(cors());
app.use(express.json());

// Định nghĩa schema và mô hình dữ liệu cho thiết bị




mongoose.connect('mongodb://localhost:27017/my_database')
  .then(function(){
    console.log("Connect database success")
  })
  .catch(function(error){
    console.log("ERROR DB")
  })
app.post('/api/post-data', async (req, res) => {
  res.json("ok")

//   const deviceData = req.body; // Dữ liệu từ yêu cầu POST
//   try {
//     // Tạo một bản ghi mới cho thiết bị và lưu vào cơ sở dữ liệu
//     const newDevice = new Device(deviceData);
//     const savedDevice = await newDevice.save();
//     console.log('Đã lưu thiết bị:', savedDevice);
//     res.json(savedDevice);
//   } catch (error) {
//     console.error('Lỗi khi lưu thiết bị:', error);
//     res.status(500).json({ error: 'Lỗi khi lưu thiết bị' });
//   }

console.log(req)
const data = req.body;

// THÊM THIẾT BỊ
deviceModel.create({
  deviceName : data.deviceName,
  topicName : data.topicName,
  cpuData : { timestamp: new Date(), value: 80 },
  ramData : { timestamp: new Date(), value: 80 }
});
console.log(data.deviceName);
});

// Khởi chạy server và lắng nghe cổng 3001
app.listen(3001, () => {
  console.log('Server đã khởi động và lắng nghe cổng 3001');
});

//LIST THIẾT BỊ
// async function getDeviceNames() {
//   try {
//     const deviceNames = await deviceModel.distinct('deviceName');
//     console.log('Danh sách deviceName:', deviceNames);
//   } catch (error) {
//     console.error('Lỗi khi lấy danh sách deviceName:', error);
//   }
// }
// getDeviceNames();



app.use(express.static('public')); // Để cho phép trình duyệt kết nối SSE từ client

const sendSSEData = (data) => {
  // Lấy tất cả các kết nối SSE đang mở
  const clients = sseConnections;

  // Gửi dữ liệu SSE đến từng kết nối client
  clients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

const sseConnections = new Set(); // Lưu trữ các kết nối SSE

app.get('/api/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Khi client yêu cầu endpoint SSE, tạo kết nối mới và lưu trữ nó
  const sseConnection = { req, res };
  sseConnections.add(sseConnection);

  // Khi client đóng kết nối, xóa kết nối đó khỏi danh sách lưu trữ
  res.on('close', () => {
    sseConnections.delete(sseConnection);
  });
});

// Một ví dụ về việc gửi dữ liệu SSE từ phía máy chủ
const fetchDataAndSendSSE = async () => {
  try {
    const pipeline = [
      {
        $sort: { deviceName: 1, createdAt: -1 }
      },
      {
        $group: {
          _id: '$deviceName',
          deviceData: { $last: '$$ROOT' }
        }
      },
      {
        $replaceRoot: { newRoot: '$deviceData' }
      }
    ];

    const latestDeviceData = await deviceModel.aggregate(pipeline);
   // console.log(latestDeviceData);
    // Gửi dữ liệu mới nhất cho mỗi deviceName thông qua SSE
    sendSSEData(latestDeviceData);
  } catch (error) {
    console.log("bug", error);
  }
};

// Ví dụ: Gửi dữ liệu SSE mỗi 1 giây
setInterval(() => {
  fetchDataAndSendSSE();
}, 1000);

// app.get('/api/get-data-info', async (req, res) => {
//   try {
//     const device = await deviceModel.find({ deviceName: "son" });
//     console.log(device);
//     res.json(device);
//   } catch (error) {
//     console.log("bug", error);
//     res.status(500).json({ error: "Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu" });
//   }
// });



// // LỌC THIẾT BỊ
// deviceModel.find({deviceName:"son"})
// .then((device) =>{
// console.log("successs",device)
// })
// .catch((error)=>{
// console.log("bug",error)
// })


//  XOÁ THIẾT BỊ
// deviceModel.deleteMany({deviceName:"thai",topicName:"123456"})
// .then((device) =>{
// console.log("successs delete",device)
// })
// .catch((error)=>{
// console.log("bug delete",error)
// })

// app.delete("http://localhost:3001/api/devices/:deviceName", async (req, res) => {
//   const deviceName = req.params.deviceName;

//   try {
//     // Xoá tất cả các bản ghi có cùng `deviceName` từ cơ sở dữ liệu
//     const result = await Device.deleteMany({ deviceName });

//     res.status(200).json({ success: true, deletedCount: result.deletedCount });
//   } catch (error) {
//     res.status(500).json({ error: "Xoá các bản ghi thất bại." });
//   }
// });

app.post('/api/delete', async (req, res) => {
  const deviceNameDelete = req.body.data
  // Xác định giá trị deviceNameDelete từ req.body.data
  console.log(deviceNameDelete)
  try {
    // Xoá tất cả các bản ghi có cùng deviceNameDelete từ cơ sở dữ liệu
    const result = await deviceModel.deleteMany({ deviceName: deviceNameDelete });
    res.status(200).json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Xoá các bản ghi thất bại." });
  }
});


app.post('/api/getCPU', async (req, res) => {
  try {
    // Xoá tất cả các bản ghi có cùng deviceNameDelete từ cơ sở dữ liệu
    const deviceName = req.body.globalValue
    console.log(deviceName)
  // // Xác định giá trị deviceNameDelete từ req.body.data
  // const device = await deviceModel.find({ deviceName: deviceName });
  // //  console.log(device)
  //   console.log(device[0].cpuData.value);
  //   const cpuData = device[0].cpuData.value
  //   if(cpuData == null) cpuData = 0;
  processDataFromMQTT(deviceName,(cpuData) => {
    console.log('cpuData received in main:', cpuData);
    res.status(200).json(cpuData);
});
    
  } catch (error) {
    res.status(200).json(1);
  }
});


app.post('/api/getDataArray', async (req, res) => {
  const targetDeviceName = req.body.globalValue
  
  try {
    
        const devices = await deviceModel.find({ deviceName: targetDeviceName }).exec();
        
        const dataArray = devices.map(device => {
          return {
            timestamp: device.cpuData.timestamp,
            cpuValue: device.cpuData.value,
            ramValue: device.ramData.value
          };
        });
        
       
        res.status(200).json(dataArray);
  
  } catch (error) {
    res.status(200).json(1);
  }
});



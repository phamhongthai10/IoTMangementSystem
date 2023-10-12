const mqtt = require('mqtt');
const deviceModel = require('./deviceModel');
const mongoose = require('mongoose')

// Thông tin kết nối MQTT Broker

// Mảng chứa các deviceName
var deviceNames 
mongoose.connect('mongodb://localhost:27017/my_database')
async function getDeviceNames() {
  try {
     deviceNames = await deviceModel.distinct('deviceName');
    console.log('Danh sách deviceName:', deviceNames);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách deviceName:', error);
  }
}
getDeviceNames();
function sendMQTTToDevice(deviceName) {
  console.log(deviceName);

  return new Promise((resolve, reject) => {
    // Kết nối MQTT
    const client = mqtt.connect('mqtt://test.mosquitto.org');

    setTimeout(() => {
      const topic = deviceName; // Sử dụng tên thiết bị làm topic
      var cpu_value = 0;
      var ram_value = 0;
      // Gửi MQTT message
      client.publish(topic, 'cpuData', () => {
       
      });
      setTimeout(() => {
        client.publish(topic, 'ramData', () => {
         
        });
      }, 300);

      // Ngắt kết nối sau 2 giây
      setTimeout(() => {
        client.end(() => {
          mongoose.connect('mongodb://localhost:27017/my_database')
  .then(function(){
    console.log("Connect database success")
  })
  .catch(function(error){
    console.log("ERROR DB")
  })
  
  // Kiểm tra và chuyển đổi cpu_value thành số hoặc gán giá trị mặc định là 0
if (isNaN(cpu_value)) {
  cpu_value = 0;
} else {
  cpu_value = Math.ceil(cpu_value); // Chuyển đổi thành số thực (float)
}

// Kiểm tra và chuyển đổi ram_value thành số hoặc gán giá trị mặc định là 0
if (isNaN(ram_value)) {
  ram_value = 0;
} else {
  ram_value = Math.ceil(ram_value); // Chuyển đổi thành số thực (float)
}

// Tiếp tục với việc tạo đối tượng và sử dụng cpu_value và ram_value đã được xử lý
deviceModel.create({
  deviceName: deviceName,
  topicName: 'test',
  cpuData: { timestamp: new Date(), value: cpu_value },
  ramData: { timestamp: new Date(), value: ram_value }
});

          
        });

        resolve({cpu_value,ram_value});
      }, 3000);

      // Nhận dữ liệu
      client.on('connect', () => {
        client.subscribe(topic, err => {
          if (!err) {
            
          }
        });

        client.on('message', (topic, message) => {
          if (message.toString()[0] === 'c' ) {
            cpu_value = message.toString().slice(3);
            
          } else if (message.toString()[0] === 'r') {
            ram_value = message.toString().slice(3);
           
          }
        });
      });
    }, 0); // Không chờ lâu trước khi bắt đầu gửi
  });
}

// Hàm để gửi dữ liệu MQTT cho tất cả thiết bị trong mảng
function sendMQTTToDeviceNames() {
  const promises = deviceNames.map(deviceName => {
    
    return sendMQTTToDevice(deviceName);
  });

  Promise.all(promises)
    .then(values => {
      console.log('All values:', values);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Lặp lại việc gửi dữ liệu sau mỗi 60 giây
setInterval(() => {
  sendMQTTToDeviceNames();
}, 60 * 1000); // Mỗi 60 giây



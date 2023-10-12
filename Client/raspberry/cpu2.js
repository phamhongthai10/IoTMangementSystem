const os = require('os');
const mqtt = require('mqtt');
const { exec } = require('child_process');

// Thông tin kết nối tới MQTT broker
const brokerUrl = 'mqtt://test.mosquitto.org';
const topic1 = 'raspberry';
const topic2 = 'raspberryot'

// Hàm để lấy phần trăm CPU
// const getCpuPercentage = () => {
//   return new Promise((resolve, reject) => {
//     // Kiểm tra hệ điều hành
//     const isWindows = os.platform() === 'win32';

//     // Câu lệnh Linux để lấy phần trăm CPU
//     const command = isWindows
//       ? 'wmic cpu get LoadPercentage'
//       : 'grep \'cpu \' /proc/stat | awk \'{usage=($2+$4)*100/($2+$4+$5)} END {print usage}\'';

//     require('child_process').exec(command, (error, stdout, stderr) => {
//       if (error) {
//         reject(error);
//       } else {
//         const cpuPercentage = parseFloat(stdout.trim());
//         resolve(cpuPercentage);
//       }
//     });
//   });
// };

// Kết nối tới MQTT broker
const client = mqtt.connect(brokerUrl);

// Khi kết nối thành công
client.on('connect', () => {
  console.log('Connected to MQTT broker');
 client.subscribe(topic1, function (err) {
        if (err) {
          console.error('Failed to subscribe:', err);
        } else {
          console.log('Subscribed to topic:', topic1);
          
        }
      });
  // Lấy phần trăm CPU và gửi qua MQTT khi đã kết nối thành công
  client.subscribe(topic2, function (err) {
    if (err) {
      console.error('Failed to subscribe:', err);
    } else {
      console.log('Subscribed to topic:', topic2);
      
    }
  });
});
var data2 
client.on('message', function (topic1, message) {
  data = message.toString();
  console.log('Message payload:', data);

  if (data2 === 'cpuData') {
    console.log('Connected to MQTT broker2');
    var cpuPercentage;

    exec('top -b -n 1', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error output: ${stderr}`);
        return;
      }

      // Xử lý dữ liệu đầu ra từ lệnh top
      const lines = stdout.split('\n');

      // Tìm dòng chứa thông tin về CPU% trong đầu ra của top
      for (const line of lines) {
        if (line.includes('Cpu(s)')) {
          const cpuInfo2 = line.match(/Cpu\(s\).*?(\d+\.\d+)/);
          if (cpuInfo2 && cpuInfo2[1]) {
            cpuPercentage2 = parseFloat(cpuInfo[1]);
            break;
          }
        }
      }

      console.log(`CPU Percentage: ${cpuPercentage2}%`);
       client.publish(topic2,"cpu"+ cpuPercentage2.toString()); // Chuyển đổi sang chuỗi trước khi gửi
      console.log(cpuPercentage2); // In giá trị sau khi đã có nó
    });
  }
});

 


      
    
    

const os = require('os');
const mqtt = require('mqtt');
const { exec } = require('child_process');

// Thông tin kết nối tới MQTT broker
const brokerUrl = 'mqtt://test.mosquitto.org';
const topic = 'orangepi';

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
 client.subscribe(topic, function (err) {
        if (err) {
          console.error('Failed to subscribe:', err);
        } else {
          console.log('Subscribed to topic:', topic);
          
        }
      });
  // Lấy phần trăm CPU và gửi qua MQTT khi đã kết nối thành công

});
var data 
client.on('message', function (topic, message) {
      data = message.toString();
      console.log('Message payload:', data);
      // Assuming the response from the device is a string, you can store it in a variable like this:
      // Here, you can do whatever you want with the response data, such as saving it to a variable or processing it further.
      if(data  === 'cpuData'){
        console.log('Connected to MQTT broker2');
        var cpuPercentage ;
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
                const cpuInfo = line.match(/Cpu\(s\).*?(\d+\.\d+)/);
                if (cpuInfo && cpuInfo[1]) {
                  
                  
                  break;
                }
              }
            }
          
            console.log(`CPU Percentage: ${cpuPercentage}%`);
          });
          console.log(cpuPercentage);
      client.publish(topic, cpuPercentage);
      }
    });

 


      
    
    

const os = require('os');
const mqtt = require('mqtt');
const { exec } = require('child_process');

// Thông tin kết nối tới MQTT broker
const brokerUrl = 'mqtt://test.mosquitto.org';
const topic = 'orangepi';

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

  if (data === 'cpuData') {
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
          const cpuInfo = line.match(/Cpu\(s\).*?(\d+\.\d+)/);
          if (cpuInfo && cpuInfo[1]) {
            cpuPercentage = parseFloat(cpuInfo[1]);
            break;
          }
        }
      }

      console.log(`CPU Percentage: ${cpuPercentage}%`);
       client.publish(topic,"cpu"+ cpuPercentage.toString()); // Chuyển đổi sang chuỗi trước khi gửi
      console.log(cpuPercentage); // In giá trị sau khi đã có nó
    });
  }
});

 


      
    
    

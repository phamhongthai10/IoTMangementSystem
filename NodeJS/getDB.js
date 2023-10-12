const os = require('os');
const mqtt = require('mqtt');
const { exec } = require('child_process'); // Import child_process

// ... Khai báo thông tin kết nối MQTT broker và hàm getCpuPercentage không thay đổi
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
});

client.on('message', function (topic, message) {
  data = message.toString();
  console.log('Message payload:', data);

  if(data === 'reboot'){
    exec('sudo reboot');
  }
  if (data === 'ramData') {
    console.log('Connected to MQTT broker2');

    exec('free -m', (error, stdout, stderr) => {
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
  let ramPercentage = 0;

  // Tìm dòng chứa thông tin về bộ nhớ
  for (const line of lines) {
    if (line.includes('Mem:')) {
      const memInfo = line.split(/\s+/);
      if (memInfo.length >= 7) {
        const totalRam = parseFloat(memInfo[1]);
        const usedRam = parseFloat(memInfo[2]);
        ramPercentage = (totalRam > 0) ? (usedRam / totalRam) * 100 : 0;
      }
      break;
    }
  }

      console.log(`CPU Percentage: ${ramPercentage}%`); // Sửa cú pháp log
      client.publish(topic, "ram"+ ramPercentage.toString()); // Gửi thông tin CPU Percentage qua MQTT
    });
  }
});
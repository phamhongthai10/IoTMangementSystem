const mqtt = require('mqtt');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path'); // Import path module

function terminal(deviceName, command) {
  return new Promise((resolve, reject) => {
    var client = mqtt.connect('mqtt://test.mosquitto.org');
    var topic1 = deviceName + 'ter';
    var topic2 = deviceName + 'ter2';
    
    client.on('connect', () => {
      console.log('Connected to MQTT broker command', command);
      client.publish(topic1, command);
    });

    client.subscribe(topic2);

    client.on('message', (receivedTopic, message) => {
      if (receivedTopic === topic2) {
        const result = message.toString();
        console.log('Received command result:', result);

        if (result === 'ok complete') {
          resolve("done"); // Giải quyết Promise với giá trị "done"
        } else {
          const outputPath = path.join(__dirname, './output.txt');
          fs.writeFile(outputPath, result, (err) => {
            if (err) {
              reject(err); // Từ chối Promise nếu có lỗi
            } else {
              console.log('Result saved to output.txt');
              client.end();
              // Thực hiện bất kỳ xử lý nào khác với kết quả
            }
          });
        }
      }
    });
  });
}

module.exports = terminal;

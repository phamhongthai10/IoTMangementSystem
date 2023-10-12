const os = require('os');
const mqtt = require('mqtt');
const { exec } = require('child_process');

// Thông tin kết nối tới MQTT broker
const brokerUrl = 'mqtt://test.mosquitto.org';
const topic = 'orangepiter';

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
    client.on('message', (topic, message) => {
        if (topic === 'orangepiter') {
          const command = message.toString();
          console.log('Received command:', command);
      
          // Thực hiện câu lệnh và gửi kết quả lại
          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error('Error:', error);
            } else {
              console.log('Command output:', stdout);
             // client.publish('orangepiter', stdout); // Gửi kết quả lại qua chủ đề command_result
            }
          });
        }
      });

      
      [Unit]
      Description=CPU Node.js App
      After=network.target
      
      [Service]
      ExecStart=/usr/bin/node /root/Documents/cpu.js
      WorkingDirectory=/root/Documents
      Restart=always
      User=root
      Group=root
      
      [Install]
      WantedBy=multi-user.target
      
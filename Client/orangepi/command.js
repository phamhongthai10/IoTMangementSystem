const os = require('os');
const mqtt = require('mqtt');
const { exec } = require('child_process');
const fs = require('fs');

// MQTT broker connection information
const brokerUrl = 'mqtt://test.mosquitto.org';
const commandTopic = 'orangepiter'; // Ch? d? d? nh?n l?nh
const resultTopic = 'orangepiter2'; // Ch? d? d? g?i k?t qu?

// MQTT client connection
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(commandTopic, function (err) {
    if (err) {
      console.error('Failed to subscribe to command topic:', err);
    } else {
      console.log('Subscribed to command topic:', commandTopic);
    }
  });
});

client.on('message', (topic, message) => {
  if (topic === commandTopic) {
    const command = message.toString();
    console.log('Received command:', command);

    // Execute the command and write the output to a file
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', error);
        fs.writeFile('output.txt', `Error: ${error.message}`, (err) => {
          if (err) {
            console.error('Error writing to file:', err);
          } else {
            console.log('Error message saved to output.txt');
            const filePath = 'output.txt';
            const fileData = fs.readFileSync(filePath);

            // Publish the result to the resultTopic
            client.publish(resultTopic, fileData, { qos: 1, retain: false });

            console.log('File data published to resultTopic.');
            client.publish(resultTopic, 'ok complete', { qos: 1, retain: false });
          }
        });
      } else {
        console.log('Command output:', stdout);

        // Write the result to a file
        fs.writeFile('output.txt', stdout, (err) => {
          if (err) {
            console.error('Error writing to file:', err);
          } else {
            console.log('Result saved to output.txt');
            const filePath = 'output.txt';
            const fileData = fs.readFileSync(filePath);

            // Publish the result to the resultTopic
            client.publish(resultTopic, fileData, { qos: 1, retain: false });

            console.log('File data published to resultTopic.');
            client.publish(resultTopic, 'ok complete', { qos: 1, retain: false });
          }
        });
      }
    });
  }
});

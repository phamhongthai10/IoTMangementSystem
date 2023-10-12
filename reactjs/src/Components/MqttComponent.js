import React, { useEffect } from 'react';

const MqttComponent = () => {
  useEffect(() => {
    const connectToMqtt = async () => {
      // Check if the code is running in a browser environment
      if (typeof window !== 'undefined') {
        // Import the MQTT library dynamically for browser
        const mqtt = await import('mqtt');
        const brokerUrl = 'mqtt://test.mosquitto.org';
        const topic = 'testO';
        const client = mqtt.connect(brokerUrl);

        // Subscribe to a topic
        client.subscribe(topic);

        // Handle incoming messages
        client.on('message', (topic, message) => {
          console.log(`Received message: ${message.toString()}`);
          // Handle the received message here
        });

        // Clean up the client on component unmount
        return () => {
          client.end();
        };
      }
    };

    connectToMqtt();
  }, []);

  return <div>MqttComponent</div>;
};

export default MqttComponent;

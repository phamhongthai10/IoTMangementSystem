const mqtt = require('mqtt');

function rebootDevice(deviceName){
    var client = mqtt.connect('mqtt://test.mosquitto.org');
    var topic = deviceName;

    client.on('connect', () => {
        console.log('Connected to MQTT broker Reboot',topic);
        client.publish(topic, 'reboot');
    });
   
}
module.exports = rebootDevice;


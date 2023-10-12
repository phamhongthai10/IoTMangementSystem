const mqtt = require('mqtt');

function processDataFromMQTT(deviceName,callback) {
    var client = mqtt.connect('mqtt://test.mosquitto.org');
    var topic = deviceName;
    let cpuData = 0;
    let ramData = 0;
    // Gửi yêu cầu tới thiết bị qua MQTT
    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.publish(topic, 'cpuData');
        function delay500ms() {
            setTimeout(() => {

            }, 500); // Thời gian delay 500ms
          }
          // Gọi hàm để tạo đoạn delay
          delay500ms();
        client.publish(topic, 'ramData');
    });
    // Nhận dữ liệu từ MQTT và gán vào biến cpuData
    client.on('connect', () => {
        client.subscribe(topic, function (err) {
            console.log("ok")
        });
client.on('error', (error) => {
  console.error('MQTT error:', error.message);})

        client.on('message', function (topic, message) {
            tex = message.toString();
            if(tex[0]==='c'&& tex[3]!='D')
            {
            cpuData = tex.slice(3)

            }
            else if(tex[0]==='r'&& tex[3]!='D')
            {
                ramData = tex.slice(3)
            }
           
        });
    });
    // Nhận dữ liệu từ MQTT và gán vào biến cpuData
    setTimeout(() => {
      callback({cpuData,ramData});
        if (cpuData !== 0) {
            // Lưu dữ liệu vào cơ sở dữ liệu hoặc xử lý theo nhu cầu của bạn
            client.end();
        } else {
            client.end();
        }
    }, 5000);
}
module.exports = processDataFromMQTT;

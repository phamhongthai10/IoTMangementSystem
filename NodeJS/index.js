const brokerUrl = 'mqtt://broker.hivemq.com'; // Replace with your MQTT broker URL
const express = require('express');
const app = express();
const cors = require("cors")

var mqtt = require('mqtt')
var client = mqtt.connect(brokerUrl)
var topic ='testO'

app.use(cors())

client.on('connect', ()=>{
  client.subscribe(topic)
 
})
var myValue ='o'
client.on('message', (topic,message)=>
{
  message = message.toString()
  myValue=message;
  console.log(myValue)

})

app.get('http://localhost:3001/api/add-device', (req, res) => {
        
    res.json({ value: myValue });
  });
  app.listen(5001, () => {
    console.log('gg');
  });

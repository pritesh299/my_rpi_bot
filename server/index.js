
const express = require('express');
const {createServer} =require('http')
const { Server} =require('socket.io')
const bodyParser=require('body-parser')
const {SerialPort} =require('serialport');
const { exec } = require('child_process');

const dotenv=require('dotenv').config()
const app = express();
const corsOptions={
   origin:'*',//change this later
   credentials:true,
   methods:['GET','POST']
}
const httpServer= new createServer(app);
const io = require("socket.io")(httpServer, corsOptions);

app.use(bodyParser.urlencoded({extended:false}))
/* 
const serial_port= new SerialPort({path:process.env.Arduino_PORT,baudRate:9600}) */
io.on('connection',(socket)=>{
  console.log('connected')
 
  

  /* socket.on('control',(a)=>{
    if(a==='w'){
      serial_port.write('1')
    }
    else if(a==='s'){
      serial_port.write('2')
      }
    else if(a==='a'){
        serial_port.write('3')
    }
    else if(a==='d'){
          serial_port.write('4')
    }    
  }) */

})

function captureAndStream() {
  exec('fswebcam -', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      // Emit captured image as base64 encoded string
      io.emit('videoStream', Buffer.from(stdout).toString('base64'));
  });
}

setInterval(captureAndStream, 1000/24);
const port=800;
httpServer.listen(port, () => console.log(`Server is listening on PORT ${port}`));

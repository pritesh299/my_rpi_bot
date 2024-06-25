
const express = require('express');
const NodeWebcam= require('node-webcam')
const ffmpeg= require('fluent-ffmpeg')
const {spawn}= require('child_process')
const {createServer} =require('http')
const { Server} =require('socket.io')
const bodyParser=require('body-parser')
const {SerialPort} =require('serialport');
const dotenv=require('dotenv').config()
const app = express();
const corsOptions={
   origin:'*',//change this later
   credentials:true,
   methods:['GET','POST']
}
const httpServer= new createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const ffmpegProcess = spawn('ffmpeg', [
  '-f', 'v4l2',  // Use the Video4Linux2 input device
  '-i', '/dev/video0',  // The input device (webcam)
  '-f', 'mpeg1video',  // Output format
  '-b:v', '800k',  // Video bitrate
  '-r', '30',  // Frame rate
  'pipe:1'  // Output to stdout
]);

app.use(bodyParser.urlencoded({extended:false}))

const serial_port= new SerialPort({path:process.env.Arduino_PORT,baudRate:9600})
io.on('connection',(socket)=>{
  console.log('connected')
 
  
  ffmpegProcess.stdout.on('data', (data) => {
    io.emit('videoStream', data);
  });
 
  ffmpegProcess.on('close', (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
  });
  socket.on('control',(a)=>{
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
  })

})


//Creates the server on default port 8000 and can be accessed through localhost:8000
const port=8000;
httpServer.listen(port, () => console.log(`Server is listening on PORT ${port}`));

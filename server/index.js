
const express = require('express');
const {createServer} =require('http')
const { Server} =require('socket.io')
const bodyParser=require('body-parser')
const {SerialPort} =require('serialport');
const fs = require('node:fs');
const NodeWebcam  =require("node-webcam") 
const dotenv=require('dotenv').config()
const app = express();

const httpServer= new createServer(app);
const io = require("socket.io")(httpServer,  {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
var opts = {
  width: 1280,
  height: 720,
  quality: 100,
  frames: 60,
  delay: 0,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "location",
  verbose: false,
   callbackReturn: "base64"
}


app.use(bodyParser.urlencoded({extended:false}))
const Webcam= NodeWebcam.create(opts)


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
function streamVideo(){
  Webcam.capture( "test_picture", ( err, base64Image )=>{
    if(err){
      console.log('Error'+err)
    }else{
      io.emit('videoStream',base64Image)
    }
  } );
}
setInterval(streamVideo,1000/24)
const port=8000;
httpServer.listen(port, () => console.log(`Server is listening on PORT ${port}`));


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

const Webcam= NodeWebcam.create()
Webcam.capture( "test_picture", ( err, data )=>{console.log(data)} );
const port=8000;
httpServer.listen(port, () => console.log(`Server is listening on PORT ${port}`));

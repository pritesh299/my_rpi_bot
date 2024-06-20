
const express = require('express');
const { spawnSync } = require('child_process');
const { readFile } = require('fs/promises');
const { appendFile } = require('fs/promises');
const { join } = require('path');
const {createServer} =require('http')
const { Server} =require('socket.io')
const bodyParser=require('body-parser')

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


app.use(bodyParser.urlencoded({extended:false}))

io.on('connection',(socket)=>{
  console.log('connected')
  socket.on('control',(a)=>{
    test(a)
  })
})

async function test(instruction) {
   await appendFile(
            join(`./instruction.txt`),
            instruction,
            {
                encoding: 'utf-8',
                flag: 'w',
            },
        );
}


// setInterval(()=>{test('w')},1000)
//Creates the server on default port 8000 and can be accessed through localhost:8000
const port=8000;
httpServer.listen(port, () => console.log(`Server is listening on PORT ${port}`));

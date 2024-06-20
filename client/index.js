import io from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js'
const server_url='192.168.0.101:8000'
const x_button=document.getElementById('x-button')

const socket= io(server_url)
let connected=false
let control=''
socket.on('connect',()=>{
    console.log("connect",socket.id)
    connected=true
    document.addEventListener('keydown',(event)=>{
      control=event.key.toLowerCase()
        if(control==='w'|| control==='s'|| control==='a'||control==='d' ){
           socket.emit('control',control)
        }
   })

})

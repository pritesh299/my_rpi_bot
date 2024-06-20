import io from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js'
import { environment } from './environment.js'
const socket= io(environment.server_url)
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

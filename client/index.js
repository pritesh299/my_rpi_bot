import io from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js'
import { environment } from './environment.js'
const socket= io(environment.server_url)
let connected=false
const webCamImg=document.getElementById('web_cam_img')
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


const videoElement = document.getElementById('video-feed');

socket.on('videoStream', (image) => {
    videoElement.src = 'data:image/jpeg;base64,' + image;
});

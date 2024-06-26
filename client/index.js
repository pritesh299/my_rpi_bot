import io from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js'
import { environment } from './environment.js'


const socket= io(environment.server_url)
const videoConatiner=document.getElementById('video')

let control=''
const peer = new Peer();
  

socket.on('connect',()=>{
    console.log("connect",socket.id)
    document.addEventListener('keydown',(event)=>{
      control=event.key.toLowerCase()
        if(control==='w'|| control==='s'|| control==='a'||control==='d' ){
           socket.emit('control',control)
        }
   })

    peer.on('open', function(id) {
      socket.emit("join-room", id);
      console.log('joined room with id:',id)
    });

    peer.on('call', function(call) {
      call.on('stream', function(remoteStream) {
        videoConatiner.src=remoteStream
        videoConatiner.addEventListener("loadedmetadata", () => {
          videoConatiner.play();
      });
    })
   
}) 
})
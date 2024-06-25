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

    const remoteVideo = document.getElementById('remoteVideo');
    const mediaSource = new MediaSource();
    remoteVideo.src = URL.createObjectURL(mediaSource);

    let sourceBuffer;
    const queue = [];
    let isAppending = false;

    mediaSource.addEventListener('sourceopen', () => {
      console.log('MediaSource opened');
      sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"');

      sourceBuffer.addEventListener('updateend', () => {
        isAppending = false;
        appendToBuffer();
      });

      sourceBuffer.addEventListener('error', (e) => {
        console.error('SourceBuffer error:', e);
      });

      socket.on('videoStream', (data) => {
        queue.push(new Uint8Array(data));
        appendToBuffer();
      });
    });

    mediaSource.addEventListener('error', (e) => {
      console.error('MediaSource error:', e);
    });

    function appendToBuffer() {
      if (!sourceBuffer || isAppending || queue.length === 0 || sourceBuffer.updating) {
        return;
      }
      isAppending = true;
      try {
        sourceBuffer.appendBuffer(queue.shift());
      } catch (e) {
        console.error('Failed to append buffer:', e);
        isAppending = false;
        // If we catch an error, we might need to reset the MediaSource
        resetMediaSource();
      }
    }

    function resetMediaSource() {
      if (mediaSource.readyState === 'open') {
        mediaSource.endOfStream();
      }
      const newMediaSource = new MediaSource();
      remoteVideo.src = URL.createObjectURL(newMediaSource);

      newMediaSource.addEventListener('sourceopen', () => {
        sourceBuffer = newMediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"');

        sourceBuffer.addEventListener('updateend', () => {
          isAppending = false;
          appendToBuffer();
        });

        sourceBuffer.addEventListener('error', (e) => {
          console.error('SourceBuffer error:', e);
        });

        // Transfer the remaining queue to the new SourceBuffer
        appendToBuffer();
      });

      newMediaSource.addEventListener('error', (e) => {
        console.error('MediaSource error:', e);
      });
    }
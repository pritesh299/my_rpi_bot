import json
import keyboard as kbd
import time
from serial_connect import ser

json_obj = open('/home/club/repos/car_server/server/args.json')
data = json.load(json_obj)

for i in range(4):
        ser.write(b'1')
        time.sleep(0.2)
# if sys.argv[1] == 'sendInstruction':
#  for i in range(100):
#     ser.write(b'1')
#     time.sleep(0.01)
    
#     instruction=data["instruction"]
    
  

    




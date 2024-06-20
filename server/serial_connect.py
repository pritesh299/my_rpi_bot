import serial
import time
import json
import os
from dotenv import load_dotenv
load_dotenv()
serial_port=os.getenv('Arduino_PORT')
# Serial port initialization
ser = serial.Serial(serial_port, 9600, timeout=1)

# Constants for command execution
COMMAND_MAP = {
    'w': {'command': b'1', 'repeat': 4},
    's': {'command': b'2', 'repeat': 4},
    'a': {'command': b'3', 'repeat': 4},
    'd': {'command': b'1', 'repeat': 4}
}

# File paths
INSTRUCTION_PATH = './instruction.txt'
# Function to read instruction from file
def read_file(path):
    try:
        with open(path, 'r') as file:
            return file.readline().strip()
    except FileNotFoundError:
        return None

def control(data):
    command_info = COMMAND_MAP.get(data)
    if command_info:
        command = command_info['command']
        for i in range(command_info['repeat']):
         ser.write(command)
         time.sleep(0.001)
    else:
        print(f"Unknown command: {data}")

def main():
    last_Instruction_modified = os.path.getmtime(INSTRUCTION_PATH)
    while True:
        current_Instruction_modified = os.path.getmtime(INSTRUCTION_PATH)
        if current_Instruction_modified != last_Instruction_modified:
            last_Instruction_modified = current_Instruction_modified
            instruction = read_file(INSTRUCTION_PATH)
           
            if instruction:
                control(instruction)
            else:
                print("No valid instruction found in file.")
        time.sleep(0.1) 

if __name__ == "__main__":
    main()

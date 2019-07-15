# coding: utf-8

import sys
import time
import serial
import datetime
import logging
"""
try:
    ser = serial.Serial(port='/dev/ttyUSB0', baudrate=115200, timeout=7, rtscts=0) #COM4
except:
    print("USE ERROR")
"""

logging.basicConfig(filename='app.log',level=logging.INFO)


def getdate():
    return str(datetime.datetime.now())

"""
def parsegsm(mess, type):
    if type == "com":
        mess += "\r"
    ser.write(mess.encode())
    time.sleep(3)
    ret = []
    msg = ser.readlines()
    for index, hardline in enumerate(msg):
        line = hardline.decode('utf-8').replace('\r\n', '').replace('\n', '')
        if line != "":
            if "+CMGL" in line:
                ret.append(line + "," + msg[index+1].decode('utf-8').replace('\r\n', '').replace('\n', ''))
    return ret

def init():
    parsegsm('AT+CMGD=1,4', "com")

def GCUSend(num, message):
    parsegsm('AT+CMGS="' + num + '"', "com")
    parsegsm(message + "\x1a", "mess")
"""

try:
    to = sys.argv[1]
    message = sys.argv[2]

    #init()

    to_list = to.split("; ")

    for infos in to_list:

        if(":" in infos):
            infos_list = infos.split(":")
            name = infos_list[0]
            num = infos_list[1]
        else:
            num = infos
            name = infos
        #GCUSend(num, message)

        print("OK")
        logging.info(getdate() + " Sent to : " + name)
except:
    logging.error(getdate() + " [FATAL ERROR]")
    print("ERROR")

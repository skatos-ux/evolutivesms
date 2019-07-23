# coding: utf-8

import sys
import fcntl
import time
import serial
import datetime
import logging

logging.basicConfig(filename='app.log',level=logging.INFO)


def getdate():
    return str(datetime.datetime.now())

ser = serial.Serial(port='/dev/ttyAMA0', baudrate=9600, timeout=1, rtscts=0) #COM4

try:
    fcntl.flock(ser.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
except IOError:
    logging.error(getdate() + " [USE ERROR]")
    print("USE ERR")
    sys.exit()

def parsegsm(mess, type):
    if type == "com":
        mess += "\r\n"
    ser.write(mess.encode())
    time.sleep(0.5)
    ret = []
    msg = ser.readlines()
    for index, hardline in enumerate(msg):
        line = hardline.decode('latin-1').replace('\r\n', '').replace('\n', '')
    return line

def init():
    parsegsm('AT+CMGD=1,4', "com")

def GCUSend(num, message):
    if "99,99" in parsegsm('AT+CSQ', "com"):
        logging.error(getdate() + " [NO NETWORK]")
        print("PART ERR")
    parsegsm('AT+CMEE=2', "com")
    parsegsm('AT+CMGS="' + num + '"', "com")
    if "+CMS ERROR" in parsegsm(message + "\x1a", "mess"):
        logging.error(getdate() + " [CMS ERROR]")
        print("PART ERR")



try:
    to = sys.argv[1]
    message = sys.argv[2]

    #init()

    to_list = to.split("; ")

    for infos in to_list:

        if(":" in infos):
            infos_list = infos.split(":  ")
            name = infos_list[0]
            num = "+" + infos_list[1]
        else:
            num = "+" + infos
            name = infos
        GCUSend(num, message)

        print("OK")
        logging.info(getdate() + " Sent to : " + name)
except:
    logging.error(getdate() + " [FATAL ERROR]")
    print("ERROR")

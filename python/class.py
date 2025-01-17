# coding: utf-8

import sys
import fcntl
import time
import serial
import datetime
import logging

logging.basicConfig(filename='app.log',level=logging.INFO)

parterror = ""
error = ""
lastname = ""

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
    line = ""
    msg = ser.readlines()
    for index, hardline in enumerate(msg):
        line += hardline.decode('latin-1').replace('\r\n', '').replace('\n', '')
    return line

def init():
    parsegsm('AT+CMGD=1,4', "com")

def GCUSend(name, num, message):
    global parterror
    result = parsegsm('AT+CSQ', "com")
    if "99,99" in result:
        logging.error(getdate() + " [NO NETWORK]: " +result)
        parterror += name + "; "
    else:
        parsegsm('AT+CMEE=2', "com")
        parsegsm('AT+CMGS="' + num + '"', "com")
        result = parsegsm(message + "\x1a", "mess")
        if "+CMS ERROR" in result:
            logging.error(getdate() + " [CMS ERROR]: " +result)
            parterror += name + "; "



try:
    to = sys.argv[1]
    message = sys.argv[2]

    #init()

    to_list = to.split(";")

    for infos in to_list:

        if(":" in infos):
            infos_list = infos.split(": ")
            name = infos_list[0]
            num = infos_list[1]
        else:
            num = infos
            name = infos

        logging.info(getdate() + " Send attempt to : " + name)
        GCUSend(name, num, message)
        lastnum = num + "; ";

    if(parterror == ""):
        print("OK")
    else:
        print("PART ERR : " + parterror)


except:
    logging.error(getdate() + " [FATAL ERROR]: " + str(sys.exc_info()))
    error = to.split(lastnum,1)[1]
    print("ERROR : " + error)

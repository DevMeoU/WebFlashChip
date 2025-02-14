# Lấy thông tin cổng USB của máy tính
# Cách chạy: python getUSBPort.py
import serial.tools.list_ports

ports = serial.tools.list_ports.comports()
for port, desc, hwid in sorted(ports):
    print("{}: {} [{}]".format(port, desc, hwid))

f = open("USBPort.txt", "w")
for port, desc, hwid in sorted(ports):
    f.write("{}".format(port) + "\n")

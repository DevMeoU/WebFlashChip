import subprocess

# Cấu hình các tham số cho avrdude:
# -p: loại chip, đối với Arduino Uno thường là atmega328p
# -c: loại programmer, với Arduino Uno thường là "arduino"
# -P: cổng serial (COM3 trên Windows, /dev/ttyUSB0 hoặc /dev/ttyACM0 trên Linux)
# -b: tốc độ baud, thường là 115200 đối với Arduino Uno
# -U: thao tác với bộ nhớ flash, ví dụ: flash:w:your_hex_file.hex:i (w: write, i: intel hex)
avrdude_command = [
    r"E:\Workspace\python\LoadFirmware\tool-avrdude\avrdude.exe",
    "-p", "atmega328p",
    "-c", "arduino",
    "-P", "COM3",
    "-b", "115200",
    "-U", "flash:w:firmware_1.hex:i"
]

try:
    result = subprocess.run(avrdude_command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    print("Upload successful!")
    print(result.stdout)
except subprocess.CalledProcessError as e:
    print("Error during upload:")
    print(e.stderr)

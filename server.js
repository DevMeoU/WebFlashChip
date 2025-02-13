const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const cors = require('cors');
const { SerialPort } = require('serialport');

const app = express();
app.use(cors());
app.use(express.static('public'));

// Cấu hình upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

// API lấy danh sách cổng COM
app.get('/ports', async (req, res) => {
  try {
    const ports = await SerialPort.list();
    res.json(ports);
  } catch (err) {
    res.status(500).send(err);
  }
});

// API nạp firmware
app.post('/upload', upload.single('firmware'), (req, res) => {
  const port = req.body.port;
  const filePath = req.file.path;

  const cmd = `"./tool-avrdude/avrdude.exe" -p atmega328p -c arduino -P ${port} -b 115200 -U flash:w:"${filePath}":i`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        error: error.message,
        stderr
      });
    }
    res.json({ success: true, output: stdout });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

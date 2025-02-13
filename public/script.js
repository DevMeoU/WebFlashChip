async function refreshPorts() {
  const response = await fetch('/ports');
  const ports = await response.json();
  
  const select = document.getElementById('ports');
  select.innerHTML = ports.map(port => 
    `<option value="${port.path}">${port.path} - ${port.manufacturer}</option>`
  ).join('');
}

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  const fileInput = document.getElementById('firmware');
  const port = document.getElementById('ports').value;
  
  formData.append('firmware', fileInput.files[0]);
  formData.append('port', port);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    document.getElementById('status').textContent = 
      result.success ? 'Nạp thành công!\n' + result.output 
                     : 'Lỗi:\n' + result.error;
  } catch (err) {
    console.error('Error:', err);
  }
});

// Khởi động
refreshPorts();

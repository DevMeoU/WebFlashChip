async function refreshPorts() {
    if (!('serial' in navigator)) {
        console.error('Web Serial API không được hỗ trợ trên trình duyệt này.');
        return;
    }

    try {
        // Lấy các cổng đã được cấp quyền truy cập từ trước
        let ports = await navigator.serial.getPorts();
        console.log(ports);

        // Nếu không có cổng nào, yêu cầu người dùng chọn một cổng (hành động này phải được gọi từ một user gesture)
        if (ports.length === 0) {
            console.log('Chưa có cổng nào được cấp quyền truy cập từ trước.');
            await navigator.serial.requestPort();
            ports = await navigator.serial.getPorts();
        }

        const select = document.getElementById('ports');
        // Cập nhật danh sách các cổng vào select element

        select.innerHTML = ports.map((port, index) => {
            const portName = `COM${index + 3}`;
            return `<option value="${portName}">${portName}</option>`;
        }).join('');
    } catch (err) {
        console.error('Lỗi khi lấy danh sách các cổng:', err);
    }
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

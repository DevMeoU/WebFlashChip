# WebFlashChip

WebFlashChip is a Node.js application that provides a server for uploading firmware files to devices via COM ports. It utilizes Express for handling HTTP requests and Multer for managing file uploads.

## Project Structure

- **public/**: Contains static files such as HTML, CSS, and JavaScript.
- **uploads/**: Directory for storing uploaded firmware files.
- **server.js**: Main server file that sets up the Express server and defines API endpoints.
- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **README.md**: Documentation for the project.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd WebFlashChip
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   node server.js
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

- **GET /ports**: Retrieves a list of available COM ports.
- **POST /upload**: Uploads a firmware file to the specified COM port.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
# NodeJs Chat

This is a simple WebSocket practice application that demonstrates how to work with websockets using Node.js and Socket.IO. It includes basic functionality to join chat rooms, send and receive messages, and track users in a room.

## Prerequisites

To run this application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/maxmanukian/nodejs-chat.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nodejs-chat
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=3000
   ```

   Note: You can choose a different port number if port 3000 is already in use.

## Usage

1. Start the server by running the following command:

   ```bash
   npm start
   ```

   This will start the server and display a message indicating that the application has started.

2. Open your web browser and navigate to `http://localhost:3000` (or the port you specified in the `.env` file).

3. Enter your desired username and chat room name to join the chat.

4. Start sending and receiving messages in real-time with other users in the same chat room.


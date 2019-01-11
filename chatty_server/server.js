const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const app = express();

// Create the WebSockets server
const wss = new SocketServer({ server });

// Store both messages and notifications to be sent over to client side
const messageDatabase = [];

// Broadcast data as JSON object and to all clients connected to the server
wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

//Broadcasts number of connected clients to all clients. Also recieves data from client side
// and parses it so that it can be determined whether it is a notification or message.
// Depending on whether they are a POSTed notificaiton or POSTed message, they are categorized
// as an incomingMessage (if so, then it gets a UUID) or incomingNotification.
wss.on('connection', (ws) => {
  console.log('Client connected');
  var clientsConnected = wss.clients.size;
  wss.broadcastJSON(clientsConnected);

 ws.on('message', data => {
    var convertedBackToJSON = JSON.parse(data);

    switch (convertedBackToJSON.type){
      case 'postMessage':
        const objectToBroadcast = {
          id: uuid(),
          content: convertedBackToJSON.content,
          username: convertedBackToJSON.username,
          type: "incomingMessage"
          };
        messageDatabase.push(objectToBroadcast);
        wss.broadcastJSON(objectToBroadcast);
        break;
      case 'postNotification':
        const objectToBroadcastTwo = {
          content: convertedBackToJSON.content,
          type: "incomingNotification"
        }
        messageDatabase.push(objectToBroadcastTwo);
        wss.broadcastJSON(objectToBroadcastTwo);
        break;
      default:
        throw new Error ("Some error happened");
    }
  });

// Close the connection. Also broadcasts changes in thh number of connect clients.
  ws.on('close', function(){
    console.log('Client disconnected');
    wss.broadcastJSON(wss.clients.size);
  }
    );
});

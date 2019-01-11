// const express = require('express');
// const SocketServer = require('ws').Server;
// const uuid = require('uuid/v4')


const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
// const SocketServer = require('ws').Server;
const uuid = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const app = express()

// Create the WebSockets server
const wss = new SocketServer({ server });


app.get('/', (req, res) => {
  res.send('Hello')
})

const messageDatabase = [];

wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log("This is wss clients: ", wss.clients.size)
  var clientsConnected = wss.clients.size
  wss.broadcastJSON(clientsConnected)

 ws.on('message', data => {
    console.log(`Got message from the client ${data}`);
    var convertedBackToJSON = JSON.parse(data)
    console.log(`This is user ${convertedBackToJSON.username} sending message of ${convertedBackToJSON.content}`)


    switch (convertedBackToJSON.type){
      case 'postMessage':
        const objectToBroadcast = {
          id: uuid(),
          content: convertedBackToJSON.content,
          username: convertedBackToJSON.username,
          type: "incomingMessage"
          };
        messageDatabase.push(objectToBroadcast);
        wss.broadcastJSON(objectToBroadcast)
        break;
      case 'postNotification':
        const objectToBroadcastTwo = {
          content: convertedBackToJSON.content,
          type: "incomingNotification"
        }
        messageDatabase.push(objectToBroadcastTwo)
        wss.broadcastJSON(objectToBroadcastTwo)
        console.log("This is OTB2: ", objectToBroadcastTwo)
        break;
      default:
        throw new Error ("Some error happened")
    }
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // ws.on('close', () => console.log('Client disconnected')
  //   console.log("This is wss clients: ", wss.clients.size)
  //   );

  ws.on('close', function(){
    console.log('Client disconnected')
    wss.broadcastJSON(wss.clients.size)
    console.log("This is wss clients: ", wss.clients.size)
  }
    );

  // ws.send('something');
});

// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
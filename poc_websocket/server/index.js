const WebSocket = require('ws');
const http = require('http');

const express = require('express');

const app = express();

const serverHttp = http.createServer(app);


const wss = new WebSocket.Server({ 
  server: serverHttp
});

wss.on('connection', (ws,req) => {
  console.log('client', req.connection.remoteAddress);
  if (ws.readyState === ws.OPEN) {
    ws.on('message', (message) => {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  }
});

//start our server
serverHttp.listen(45230, () => {
  console.log(`Server started on port ${serverHttp.address().port} :)`);
});


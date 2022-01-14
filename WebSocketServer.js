const ws_ = require('ws');

const wss = new ws_.WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, req) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  console.log(req.socket.remoteAddress)
  ws.send('something');
});

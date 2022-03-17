const ws_ = require('ws');

const wss = new ws_.WebSocketServer({ port: 8080 });
console.log('listening on port 8080');
const clients = [];

wss.on('connection', function connection(ws, req) {
  ws.on('message', function message(data) {
    //console.log('received: %s', data);
    clients.forEach(client => client.send(data.toString()));
  });
  // console.log(req.socket.remoteAddress)
  ws.index = clients.length;
  clients.push(ws);
  console.log('New client connection, no: ', ws.index)
});

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

const uid = Math.random();

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('{"msg": "Hello Server!"}');
});

// // Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', JSON.parse(event.data));
    // Supervisor.send({ req: 'add_actor', type: 'mouse-coordinate', name: 'mymouse' });
});
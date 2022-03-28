import { modifyMouseActor } from "./Cursor.js";

// Create WebSocket connection.
window.socket = new WebSocket('ws://localhost:8080');

window.uid = Math.random();

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('{"msg": "Hello Server!"}');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    const coordinates = JSON.parse(event.data);
    if (coordinates.uid == self.uid || !coordinates.uid) { return };
    let name = 'mouse' + coordinates.uid;
    if (Supervisor.getstate('children')[name]) {
        modifyMouseActor(name, coordinates.x, coordinates.y, coordinates.uid);
    }else{
        Supervisor.send({ req: 'add_actor', type: 'mouse-coordinate', name });
    }
    
});
import { Actor } from './Actor.js';

const coordinateProcessor = (message, self) => {
  let cursor = self.getstate('cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.setAttribute('class', 'cursor');
    document.body.appendChild(cursor);
    return { cursor };
  }
  cursor.style.top = `${message.y}px`;
  cursor.style.left = `${message.x}px`;
}

const modifyMouseActor = (name, x, y) => {
  if (!myMouseActor) {
    Supervisor.send({ req: 'add_actor', type: 'mouse-coordinate', name: 'mymouse' });
    const newMouseActor = Supervisor.getstate('children')[name];
    if (!newMouseActor) { return };
    myMouseActor = newMouseActor;
    myMouseActor.addProcessor(coordinateProcessor);
  } else {
    let message = {x, y};
    myMouseActor.send(message);
    socket.send(JSON.stringify({uid, ...message}));
  }
}

window.addEventListener('mousemove', (e) => {
  modifyMouseActor('mymouse', e.x, e.y)
});
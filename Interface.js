import { Actor } from './Actor.js';

let myMouseActor = false;

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

window.addEventListener('mousemove', (e) => {
  if (!myMouseActor) {
    const newMouseActor = Supervisor.getstate('children')['mymouse'];
    if (!newMouseActor) { return };
    myMouseActor = newMouseActor;
    myMouseActor.addProcessor(coordinateProcessor);
  } else {
    let message = {x: e.x, y: e.y};
    myMouseActor.send(message);
  }
});

//next step is adding another cursor over the network
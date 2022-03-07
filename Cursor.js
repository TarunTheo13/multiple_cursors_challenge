import { Actor } from './Actor.js';
import { coordinateProcessor } from './Processors/CoordinateProcessor.js';

let myMouseActor = false;

const modifyMouseActor = (name, x, y) => {
  if (!myMouseActor) {
    // Supervisor.send({ req: 'add_actor', type: 'mouse-coordinate', name: 'mymouse' });
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
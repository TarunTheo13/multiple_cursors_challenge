import { Actor } from './Actor.js';

Supervisor.send({ req: 'add_actor', type: 'mouse-coordinate', name: 'mymouse' });
window.addEventListener('mousemove', (e) => {
  let message = {x: e.x, y: e.y};
  Supervisor.getstate().children['mymouse'].send(message);
});

//Next step: Create function to process co-ordinates
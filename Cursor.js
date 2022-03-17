import { Actor } from './Actor.js';

const modifyMouseActor = (name, x, y) => {
  const mouseActor = Supervisor.getstate('children')[name];
  let message = {x, y};
  mouseActor.send(message);
}

window.addEventListener('mousemove', (e) => {
  modifyMouseActor('mymouse', e.x, e.y)
  socket.send(JSON.stringify({uid, x: e.x, y: e.y}));
});

export { modifyMouseActor }
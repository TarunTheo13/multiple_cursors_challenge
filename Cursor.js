import { Actor } from './Actor.js';

const modifyMouseActor = (name, x, y, uid) => {
  const mouseActor = Supervisor.getstate('children')[name];
  let message = {x, y, uid};
  mouseActor.send(message);
}

window.addEventListener('mousemove', (e) => {
  modifyMouseActor('mymouse', e.x, e.y, window.uid)
  socket.send(JSON.stringify({uid, x: e.x, y: e.y}));
});

export { modifyMouseActor }
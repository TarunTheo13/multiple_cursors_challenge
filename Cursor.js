import { Actor } from './Actor.js';

const modifyMouseActor = (name, x, y) => {
  const mouseActor = Supervisor.getstate('children')[name];
  let message = {x, y};
  mouseActor.send(message);
  socket.send(JSON.stringify({uid, ...message}));
}

window.addEventListener('mousemove', (e) => {
  modifyMouseActor('mymouse', e.x, e.y)
});

export { modifyMouseActor }
import { Actor } from './Actor.js';
import { addActor } from './Processors/AddActor.js';

window.Supervisor = new Actor('supervisor');
Supervisor.addProcessor(addActor);
// Supervisor.send({ req: 'add_actor', type: 'generator', name: 'Bob' });
// Supervisor.send({ req: 'add_actor', type: 'destroyer', name: 'Harry' });
Supervisor.send({ req: 'add_actor', type: 'mouse-coordinate', name: 'mymouse' });

let actorLoop = () => { 
  Supervisor.processInbox();
  Object.values(Supervisor.getstate('children')).forEach(child => {child.processInbox()});
  setTimeout(actorLoop, 0);
  //fpsLoop();
};

actorLoop();
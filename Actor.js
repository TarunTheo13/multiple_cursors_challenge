import { fpsLoop } from './fpsLoop.js';

class Actor {
  #state;
  #inbox;
  #procesors;
  name;

  constructor(name) {
    this.#state = {};
    this.#inbox = [];
    this.#procesors = [];
    this.name = name;
  }

  getstate(key) {
    if ( key===undefined) return { ...this.#state };
    if ( (typeof key)==='string' ) return this.#state[key]
  }

  send(message) {
    this.#inbox.push(message);
  }

  processInbox() {
    if (!this.#inbox.length) {return};
    let message = this.#inbox.shift();
    //console.log(message);
    this.#procesors.forEach(process => { this.#state = { ...this.#state, ...process(message, this)} });
  }

  addProcessor(func) {
    this.#procesors.push(func);
  }
}


const addActor = (message, self) => {
  let children = self.getstate().children || {};
  if (message.req == 'add_actor') {
    children[message.name] = new Actor(message.name);
  }
  return { children };
}

window.Supervisor = new Actor('supervisor');
Supervisor.addProcessor(addActor);
Supervisor.send({ req: 'add_actor', type: 'generator', name: 'Bob' });
Supervisor.send({ req: 'add_actor', type: 'destroyer', name: 'Harry' });
Supervisor.send({ req: 'add_actor', type: 'mouse-coordinate', name: 'mymouse' });

let actorLoop = () => { 
  Supervisor.processInbox();
  Object.values(Supervisor.getstate().children).forEach(child => {child.processInbox()});
  setTimeout(actorLoop, 0);
  //fpsLoop();
};

actorLoop()
export { Actor };

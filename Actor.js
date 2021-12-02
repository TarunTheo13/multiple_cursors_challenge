import { fpsLoop } from './fpsLoop.js';

class Actor {
  #state;
  #inbox;
  #proccesors;
  name;

  constructor(name) {
    this.#state = {};
    this.#inbox = [];
    this.#proccesors = [];
    this.name = name;
  }

  getstate() {
    return { ...this.#state };
  }

  send(message) {
    this.#inbox.push(message);
  }

  processInbox() {
    if (!this.#inbox.length) {return};
    let message = this.#inbox.shift();
    console.log(message);
    this.#proccesors.forEach(process => { this.#state = { ...this.#state, ...process(message, this)} });
  }

  addProccessor(func) {
    this.#proccesors.push(func);
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
Supervisor.addProccessor(addActor);
Supervisor.send({ req: 'add_actor', type: 'generator', name: 'Bob' });
Supervisor.send({ req: 'add_actor', type: 'destroyer', name: 'Harry' });

let Loop = () => { 
  Supervisor.processInbox();
  Object.values(Supervisor.getstate().children).forEach(child => {child.processInbox()});
  setTimeout(Loop, 0);
  //fpsLoop();
};

Loop()

export { Actor };
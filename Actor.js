const fpsLoop = require ('./fpsLoop.js');

class Actor {
  #state;
  #inbox;
  #proccesors;
  name;

  constructor(name) {
    this.#state = { X: 108 };
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
    console.log(this.#inbox);
    let message = this.#inbox.shift();
    this.#proccesors.forEach(process => { this.#state = { ...this.#state, ...process(message, this)} });
    console.log(this.#state);
  }

  addProccessor(func) {
    this.#proccesors.push(func);
  }
}


const addActor = (message, self) => {
  let children = self.getstate().children || [];
  if (message.req == 'add_actor') {
    children.push(new Actor(message.name));
  }
  return { children };
}
  
const Supervisor = new Actor('supervisor');
Supervisor.addProccessor(addActor);
Supervisor.send({ req: 'add_actor', type: 'generator', name: 'Bob' });
Supervisor.send({ req: 'add_actor', type: 'destroyer', name: 'Harry' });

let Loop = () => { 
  Supervisor.processInbox();
  setTimeout(Loop, 0);
  fpsLoop();
};

Loop()

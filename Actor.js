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
    while (this.#inbox.length) {
      let message = this.#inbox.shift();
      this.#procesors.forEach(process => { this.#state = { ...this.#state, ...process(message, this)} }); 
    }
  }

  addProcessor(func) {
    if (this.#procesors.indexOf(func) !== -1) {
      console.info('Function with this name already exists:', func.name);
    }else{
      this.#procesors.push(func);
    }
  }
}

export { Actor };

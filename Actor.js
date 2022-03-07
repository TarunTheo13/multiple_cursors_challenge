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

export { Actor };

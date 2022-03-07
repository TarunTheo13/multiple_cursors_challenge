import { Actor } from '/Actor.js';

const addActor = (message, self) => {
  let children = self.getstate().children || {};
  if (message.req == 'add_actor') {
    children[message.name] = new Actor(message.name);
  }
  return { children };
}

export { addActor }
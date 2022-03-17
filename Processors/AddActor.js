import { Actor } from '/Actor.js';
import { coordinateProcessor } from './CoordinateProcessor.js';

const addActor = (message, self) => {
  if (message.req !== 'add_actor') {return {}};
  let children = self.getstate('children') || {};
  if (children[message.name]) {
    console.info('Actor with this name already exists:', message.name);
    return {};
  }
  children[message.name] = new Actor(message.name);
  if (message.type == 'mouse-coordinate') {
    children[message.name].addProcessor(coordinateProcessor);
  }
  return { children };
}

export { addActor }
const coordinateProcessor = (message, self) => {
  let cursor = self.getstate('cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.setAttribute('class', 'cursor');
    cursor.style.background = `rgb(${[randNum(), randNum(), randNum()]})`
    document.body.appendChild(cursor);
    return { cursor };
  }
  cursor.style.top = `${message.y}px`;
  cursor.style.left = `${message.x}px`;
}

const randNum = () => {
  return Math.floor(Math.random() * 256)
}

export { coordinateProcessor }
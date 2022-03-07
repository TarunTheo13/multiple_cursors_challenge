const coordinateProcessor = (message, self) => {
  let cursor = self.getstate('cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.setAttribute('class', 'cursor');
    document.body.appendChild(cursor);
    return { cursor };
  }
  cursor.style.top = `${message.y}px`;
  cursor.style.left = `${message.x}px`;
}

export { coordinateProcessor }
const coordinateProcessor = (message, self) => {
  let cursor = self.getstate('cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.setAttribute('class', 'cursor');
    cursor.style.background = setColour(message.uid);
    document.body.appendChild(cursor);
    return { cursor };
  }
  cursor.style.top = `${message.y}px`;
  cursor.style.left = `${message.x}px`;
}

const setColour = (uid) => {
  const uidColour = Math.floor(uid*16777215).toString(16);
  return "#" + uidColour;
}

export { coordinateProcessor }
let fpsLoop = () => {
  if (!this.s) { this.s = Date.now()};
  if (!this.f) {this.f = 0};
  let fps = 1000 * this.f/(Date.now() - this.s);
  this.f++;
  console.log(fps);
}

export { fpsLoop };

var vPort;

const zoomInButton = document.querySelector('#zoomIn');
const zoomOutButton = document.querySelector('#zoomOut');
const fullScreenButton = document.querySelector('#fullScreen');
zoomInButton.addEventListener('click', (e) => vPort.zoom(1 / 0.8));
zoomOutButton.addEventListener('click', (e) => vPort.zoom(0.8));
fullScreenButton.addEventListener('click', (e) => {
  if (!document.webkitCurrentFullScreenElement) {
    document.documentElement.webkitRequestFullscreen();
    fullScreenButton.classList.add('fullscreen');
  } else {
    document.webkitExitFullscreen();
    fullScreenButton.classList.remove('fullscreen');
  }
});

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  vPort = new Viewport(width / 2, height / 2, 1);
}

function draw() {
  checkKeys();
  vPort.apply();
  background(0);
  fill(255, 255, 0);
  noStroke();
  ellipse(0, 0, 100, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel() {
  if (event.target.nodeName === 'CANVAS') {
    let ds = event.delta > 0 ? 1 - event.delta / 1000 : 1 / (1 + event.delta / 1000);
    vPort.zoom(ds, mouseX, mouseY);
    return false;
  }
}

function mouseDragged() {
  if (event.target.nodeName === 'CANVAS')
    pointerMoved();
}

function touchMoved() {
  if (event.target.nodeName === 'CANVAS')
    pointerMoved();
}

function pointerMoved() {
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;
  vPort.move(dx, dy);
}

function checkKeys() {
  if (keyIsDown(LEFT_ARROW))
    vPort.move(5, 0);
  if (keyIsDown(UP_ARROW))
    vPort.move(0, 5);
  if (keyIsDown(RIGHT_ARROW))
    vPort.move(-5, 0);
  if (keyIsDown(DOWN_ARROW))
    vPort.move(0, -5);
  if (keyIsDown(188))
    vPort.zoom(0.95);
  if (keyIsDown(190))
    vPort.zoom(1 / 0.95);
}
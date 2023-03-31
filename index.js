canvas = document.querySelector("#mycanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d");

window.addEventListener('resize',() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = this.getRandomColor();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
  update() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
  getRandomColor() {
    return (
      "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0")
    );
  }
}

let circleArray = [];
for (let i = 0; i < 200; i++) {
  let radius = Math.random() * 30;
  let x = Math.random() * (window.innerWidth - 2 * radius) + radius;
  let y = Math.random() * (window.innerHeight - 2 * radius) + radius;
  let dx = Math.random() * 2;
  let dy = Math.random() * 2;
  circleArray.push(new Circle(x, y, radius, dx, dy));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let gravity = -0.1;

let fireworks = [];
let subFireworks = [];

class Firework {
  constructor(x, y, radius, velocityX, velocityY, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.velocity = {
      x: velocityX,
      y: velocityY
    };
    this.opacity = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    // ctx.shadowColor = this.color;
    // ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.velocity.y -= gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.opacity -= 0.006;
    if (this.opacity < 0) this.opacity = 0;
  }
}

let animate = () => {
  requestAnimationFrame(animate);
  update();
  draw();
}

let colors = ["Blue", "Green", "Purple", "Red", "Yellow", "Orange", "Silver", "White", "Pink", "Gold"];
    initializeCount = 0,
    maximumInitialize = 1,
    initDelay = 500,
    fireworkRadius = 5,
    particleCount = 150,
    speedMultiplier = 5;

let createSubFireworks = (x, y, count, multipler, color) => {
  let created = 0;
  let radians = (Math.PI * 2) / count;

  while (created < count) {
    let firework = new Firework(x,
                                          y,
                                   fireworkRadius - 3,
                                 Math.cos(radians * created) * Math.random() * multipler,
                                 Math.sin(radians * created) * Math.random() * multipler,
                                          // colors[Math.floor(Math.random() * colors.length)]);
                                          color);
    subFireworks.push(firework);
    created++;
  }
}

let update = () => {
  ctx.fillStyle = "rgba(10, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (initializeCount < maximumInitialize) {
    let firework = new Firework(Math.random() * canvas.width,
                                          Math.random() * 70 + canvas.height,
                                             fireworkRadius,
                                    3 * (Math.random() - 0.5),
                                    -12,
                                             colors[Math.floor(Math.random() * colors.length)]);
    fireworks.push(firework);
    setTimeout(() => {
      initializeCount--;
    }, initDelay);
    initializeCount++;
  }
  fireworks.forEach((firework, index) => {
    if (firework.opacity <= 0.1) {
      fireworks.splice(index, 1);
      createSubFireworks(firework.x, firework.y, particleCount, speedMultiplier, firework.color);
    } else {
      firework.update();
    }
  });
  subFireworks.forEach((firework, index) => {
    if (firework.opacity <= 0) {
      subFireworks.splice(index, 1);
    } else {
      firework.update();
    }
  });
};

let draw = () => {
  fireworks.forEach(firework => {
    firework.draw();
  });
  subFireworks.forEach(firework => {
    firework.draw();
  });
};

animate();

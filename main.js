const canvas = document.querySelector('canvas');
const cWidth = (canvas.width = 300);
const cHeight = (canvas.height = 300);

const directionToggler = {
  right: 'left',
  left: 'right',
};
const colorToggler = {
  green: 'blue',
  blue: 'green',
};

const ctx = canvas.getContext('2d');
// ctx.fillRect(0,0,cWidth, cHeight)

// ctx.fillStyle = 'orange'
// ctx.fillRect(0,0,10,30)

// ctx.fillStyle = 'green'
// ctx.fillRect(cWidth - 10, cHeight - 30, 10, 30)

const getPaddle = ({ x = 0, y = 0, color = 'orange' }) => ({
  w: 10,
  h: 30,
  x,
  y,
  color,
  speed: 10,
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  },
  moveUp() {
    if (this.y > 0) {
      this.y -= this.speed;
    }
  },
  moveDown() {
    if (this.y < cHeight - this.h) {
      this.y += this.speed;
    }
  }
});

const getBall = () => ({
  x: 150,
  y: 10,
  w: 10,
  h: 10,
  color: 'blue',
  direction: 'right',
  draw() {
    var leX = this.x;
    if (this.direction === 'right') {
      this.x++;
    } else {
      this.x--;
    }

    if (this.x === cWidth - 20 || this.x === 10) {
      this.direction = directionToggler[this.direction];
      this.color = colorToggler[this.color];
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill()
    ctx.stroke();
    // ctx.fillRect(this.x, this.y, this.w, this.h);
  },
});

const paddleLeft = getPaddle({});
const paddleRight = getPaddle({
  x: cWidth - 10,
  // y: cHeight - 30,
  y: 0,
  color: 'red',
});
const ball = getBall();

const update = () => {
  ctx.clearRect(0, 0, cWidth, cHeight);
  paddleLeft.draw();
  paddleRight.draw();
  ball.draw();
  requestAnimationFrame(update);
};

// listeners

addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 38: //up
        paddleLeft.moveUp();
        paddleRight.moveUp();
      break;
    case 40: //down
        paddleLeft.moveDown();
        paddleRight.moveDown();
      break;
  }
});

requestAnimationFrame(update);

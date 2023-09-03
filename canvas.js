const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 800;
const HEIGHT = 200;

const carHeight = 5;

canvas.width = WIDTH;
canvas.height = HEIGHT;

// across Car
ctx.fillStyle = "red";
ctx.fillRect(acrossCar.positionX, acrossCar.positionY, carsLength, carHeight);
// front car
ctx.fillStyle = "blue";
ctx.fillRect(frontCar.positionX, frontCar.positionY, carsLength, carHeight);
// my car
ctx.fillStyle = "black";
ctx.fillRect(myCar.positionX, myCar.positionY, carsLength, carHeight);

let t = 0;

restart = () => {
  myCar.acceleration = 4;
  myCar.speed = 20;
  frontCar.acceleration = 0.2;
  frontCar.speed = 10;
  acrossCar.acceleration = 0.3;
  acrossCar.speed = 10;
};

let interval = setInterval(() => {
  t += 0.001;
  // t += 1;
  // across car
  acrossCar.positionX =
    acrossCar.positionX -
    ((acrossCar.speed + acrossCar.acceleration * t + acrossCar.speed) / 2) * t;

  frontCar.positionX =
    frontCar.positionX +
    ((frontCar.speed + frontCar.acceleration * t + frontCar.speed) / 2) * t;

  myCar.positionX =
    myCar.positionX +
    ((myCar.speed + myCar.acceleration * t + myCar.speed) / 2) * t;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // across Car
  ctx.fillStyle = "red";
  ctx.fillRect(acrossCar.positionX, acrossCar.positionY, carsLength, carHeight);
  // front car
  ctx.fillStyle = "blue";
  ctx.fillRect(frontCar.positionX, frontCar.positionY, carsLength, carHeight);
  console.log(myCar.positionX, frontCar.positionX);

  if (myCar.positionX >= frontCar.positionX + carsLength + 10) {
    isOvertaked = true;
    ctx.fillStyle = "black";
    ctx.fillRect(myCar.positionX, myCar.positionY, carsLength, carHeight);
  } else if (myCar.positionX >= frontCar.positionX - 10) {
    ctx.fillStyle = "black";
    ctx.fillRect(myCar.positionX, myCar.positionY - 20, carsLength, carHeight);
  } else {
    ctx.fillStyle = "black";
    ctx.fillRect(myCar.positionX, myCar.positionY, carsLength, carHeight);
  }

  if (isOvertaked) {
    myCar.acceleration = 0;
    frontCar.acceleration = 0;
    acrossCar.acceleration = 0;
    myCar.speed = 10;
    frontCar.speed = 10;
    acrossCar.speed = 10;
  }
}, 1000);

clearInterval(interval);

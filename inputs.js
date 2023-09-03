// data html elements
const overtakeDataArea = document.querySelector(".overtake-data");
const wfmcDataArea = document.querySelector(".wfmc-data");
const spaceDataArea = document.querySelector(".space-data");
const timeDataArea = document.querySelector(".time-data");

const startBtn = document.querySelector(".start-btn");

let overtakeData = canOvertake();

overtakeDataArea.textContent = overtakeData[0];
wfmcDataArea.textContent = overtakeData[1];
spaceDataArea.textContent = overtakeData[2];
timeDataArea.textContent = overtakeData[3];

// across car input settings
const acPositionInput = document.querySelector(".acrossCarPositionSetting");
const acSpeedInput = document.querySelector(".acrossCarSpeedSetting");
const acAccelerationInput = document.querySelector(
  ".acrossCarAccelerationSetting"
);

acPositionInput.value = acrossCar.positionX;
acSpeedInput.value = acrossCar.speed;
acAccelerationInput.value = acrossCar.acceleration;

changeACData = () => {
  ctx.clearRect(
    acrossCar.positionX,
    acrossCar.positionY,
    carsLength,
    carHeight
  );

  let newPosition = parseInt(acPositionInput.value);
  acrossCar.positionX = newPosition;

  let newSpeed = parseInt(acSpeedInput.value);
  acrossCar.speed = newSpeed;

  let newAcc = parseInt(acAccelerationInput.value);
  acrossCar.acceleration = newAcc;

  overtakeData = canOvertake();

  overtakeDataArea.textContent = overtakeData[0];
  wfmcDataArea.textContent = overtakeData[1];
  spaceDataArea.textContent = overtakeData[2];
  timeDataArea.textContent = overtakeData[3];

  ctx.fillStyle = "red";
  ctx.fillRect(acrossCar.positionX, acrossCar.positionY, carsLength, carHeight);
};

acPositionInput.addEventListener("change", changeACData);
acSpeedInput.addEventListener("change", changeACData);
acAccelerationInput.addEventListener("change", changeACData);

// front car input settings
const fcPositionInput = document.querySelector(".frontCarPositionSetting");
const fcSpeedInput = document.querySelector(".frontCarSpeedSetting");
const fcAccelerationInput = document.querySelector(
  ".frontCarAccelerationSetting"
);

fcPositionInput.value = frontCar.positionX;
fcSpeedInput.value = frontCar.speed;
fcAccelerationInput.value = frontCar.acceleration;

changeFCData = () => {
  ctx.clearRect(frontCar.positionX, frontCar.positionY, carsLength, carHeight);

  let newPosition = parseInt(fcPositionInput.value);
  frontCar.positionX = newPosition;

  let newSpeed = parseInt(fcSpeedInput.value);
  frontCar.speed = newSpeed;

  let newAcc = parseInt(fcAccelerationInput.value);
  frontCar.acceleration = newAcc;

  overtakeData = canOvertake();

  overtakeDataArea.textContent = overtakeData[0];
  wfmcDataArea.textContent = overtakeData[1];
  spaceDataArea.textContent = overtakeData[2];
  timeDataArea.textContent = overtakeData[3];

  ctx.fillStyle = "blue";
  ctx.fillRect(frontCar.positionX, frontCar.positionY, carsLength, carHeight);
};

fcPositionInput.addEventListener("change", changeFCData);
fcSpeedInput.addEventListener("change", changeFCData);
fcAccelerationInput.addEventListener("change", changeFCData);

// my car input settings
const mcPositionInput = document.querySelector(".myCarPositionSetting");
const mcSpeedInput = document.querySelector(".myCarSpeedSetting");
const mcAccelerationInput = document.querySelector(".myCarAccelerationSetting");

mcPositionInput.value = myCar.positionX;
mcSpeedInput.value = myCar.speed;
mcAccelerationInput.value = myCar.acceleration;

changeMCData = () => {
  ctx.clearRect(myCar.positionX, myCar.positionY, carsLength, carHeight);

  let newPosition = parseInt(mcPositionInput.value);
  myCar.positionX = newPosition;

  let newSpeed = parseInt(mcSpeedInput.value);
  myCar.speed = newSpeed;

  let newAcc = parseInt(mcAccelerationInput.value);
  myCar.acceleration = newAcc;

  overtakeData = canOvertake();

  overtakeDataArea.textContent = overtakeData[0];
  wfmcDataArea.textContent = overtakeData[1];
  spaceDataArea.textContent = overtakeData[2];
  timeDataArea.textContent = overtakeData[3];

  ctx.fillStyle = "black";
  ctx.fillRect(myCar.positionX, myCar.positionY, carsLength, carHeight);
};

mcPositionInput.addEventListener("change", changeMCData);
mcSpeedInput.addEventListener("change", changeMCData);
mcAccelerationInput.addEventListener("change", changeMCData);

start = () => {
  if (isStarted) {
    location.reload();
  }

  isStarted = true;
  startBtn.textContent = "Restart!";

  interval = setInterval(() => {
    t += 0.001;
    // across car
    acrossCar.positionX =
      acrossCar.positionX -
      ((acrossCar.speed + acrossCar.acceleration * t + acrossCar.speed) / 2) *
        t;

    frontCar.positionX =
      frontCar.positionX +
      ((frontCar.speed + frontCar.acceleration * t + frontCar.speed) / 2) * t;

    myCar.positionX =
      myCar.positionX +
      ((myCar.speed + myCar.acceleration * t + myCar.speed) / 2) * t;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // across Car
    ctx.fillStyle = "red";
    ctx.fillRect(
      acrossCar.positionX,
      acrossCar.positionY,
      carsLength,
      carHeight
    );
    // front car
    ctx.fillStyle = "blue";
    ctx.fillRect(frontCar.positionX, frontCar.positionY, carsLength, carHeight);

    if (myCar.positionX >= frontCar.positionX + carsLength + 2) {
      isOvertaked = true;
      ctx.fillStyle = "black";
      ctx.fillRect(myCar.positionX, myCar.positionY, carsLength, carHeight);
    } else if (myCar.positionX >= frontCar.positionX - 10) {
      ctx.fillStyle = "black";
      ctx.fillRect(
        myCar.positionX,
        myCar.positionY - 20,
        carsLength,
        carHeight
      );
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
  }, 10);
};

startBtn.addEventListener("click", start);

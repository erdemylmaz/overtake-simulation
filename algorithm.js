// speed = m/s
const carsLength = 10;
const spaceBetweenCars = 20;
let isStarted = false;

let acrossCar = {
  positionX: 450,
  positionY: 100,
  speed: 10,
  acceleration: 0.3,
};

let frontCar = {
  positionX: 300,
  positionY: 120,
  speed: 12,
  acceleration: 0.1,
};

let myCar = {
  positionX: frontCar.positionX - spaceBetweenCars,
  positionY: 120,
  speed: 20,
  acceleration: 3,
};

let isOvertaked;
let time;

canOvertake = () => {
  time = 0;
  let spaceForOvertake;
  let wayForFrontCar;
  let wayForMyCar;

  while (time <= 1000) {
    time += 0.0001;

    spaceForOvertake =
      acrossCar.positionX -
      ((acrossCar.speed * time +
        acrossCar.acceleration * time +
        acrossCar.speed) /
        2) *
        time -
      (frontCar.positionX +
        ((frontCar.speed + frontCar.acceleration * time + frontCar.speed) / 2) *
          time) -
      carsLength;

    wayForMyCar =
      ((myCar.speed + myCar.acceleration * time + myCar.speed) / 2) * time;
    wayForFrontCar =
      ((frontCar.speed + frontCar.acceleration * time + frontCar.speed) / 2) *
      time;

    if (
      acrossCar.positionX > frontCar.positionX &&
      wayForMyCar - wayForFrontCar >= frontCar.positionX - myCar.positionX
    ) {
      break;
    }
  }

  function dataText(canOvertake) {
    let dataText = `
    Can Overtake: ${canOvertake}
    Way For My Car: ${wayForMyCar.toFixed(3)}
    Space For Overtake: ${spaceForOvertake.toFixed(3)} 
    Necessary Time: ${time.toFixed(3)}
  `;

    return dataText;
  }

  if (spaceForOvertake >= wayForMyCar) {
    return [
      true,
      wayForMyCar.toFixed(2),
      spaceForOvertake.toFixed(2),
      time.toFixed(2),
    ];
  } else {
    return [
      false,
      wayForMyCar.toFixed(2),
      spaceForOvertake.toFixed(2),
      time.toFixed(2),
    ];
  }
};

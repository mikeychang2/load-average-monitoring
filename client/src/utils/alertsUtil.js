const isHighLoadAlert = (loads, timePerInterval = 10, minutes = 1) => {
  const numsOfIntervals = Math.floor((minutes * 60) / timePerInterval);
  let average = getAverage(loads, numsOfIntervals);
  return average > 1;
}

const getAverage = (loads, numsOfIntervals) => {
  const sum = loads.slice(-numsOfIntervals).reduce((acc, load) => acc + load.avg, 0);
  return +(sum / numsOfIntervals).toFixed(4);
}

export { isHighLoadAlert, getAverage };

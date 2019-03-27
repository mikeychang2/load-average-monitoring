const formatDateTime = (time = Date.now()) => {
  return new Date(time).toLocaleTimeString();
}

// initialize load averages to 0 load average for y-axis
// and decrementing by 10s intervals for x-axis
const initializeLoadAvgs = (timePerInterval = 10) => {
  let minutes = 10, // keep track of 10 minutes worth of history
      numOfIntervals = (minutes * 60) / timePerInterval,
      currentTime = Date.now();

  let loads = new Array(numOfIntervals).fill(0);

  return loads.map(() => {
    return {
       avg: 0,
       time: formatDateTime(currentTime - (10000 * numOfIntervals--))
    }
  });
}

// add newest load average, remove first element to keep within
// total time frame (10 minutes)
const updateLoadAverages = (loadAverages, newLoad) => {
  return [...loadAverages.slice(1), {
    avg: +newLoad.toFixed(4),
    time: formatDateTime()
  }];
}

export { formatDateTime, initializeLoadAvgs, updateLoadAverages };

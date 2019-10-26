export const calcDegree = (lat1, lng1, lat2, lng2) => {
  console.log(lat1, lng1, lat2, lng2);
  return Math.atan2(lng2 - lng1, lat2 - lat1) * 180 / Math.PI;
};
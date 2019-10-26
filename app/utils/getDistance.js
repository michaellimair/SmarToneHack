export const getDistance = (lat1, lng1, lat2, lng2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat1-lat2);  // deg2rad below
  var dLon = deg2rad(lng1-lng2);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  //console.log("return from getDistance", d);
  return d;
};
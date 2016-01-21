/**
 * Created by vivek on 16/1/16.
 */
var LatLon = require('mt-latlon');
function find(LatLonObject, cb) {
    var Signal = getSignalLatLon();
    var distanceObject = {};
    var p1 = new LatLon(LatLonObject.lat, LatLonObject.lon);
    var p2 = new LatLon(Signal.lat, Signal.lon);
    var brng = p1.finalBearingTo(p2);
    distanceObject.distance= p1.distanceTo(p2);
    distanceObject.degrees = brng;
    distanceObject.direction = getDir(brng);
    distanceObject.id = LatLonObject.id;
    cb(distanceObject);
};
function getSignalLatLon() {
    return {lat: 12.912032, lon: 77.638109};
};
function getDir(brng) {
    var bearings = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    var index = brng - 22.5;
    if (index < 0)
        index += 360;
    index = parseInt(index / 45);
    return (bearings[index]);
}
module.exports = {
    find: find,
    getSignalLatLon: getSignalLatLon
}
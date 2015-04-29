var http = require("http");
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/*
"seconds_since_report": 143, 
  "run_id": "237_51_0", 
  "longitude": -118.501076, 
  "heading": 360.0, 
  "route_id": "237", 
  "predictable": true, 
  "latitude": 34.188412, 
  "id": "8179"
*/
var vehicleSchema = new Schema({
  vehicle_id: Number,
  longitude: Number,
  latitude: Number,
  route_id: Number
});

var vehicle = mongoose.model('Vehicle', vehicleSchema);

var url = "api.metro.net";

//http://api.metro.net/agencies/lametro/vehicles/

var options = {
  host: url,
  port: 80,
  path: '/agencies/lametro/vehicles/',
  method: 'GET'
};

http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    var vehicle_collection = [];

    for (vehicle in chunk.items) {
      /*vehicle_collection.push(new Vehicle({
        vehicle_id: vehicle.id,
        longitude: vehicle.longitude,
        latitude: vehicle.latitude,
        route_id: vehicle.route_id
      }));*/
      vehicle_instance = new Vehicle({
        vehicle_id: vehicle.id,
        longitude: vehicle.longitude,
        latitude: vehicle.latitude,
        route_id: vehicle.route_id
      });
      vehicle_instance.save();
    }
  });
}).end();

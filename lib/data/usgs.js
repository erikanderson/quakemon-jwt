var request = require('request');
module.exports = {
  
  getHourlyData: function(){
    var counter = 0;
    request('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson', function(error, response, body){
    console.log('/////////// fetched geojson data ////////////');
    hourlyData = body;
    console.log('****************************');
    console.log('++++++++++ ' + counter + ' ++++++++++++++');
    counter ++;
    return hourlyData;
    })
  }

}
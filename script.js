/*
    Assignment 4
    Mohit Verma
*/

$(document).ready(function(){
  var x = document.getElementById("youarehere");
  // your code here
  
  if (navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else 
  { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }


function showPosition(position) 
{
  
   var lat= localStorage.LastGPSlatitudestored;
   var log= localStorage.LastGPSlongitudestored;
   
   if (("LastGPSlatitudestored" in localStorage) && ("LastGPSlongitudestored" in localStorage))
   {
      x.innerHTML = "Latitude from localStorage: " + lat + "<br> and Longitude from localStorage: " + log;
      
        if (position.coords.latitude != lat && position.coords.longitude != log) 
       {
        x.innerHTML = "Old Latitude: " + lat + " and Old Longitude: " + log + 
        "<br>New Latitude: " + position.coords.latitude + " and New Longitude: " + position.coords.longitude  + 
        "<br>Distance Travelled in meters is = " + calcDistance(lat,log,position.coords.latitude, position.coords.longitude);
        localStorage.removeItem("LastGPSlatitudestored");
        localStorage.removeItem("LastGPSlongitudestored");
        localStorage.setItem("LastGPSlatitudestored", position.coords.latitude);
        localStorage.setItem("LastGPSlongitudestored", position.coords.longitude);
       }
   } 
   else
   {
      localStorage.setItem("LastGPSlatitudestored", position.coords.latitude);
      localStorage.setItem("LastGPSlongitudestored", position.coords.longitude);
      x.innerHTML = "<b>Welcome to Geolocation API<b> <br> There is no Item in Local Storage<br>" + "latitude = " + position.coords.latitude + " and longitude" + position.coords.longitude;
   }
   
} 
    function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}



    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistance(lat1, lon1, lat2, lon2){
        var toRadians = function(num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2-lat1);
        var Δλ = toRadians(lon2-lon1);

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return ( R * c );
    }
});



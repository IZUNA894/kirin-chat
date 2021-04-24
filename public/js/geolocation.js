// this code  is upcoming feature ...
// for sending user geolocatiom to another user as msg


var button = document.querySelector('#find-me');
button.addEventListener('click', geoFindMe);

function geoFindMe() {
  button.setAttribute("disabled","disabled");

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    socket.emit("sendMsg",{link:`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`})
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

//enabling geolocation button again...
button.removeAttribute("disabled");

}

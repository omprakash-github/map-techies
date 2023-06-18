//Map initialization
const map = L.map("map").setView([27.6429, 84.4986], 12);

//osm layer
const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

osm.addTo(map);

//adding new icon instead of default marker

const icon = L.icon({
  iconUrl: "wc.png",
  iconSize: [24, 24],
});

//adding marker some dummy marker
const marker = L.marker([27.69241, 84.44092], {
  icon,
});

//adding popup ,when icon is clicked

marker.bindPopup(
  "<h2>This section of road might be wheel chair accesible</h2>"
);

marker.bindTooltip(
  "<h2>This section of road might be wheel chair accesible</h2>"
);

marker.addTo(map);

//adding second marker

const marker2 = L.marker([27.69609, 84.42155], { icon });
marker2.bindPopup(
  "<h2>This section of road might be wheel chair accesible</h2>"
);

marker2.bindTooltip(
  "<h2>This section of road might be wheel chair accesible</h2>"
);
marker2.addTo(map);

//Adding wheel chair markers on double click

let latitude;
let longitude;

let button = L.control({ position: "topright" });

button.onAdd = function (map) {
  let div = L.DomUtil.create("div", "my-button");
  div.innerHTML = "<button>Add Wheel</button>";
  return div;
};

button.addTo(map);

const btn = document.querySelector("button");

//button for remove wheel
let removeMarkerBtn = L.control({ position: "topright" });
removeMarkerBtn.onAdd = function (map) {
  let removeMarkerBtn = L.DomUtil.create("div", "my-buttonR");
  removeMarkerBtn.innerHTML = "<button>Remove Wheel</button>";
  return removeMarkerBtn;
};
removeMarkerBtn.addTo(map);

let count = 0;

let markerObj = {
  icon,
};

//

function callToMark() {
  map.on("dblclick", (event) => {
    latitude = event.latlng.lat;
    longitude = event.latlng.lng;
    let marker3 = [];

    let markerr = L.marker([latitude, longitude], markerObj);
    marker3.push(markerr);

    for (mar of marker3) {
      mar.bindPopup(
        "<h2>This section of road might be wheel chair accesible</h2>"
      );

      mar.bindTooltip(
        "<h2>This section of road might be wheel chair accesible</h2>"
      );

      mar.addTo(map);

      let removeMarkerButton = document.querySelector(".my-buttonR");

      removeMarkerButton.addEventListener("click", () => {
        mar.on("click", (event) => {
          map.removeLayer(mar);
        });
      });
      removeMarkerButton.addEventListener("click", () => {
        marker.on("click", (event) => {
          map.removeLayer(marker);
        });
      });
      removeMarkerButton.addEventListener("click", () => {
        marker2.on("click", (event) => {
          map.removeLayer(marker2);
        });
      });
    }
  });
}

function callToMarkF() {
  map.off("dblclick");
}

btn.addEventListener("click", () => {
  if (count % 2 === 0) {
    btn.textContent = "Done";
    callToMark();
  } else {
    btn.textContent = "Add Wheel";
    callToMarkF();
  }
  count++;
});

//adding second button
let button2 = L.control({ position: "topright" });

button2.onAdd = function (map) {
  let div2 = L.DomUtil.create("div", "my-button2");
  div2.innerHTML = "<button>Track Location</button>";
  return div2;
};

button2.addTo(map);

//added geolocation pointer
L.control.locate().addTo(map);
//
const btn2 = document.querySelector(".my-button2");

btn2.addEventListener("click", () => {
  //real time location tracker

  //adding location tracker

  let latitudeT;
  let longitudeT;
  function getCurrPosition(position) {
    // console.log(position);
    latitudeT = position.coords.latitude;
    longitudeT = position.coords.longitude;
    //adding marker to this location
    let currMarker = L.marker([latitudeT, longitudeT]).addTo(map);

    let button3 = L.control({ position: "topright" });

    button3.onAdd = function (map) {
      let div3 = L.DomUtil.create("div", "my-button3");
      div3.innerHTML = "<button>Route</button>";
      return div3;
    };
    button3.addTo(map);
    let routelatitude;
    let routelongitude;

    const btn3 = document.querySelector(".my-button3");
    btn3.addEventListener("click", () => {
      map.on("click", (event) => {
        routelatitude = event.latlng.lat;
        routelongitude = event.latlng.lng;
      });

      let routeMarker = L.marker([routelatitude, routelongitude]).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(latitudeT, longitudeT),
          L.latLng(routelatitude, routelongitude),
        ],
      }).addTo(map);
    });
  }
  navigator.geolocation.getCurrentPosition(getCurrPosition);
});

//adding button for info
let buttonInfo = L.control({ position: "topleft" });

buttonInfo.onAdd = function (map) {
  let buttonInfo = L.DomUtil.create("div", "my-buttonI");
  buttonInfo.innerHTML = "<button>Info</button>";
  return buttonInfo;
};
buttonInfo.addTo(map);
const btnI = document.querySelector(".my-buttonI");
btnI.addEventListener("click", () => {
  alert(
    "Welcome to Map Wheel\n 1)To add the Wheel chair marker click on Add Wheel button \n 2)To remove the Wheel chair marker click on Remove Wheel marker \n 3)To track your real time location click on the Track location \n 4)To find the shortest path click on route button \n 5)To search location click on search button and enter your destination \nNOTE: This is just a prototype and the data are just for demostration,i.e datas are not real in this prototype ,And the Wheel Chair marker should atleast cover 25 to 40 Meters of distance"
  );
});

//adding search button
L.Control.geocoder().addTo(map);
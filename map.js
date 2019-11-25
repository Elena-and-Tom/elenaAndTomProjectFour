
mapboxgl.accessToken =
  "pk.eyJ1IjoidG9tc3R1YXJ0MTIzIiwiYSI6ImNrMzV6MGo4ZTBvMWszZHJ6cmg3NHBtejkifQ.BW0Tcui0tMfNeFIUMTwz9g";

// here we've built the initial map with Juno as the starting location
let map = new mapboxgl.Map({
  // container id specified in the HTML
  container: "map",
  // mapbox style URL for the map
  style: "mapbox://styles/mapbox/light-v10",
  // set initial location to Juno College
  center: [-79.39786, 43.64821],
  // initial zoom height of the viewport
  zoom: 13
});

// an alternative to the location guide below - https://docs.mapbox.com/mapbox-gl-js/example/locate-user/

// here we've used this stack overflow guide to enable user location tracking on page load - https://stackoverflow.com/questions/56273097/how-to-locate-a-user-without-clicking-on-the-control-button-mapbox-api-javasc
navigator.geolocation.getCurrentPosition(position => {
  const userCoordinates = [position.coords.longitude, position.coords.latitude];
  map.addSource("user-coordinates", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: userCoordinates
      }
    }
  });
  map.addLayer({
    id: "user-coordinates",
    source: "user-coordinates",
    type: "circle"
  });
  map.flyTo({
    center: userCoordinates,
    zoom: 14
  });

  // here we created a  my location button that recalls the flyTo location function made above
  $(".findLocation").on("click", function() {
    map.flyTo({
      center: userCoordinates,
      zoom: 14
    });
  });
});

// for future addition follow this guide to add zoom in and out buttons - https://docs.mapbox.com/mapbox-gl-js/example/navigation/

// here we've used this guide to add directions functionality - https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-directions/
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),
  // positioned the nav in the bottom left
  "bottom-left"
);

// here we've followed this walk through guide and adapted the code to add LCBO stores on the map and in the sidebar - https://docs.mapbox.com/help/tutorials/building-a-store-locator/

// first step of this guide is to add a objet listing all the LCBO STORES in Toronto
let stores = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.3833, 43.65622]
      },
      properties: {
        phoneFormatted: "(416) 979-9978",
        phone: "(416) 979-9978",
        address: "595 BAY STREET (Yonge & Dundas)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Yonge & Dundas",
        postalCode: "M5G2C2",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.38193, 43.64937]
      },
      properties: {
        phoneFormatted: "(416) 594-9040",
        phone: "(416) 594-9040",
        address: "100 KING STREET WEST (Bay & King)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Yonge & Dundas",
        postalCode: "M5X1B1",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.37975, 43.6463]
      },
      properties: {
        phoneFormatted: "(416) 368-9644",
        phone: "(416) 368-9644",
        address: "200 BAY STREET (Front & Bay)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Front & Bay",
        postalCode: "M5J2J2",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.38538, 43.66065]
      },
      properties: {
        phoneFormatted: "(416) 593-9076",
        phone: "(416) 593-9076",
        address: "777 BAY STREET (College & Bay)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "College & Bay",
        postalCode: "M5G2C8",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.3722, 43.64876]
      },
      properties: {
        phoneFormatted: "(416) 368-0521",
        phone: "(416) 368-0521",
        address: "87 FRONT STREET E. (St. Lawrence Market)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Front & Jarvis",
        postalCode: "M5B1B8",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.38016, 43.66181]
      },
      properties: {
        phoneFormatted: "(416) 599-1967",
        phone: "(416) 599-1967",
        address: "60 CARLTON ST - 2nd Floor (Carlton & Church)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Carlton & Church",
        postalCode: "M5B2H5",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.38087, 43.64235]
      },
      properties: {
        phoneFormatted: "(416) 594-3838",
        phone: "(416) 594-3838",
        address: "15 YORK STREET  - (Maple Leaf Sq)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "York & Lakeshore",
        postalCode: "M5J0A3",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.39845, 43.65487]
      },
      properties: {
        phoneFormatted: "(416) 597-0145",
        phone: "(416) 597-0145",
        address: "337 SPADINA AVENUE  - (Spadina & Dundas)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Spadina & Dundas",
        postalCode: "M5T2E9",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.38405, 43.66444]
      },
      properties: {
        phoneFormatted: "(416) 923-8498",
        phone: "(416) 923-8498",
        address: "547 YONGE STREET  - (Yonge & Wellesley)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Yonge & Wellesley",
        postalCode: "M4Y1Y5",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.39352, 43.6435]
      },
      properties: {
        phoneFormatted: "(416) 598-1482",
        phone: "(416) 598-1482",
        address: "49 SPADINA AVENUE  - (Front & Spadina)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Yonge & Wellesley",
        postalCode: "M5V2J1",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.37178, 43.6432]
      },
      properties: {
        phoneFormatted: "(416) 864-6777",
        phone: "(416) 864-6777",
        address: "2 COOPER STREET  - (Queens Quay & Yonge)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Queens Quay & Yonge",
        postalCode: "M5E0B8",
        state: "Ontario"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-79.36545, 43.65111]
      },
      properties: {
        phoneFormatted: "(416) 214-0311",
        phone: "(416) 214-0311",
        address: "222 FRONT STREET EAST - (Front & Sherbourne)",
        city: "Toronto",
        country: "Canada",
        crossStreet: "Front & Sherbourne",
        postalCode: "M5A1E7",
        state: "Ontario"
      }
    }
  ]
};

// This adds the data to the map
map.on("load", function(e) {
  // Add the data to your map as a layer
  map.addLayer({
    id: "locations",
    type: "symbol",
    // Add a GeoJSON source containing place coordinates and information.
    source: {
      type: "geojson",
      data: stores
    },
    layout: {
      // changed this to alcohol shop for lcbo
      "icon-image": "alcohol-shop-15",
      "icon-allow-overlap": true
    }
  });
  // Initialize the list
  buildLocationList(stores);
});
map.on("click", function(e) {
  let features = map.queryRenderedFeatures(e.point, {
    layers: ["locations"]
  });
  if (features.length) {
    let clickedPoint = features[0];
    // 1. Fly to the point
    flyToStore(clickedPoint);
    // 2. Close all other popups and display popup for clicked store
    createPopUp(clickedPoint);
    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    let activeItem = document.getElementsByClassName("active");
    if (activeItem[0]) {
      activeItem[0].classList.remove("active");
    }
    let selectedFeature = clickedPoint.properties.address;
    for (let i = 0; i < stores.features.length; i++) {
      if (stores.features[i].properties.address === selectedFeature) {
        selectedFeatureIndex = i;
      }
    }
    let listing = document.getElementById("listing-" + selectedFeatureIndex);
    listing.classList.add("active");
  }
});

function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 13
  });
}

function createPopUp(currentFeature) {
  let popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  let popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      "<h3>LCBO</h3>" + "<h4>" + currentFeature.properties.address + "</h4>"
    )
    .addTo(map);
}
function buildLocationList(data) {
  for (i = 0; i < data.features.length; i++) {
    // Create an array of all the stores and their properties
    let currentFeature = data.features[i];
    // Shorten data.feature.properties to just `prop` so we're not
    // writing this long form over and over again
    let prop = currentFeature.properties;
    // Select the listing container in the HTML
    let listings = document.getElementById("listings");
    // Append a div with the class 'item' for each store
    let listing = listings.appendChild(document.createElement("div"));
    listing.className = "item";
    listing.id = "listing-" + i;
    // Create a new link with the class 'title' for each store
    // and fill it with the store address
    let link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.dataPosition = i;
    link.innerHTML = prop.address;
    // Create a new div with the class 'details' for each store
    // and fill it with the city and phone number
    let details = listing.appendChild(document.createElement("div"));
    details.innerHTML = prop.city;
    if (prop.phone) {
      details.innerHTML += " &middot; " + prop.phoneFormatted;
    }
    link.addEventListener("click", function(e) {
      // Update the currentFeature to the store associated with the clicked link
      let clickedListing = data.features[this.dataPosition];
      // 1. Fly to the point associated with the clicked link
      flyToStore(clickedListing);
      // 2. Close all other popups and display popup for clicked store
      createPopUp(clickedListing);
      // 3. Highlight listing in sidebar (and remove highlight for all other listings)
      let activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    });
  }
}

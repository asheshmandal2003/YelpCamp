mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: campground.geometry.coordinates,
  zoom: 10,
});

const marker = new mapboxgl.Marker({
  color: "#FF0000",
  draggable: false,
})
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setLngLat(campground.geometry.coordinates)
      .setHTML(`<h4>${campground.title}</h4><p>${campground.location}</p>`)
  )
  .addTo(map);

map.addControl(new mapboxgl.NavigationControl());


import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ['places'];

const GoogleMapsComponent = () => {
  const containerStyle = {
    marginLeft: "22px",
    width: "92%",
    height: "400px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
    marginBottom: "15px",
  };

  const center = {
    lat: 40.7128,
    lng: -74.0060,
  };

  const [autocomplete, setAutocomplete] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [infoWindow, setInfoWindow] = useState(null);
  const [markerInfo, setMarkerInfo] = useState({
    title: 'Marker Information',
    content: 'This is additional information about the selected location.',
  });
  const [placesMarkers, setPlacesMarkers] = useState([]);
  const [placesService, setPlacesService] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);

  const onLoad = (map) => {
    console.log('Map loaded:', map);
    setPlacesService(new window.google.maps.places.PlacesService(map));
  };

  const onAutocompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    console.log('Slider Value:', event.target.value);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log('Place changed:', place);

      if (place.geometry && place.geometry.location) {
        setMarkerPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setInfoWindow(null);
        setMarkerInfo({
          title: place.name,
          content: `Name: ${place.name}\nAddress: ${place.formatted_address}`,
        });
      }
    }
  };

  const onMarkerClick = (result) => {
    setInfoWindow(result);
  };

  const onSearch = async (type) => {
    const radiusInMeters = sliderValue * 1609.34;

    console.log('Slider Value:', sliderValue);
    console.log('Radius:', sliderValue * 1609.34);

    if (placesService !== null) {
      placesService.nearbySearch(
        {
          location: markerPosition,
          radius: radiusInMeters, // Convert miles to meters
          type: type,
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const newMarkers = results.map((result) => ({
              position: {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng(),
              },
              title: result.name,
              content: result.vicinity,
            }));
            setPlacesMarkers(newMarkers);
          } else {
            console.error('Nearby search failed:', status);
          }
        }
      );
    }
  };

  // useEffect((map) => {
  //   if (placesService === null) {
  //     setPlacesService(new window.google.maps.places.PlacesService(map));
  //   }
  // }, [placesService]);

  return (
    <div className='map'>
      <h1>My Map</h1>

      <LoadScript
        googleMapsApiKey="AIzaSyB7JeG6WXNJj3cId2QFAYYCRVx2yI6lnXA"
        libraries={libraries} // Add any additional libraries you need
      >
        <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
          <div className='searchbar'>
            <input type="text" placeholder="Enter a location" />
          </div>
        </Autocomplete>
        <div>
          <label htmlFor="rangeSlider">Select a radius:</label>
          <input
            type="range"
            id="rangeSlider"
            min="1"
            max="100"
            value={sliderValue}
            step="1"
            onChange={handleSliderChange}
          />
          <p>Selected miles: {sliderValue}</p>
        </div>
        <div className='map'>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={14}
            onLoad={onLoad}
          >
            <Marker position={markerPosition} onClick={onMarkerClick} />
            {placesMarkers.map((result, index) => (
              <Marker
                key={index}
                position={result.position}
                title={result.title}
                onClick={() => onMarkerClick(result)}
              />
            ))}
            {infoWindow && infoWindow.position && (
              <InfoWindow
                position={{ lat: infoWindow.position.lat, lng: infoWindow.position.lng }}
                onCloseClick={() => setInfoWindow(null)}
              >
                <div>
                  <h2>{infoWindow.title}</h2>
                  <p>{infoWindow.content}</p>
                  <button>Add Place</button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
        <div className='placesbuttons'>
          <button onClick={() => onSearch('restaurant')}>Search Restaurants</button>
          <button onClick={() => onSearch('movie_theater')}>Search Movies</button>
          <button onClick={() => onSearch('amusement_park')}>Search Amusement Parks</button>
          <button onClick={() => onSearch('aquarium')}>Search Aquariums</button>
          <button onClick={() =>onSearch('museum')}>Search Museums</button>
          <button onClick={() =>onSearch('night_club')}>Search Night Clubs</button>
          <button onClick={() => onSearch('aquarium')}>Search Aquariums</button>
          <button onClick={() =>onSearch('museum')}>Search Museums</button>
          <button onClick={() =>onSearch('night_club')}>Search Night Clubs</button>
          {/* Add more buttons for other types */}
        </div>
      </LoadScript>
    </div>
  );
};

export default GoogleMapsComponent;


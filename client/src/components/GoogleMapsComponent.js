
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

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`/active-user`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const userInfo = await response.json();
      console.log('User Info:', userInfo);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };
  
  // Call this function wherever you need to fetch user information
  fetchUserInfo();
  

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
        setMarkerInfo({
          title: place.name,
          content: `Name: ${place.name}\nAddress: ${place.formatted_address}`,
        });
  
        // Set the InfoWindow to open
        setInfoWindow({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          title: place.name,
          content: `Name: ${place.name}\nAddress: ${place.formatted_address}`,
        });
      }
    }
  };

  const onMarkerClick = (result) => {
    setInfoWindow({
      position: result.position,
      title: result.title,
      content: result.content,
    });
  };

  const onSearch = async (type) => {
    setPlacesMarkers([]);
    const radiusInMeters = sliderValue * 1609.34;
  
    console.log('Slider Value:', sliderValue);
    console.log('Radius:', sliderValue * 1609.34);
  
    if (placesService !== null) {
      const request = {
        query: type,
        location: markerPosition,
        radius: radiusInMeters,
      };
  
      const fetchResults = (request) => {
        placesService.textSearch(request, (results, status, pagination) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const newMarkers = results.map((result) => ({
              position: {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng(),
              },
              title: result.name,
              content: result.formatted_address,
            }));
            if (pagination.hasNextPage) {
              pagination.nextPage();
            }
            setPlacesMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
  
            
          } else {
            console.error('Text search failed:', status);
          }
        });
      };
  
      fetchResults(request);
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
            onClick={() => setInfoWindow(null)}
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
                  <button onClick={console.log()}>Add Place</button>
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


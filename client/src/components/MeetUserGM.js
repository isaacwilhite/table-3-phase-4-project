
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';
const fetchUrl = 'http://127.0.0.1:5555'
const libraries = ['places'];

const MeetUserGM = () => {
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
  const [userLocations, setUserLocations] = useState([]);

  const onLoad = (map) => {
    console.log('Map loaded:', map);
    setPlacesService(new window.google.maps.places.PlacesService(map));
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

  const onMarkerClick = (location) => {
    setInfoWindow({
      position: location.position,
      title: location.title,
      content: location.content,
      profilePhoto: location.profile_picture,
    });
  };

  const onSearch = async (type) => {
    try {
      // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API
      const response = await fetch(`${fetchUrl}/users`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data && data.length > 0) {
        const userLocations = []; // Declare userLocations here
  
        const geocoder = new window.google.maps.Geocoder();
  
        for (const user of data) {
          if (user.location) {
            // Geocode the user's address
            geocoder.geocode({ address: user.location }, (results, status) => {
              if (status === 'OK' && results.length > 0) {
                const preciseLocation = results[0].geometry.location;
                
                // Add the user's precise location to the array
                userLocations.push({
                  position: {
                    lat: preciseLocation.lat(),
                    lng: preciseLocation.lng(),
                  },
                  title: user.name,
                content: `Name: ${user.name}\nBio: ${user.bio}\nAddress: ${user.address}`,
              });
  
                // Set the state to trigger a re-render and display the markers
                setPlacesMarkers([...userLocations]);
              } else {
                console.error('Geocoding failed:', status);
              }
            });
          }
        }
  
        // Now you can use userLocations here
        console.log('User locations:', userLocations);
        setUserLocations(userLocations);
      } else {
        console.error('No user locations found.');
      }
    } catch (error) {
      console.error('Error fetching user locations:', error);
    }
  };
  
  

  useEffect(() => {
  }, []);

  return (
    <div className='meetmap'>
      <h1>My Map</h1>
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
      <button onClick={onSearch}>Show Users in radius</button>
      <LoadScript
        googleMapsApiKey="AIzaSyB7JeG6WXNJj3cId2QFAYYCRVx2yI6lnXA"
        libraries={libraries} // Add any additional libraries you need
      >
        
        
        <div >
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
                  <img src={infoWindow.profilePhoto} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  <p>{infoWindow.content}</p>
                  <button>Add Match</button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
        
      </LoadScript>
    </div>
  );
};
export default MeetUserGM;

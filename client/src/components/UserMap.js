
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';
import UserCard from './UserCard';
const libraries = ['places', 'geometry'];

const UserMap = ({user}) => {
  const containerStyle = {
    margin: "0 auto", 
    width: "80%",     
    maxWidth: "600px", 
    height: "400px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
    marginBottom: "15px",
  };

  const [autocomplete, setAutocomplete] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [markerInfo, setMarkerInfo] = useState({
    title: 'Marker Information',
    content: 'This is additional information about the selected location.',
  });
  const [placesMarkers, setPlacesMarkers] = useState([]);
  const [placesService, setPlacesService] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [userLocations, setUserLocations] = useState([]);
  const [prospects, setProspects] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [currentProspect, setCurrentProspect] = useState({})

  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(data => {
        setProspects(data)
      })
  }, [])

  useEffect(() => {
    fetch(`/current`)
      .then(res => res.json())
      .then(data => setCurrentUser(data))
  }, [])

  useEffect(() => {
    if (currentUser.location) {
      const geocoder = new window.google.maps.Geocoder();

      // Geocode the current user's location
      geocoder.geocode({ address: currentUser.location }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const userLocation = results[0].geometry.location;

          // Set the center of the map to the user's geocoded location
          setMarkerPosition({
            lat: userLocation.lat(),
            lng: userLocation.lng(),
          });
        } else {
          console.error('Geocoding failed for current user:', status);
        }
      });
    }
  }, [currentUser.location]);

  

  const onLoad = (map) => {
    console.log('Map loaded:', map);
    const geocoder = new window.google.maps.Geocoder();

  // Geocode the current user's location
  geocoder.geocode({ address: currentUser.location }, (results, status) => {
   
    if (status === 'OK' && results.length > 0) {
      const userLocation = results[0].geometry.location;

      // Set the center of the map to the user's geocoded location
      map.setCenter(userLocation);

      // Optional: You can also set the map zoom level if needed
      map.setZoom(14);
    } else {
      console.error('Geocoding failed for current user:', status);
    }
  });

  // Set the PlacesService for other functionalities
  setPlacesService(new window.google.maps.places.PlacesService(map));
};

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    console.log('Slider Value:', event.target.value);
  };

  

  const onMarkerClick = (location) => {
    if (location && location.position) {
      setCurrentProspect({
        name: location.title || 'No Name',
        bio: location.content || 'No Bio',
        photo: location.photo || '',  
        id: location.id || 'No ID',
      });
  
      setInfoWindow({
        position: location.position,
        title: location.title || 'No Title',
        content: location.content || 'No Content',
        photo: location.photo || '', 
        id: location.id || 'No ID',
      });
    }
  
  

    console.log(location)
    console.log(currentProspect)
    console.log(infoWindow)
  };  

  const onSearch = async (type) => {
    try {
      const response = await fetch(`/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data && data.length > 0) {
        const userLocations = []; 
  
        const geocoder = new window.google.maps.Geocoder();
  
        for (const user of data) {
          if (user.location) {
           
            geocoder.geocode({ address: user.location }, (results, status) => {
              if (status === 'OK' && results.length > 0) {
                const preciseLocation = results[0].geometry.location;
                
                
                userLocations.push({
                  position: {
                    lat: preciseLocation.lat(),
                    lng: preciseLocation.lng(),
                  },
                  title: user.name,
                  content: `Bio: ${user.bio}`,
                  photo: `${user.profile_picture}`,
                  id: user.id
              });
  
                
                setPlacesMarkers([...userLocations]);
              } else {
                console.error('Geocoding failed:', status);
              }
            });
          }
        }
  
        console.log('User locations:', userLocations);
        setUserLocations(userLocations);
      } else {
        console.error('No user locations found.');
      }
    } catch (error) {
      console.error('Error fetching user locations:', error);
    }
  };

  
  
  


  const swipe = async (e) => {
    if (prospects.length > 0) {
      try {
        const response = await fetch('/swipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: currentUser.id,
            receiver: currentProspect.id,
          }), 
        });
        setInfoWindow(null);
        alert("Connection request sent!");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error swiping:', error);
      }
    } else {
      alert('No prospects available.');
    }
  };

  return (
    <div className='meetmap'>
      <h1>My Map</h1>
      <div>
          <label htmlFor="rangeSlider">Select a radius:</label>
          <input
            type="range"
            id="rangeSlider"
            min="1"
            max="10000"
            value={sliderValue}
            step="1"
            onChange={handleSliderChange}
          />
          <p>Selected miles: {sliderValue}</p>
        </div>
      <button onClick={onSearch}>Show Users in radius</button>
      <LoadScript
        googleMapsApiKey="AIzaSyB7JeG6WXNJj3cId2QFAYYCRVx2yI6lnXA"
        libraries={libraries} 
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
                photo={result.photo}
                onClick={() => onMarkerClick(result)}
                
              />
            ))}
            {infoWindow && infoWindow.position && (
              <InfoWindow
              position={infoWindow.position}
              onCloseClick={() => setInfoWindow(null)}
            > 
              <div className='mapUserCard'>
                <img id='mapCardImg' src={infoWindow.photo} />
                <h1 id='cardName'>{infoWindow.title}</h1>
                <p id='cardBio'>{infoWindow.content}</p>
                <div>
                  <button name='yes' className='modalbutton' style={{ color: 'green', fontSize: '2rem' }} onClick={swipe} >MATCH!</button>
                </div>
              </div>
            </InfoWindow>
            )}
          </GoogleMap>
        </div>
        

      </LoadScript>
    </div>
  );
};
export default UserMap;

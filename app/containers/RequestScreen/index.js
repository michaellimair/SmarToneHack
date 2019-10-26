import React, {useState, useEffect, useRef} from 'react';
import MapView from 'react-native-maps';
import {styles} from './styles';
import {PermissionsAndroid} from 'react-native';
import useInterval from '../../utils/useInterval';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Location Permission' + 'so you can use GPS location.',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('GPS permission has been granted.');
      return true;
    } else {
      console.log('GPS location was denied');
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}

const RequestScreen = () => {
  const [locationPermissionGranted, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const mapReferenceContainer = useRef(null);

  async function requestCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        console.log("position is", position.coords);
        setUserLocation(position.coords);
        return position.coords;
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  useInterval(requestCurrentLocation, 5000);

  const _handleUserLocationChange = c => {
    // userLocation = c;
  }

  useEffect(() => {
    async function getInitialLocation() {
      const isLocationGranted = await requestLocationPermission();
      setLocationPermission(isLocationGranted);
      if (isLocationGranted) {
        const obtainedUserLocation = await requestCurrentLocation(); //initial location
      }
    }
    getInitialLocation();
  }, []);

  return (
    <MapView
      provider={'google'}
      style={styles.map}
      ref={mapReferenceContainer}
      initialRegion={{
        latitude: 22.2591201,
        longitude: 114.1320672,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}
      onUserLocationChange={c => _handleUserLocationChange(c)}
      followsUserLocation={true}
      showsUserLocation={true}
    />
  );
};

export default RequestScreen;

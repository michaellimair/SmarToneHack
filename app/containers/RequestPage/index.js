import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, ActivityIndicator, Image, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {styles} from './styles';
import {PermissionsAndroid} from 'react-native';
import useInterval from '../../utils/useInterval';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Feather from 'react-native-vector-icons/FontAwesome5';
import {GOOGLE_MAPS_APIKEY} from '../../utils/constants';
import {sampleSize, cloneDeep} from 'lodash';
import { BackHandler } from 'react-native';

const componentDidMount = () =>{
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
}

const componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
}

const onBackButtonPressed = () =>{
    return true;
}
const { width, height } = Dimensions.get('window');

export const deg2rad = (deg) => deg * (Math.PI/180);

const getDistance = (lat1, lng1, lat2, lng2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat1-lat2);  // deg2rad below
  var dLon = deg2rad(lng1-lng2);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  //console.log("return from getDistance", d);
  return d;
};

const TrafficLightMarker = ({markerWidth, trafficLightPath, coordinate, state, pointNumber}) => {
  // console.log(state);
  return (
    <Marker
      coordinate={coordinate}
      anchor={{x: 0.5, y: 0.5}}
      tracksViewChanges={true}
      style={{ zIndex: 9}}
    >
      <View
        style={[styles.trafficMarker, {backgroundColor: state === 'stop' ? 'red' : 'green'}]}
        key={`markerWidth ${state}`}
      />
    </Marker>
  );
}

const CarMarker = ({markerWidth, journeyPath, degree, pointNumber}) => {
  const carReference = useRef(null);

  useEffect(() => {
    if (carReference) {
      console.log({
        latitude: journeyPath[pointNumber].latitude,
        longitude: journeyPath[pointNumber].longitude,
      });
      carReference.current._component.animateMarkerToCoordinate(
        {
          latitude: journeyPath[pointNumber].latitude,
          longitude: journeyPath[pointNumber].longitude,
        },
        150,
      );
    }
  }, [pointNumber]);

  return (
    <Marker.Animated
      coordinate={journeyPath[0]}
      anchor={{x: 0.5, y: 0.5}}
      ref={carReference}
      tracksViewChanges={true}
      style={{ transform: [{rotate: `${degree}deg`}], zIndex: 99}}
      key={"marker journey"}
    >
      <Image
        style={{height: markerWidth, width: markerWidth, resizeMode: 'contain'}}
        source={require('../../assets/img/ambulance.png')}
        key={`markerWidth ${markerWidth}`}
      />
    </Marker.Animated>
  );
}

const PersonDetail = props => {
  return (
    <View style={styles.detail}>
      <Feather name={'briefcase-medical'} solid size={80} color="red" />
      <View style={styles.caseDetail}>
        <Text>Name: {props.name}</Text>
        <Text>Age: {props.age}</Text>
        <Text>Medical Condition: {props.medicalCondition}</Text>
        <Text>Location: {props.location}</Text>
      </View>
    </View>
  );
};

const calcDegree = (lat1, lng1, lat2, lng2) => {
  return Math.atan2(lng2 - lng1, lat2 - lat1) * 180 / Math.PI;
};

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

const RequestScreen = (props) => {
  const [locationPermissionGranted, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const mapReferenceContainer = useRef(null);
  const [personLocation, setPersonLocation] = useState('Coronet Court');
  const [medicalCondition, setMedicalCondition] = useState('Heart Attack');
  const [personAge, setPersonAge] = useState(21);
  const [personName, setPersonName] = useState('Aakash Goyal');
  const [journeyPath, setJourneyPath] = useState([]);
  const [carOrigin, setCarOrigin] = useState('Hysan Place');
  const [pointNumber, setPointNumber] = useState(0);
  const [trafficLightPath, setTrafficLightPath] = useState([]);

  console.log("Point number is ", pointNumber);

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

  let stopCounting = false;

  let incrementJourney = useInterval(() => {
    if (pointNumber + 2 < journeyPath.length - 1) {
      stopCounting = false;
      setPointNumber(pointNumber + 2);
    } else {
      if (!stopCounting && journeyPath.length) {
        stopCounting = true;
        Alert.alert(
          'Arrived at location',
          'You have arrived at the location.',
          [{text: 'OK', onPress: () => props.navigation.navigate('Home')}],
        );
      }
    }
  }, 500);

  const _onDirectionsReady = result => {
    setJourneyPath(result.coordinates);
    setTrafficLightPath(
      sampleSize(
        result.coordinates.map((point, index) => ({...point, index})),
        result.coordinates.length / 10,
      ),
    );
    mapReferenceContainer.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 20),
        bottom: (height / 20),
        left: (width / 20),
        top: (height / 20),
      }
    })
  };

  const _handleUserLocationChange = c => {
    // userLocation = c;
  };

  const renderTrafficLights = () => {
    let trafficLightPathCopy = trafficLightPath.map(light => {
      let state = 'stop';
      if (
        getDistance(
          light.latitude,
          light.longitude,
          journeyPath[pointNumber].latitude,
          journeyPath[pointNumber].longitude,
        ) < 0.4 && light.index < pointNumber + 5
      ) {
        state = 'go';
      }
      if (light.index < pointNumber) {
        state = 'go';
      }
      return {
        ...light,
        state: state,
      };
    });
    return trafficLightPathCopy.map((point, index) => {
      return (
        <TrafficLightMarker
          trafficLightPath={trafficLightPath}
          coordinate={point}
          pointNumber={pointNumber}
          markerWidth={10}
          key={index}
          state={point.state}
        />
      );
    });
  };

  const markerWidth = 18;

  let degree = 0;

  if (journeyPath.length > 1 && pointNumber > 2) {
    if (pointNumber === journeyPath.length - 1) {
      degree = calcDegree(
        journeyPath[pointNumber].latitude,
        journeyPath[pointNumber].longitude,
        journeyPath[pointNumber - 2].latitude,
        journeyPath[pointNumber - 2].longitude,
      ) + 90;
    } else {
      degree = calcDegree(
        journeyPath[pointNumber].latitude,
        journeyPath[pointNumber].longitude,
        journeyPath[pointNumber - 2].latitude,
        journeyPath[pointNumber - 2].longitude,
      ) + 90;
    }
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
    <>
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
        showsUserLocation={true}>
        <MapViewDirections
          origin={carOrigin}
          destination={personLocation}
          optimizeWaypoints={true}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onStart={c => console.log("start find", c)}
          onReady={_onDirectionsReady}
          region={'hk'}
          precision={'high'}
        />
        {
          !!journeyPath.length && (
            <CarMarker
              journeyPath={journeyPath}
              pointNumber={pointNumber}
              degree={degree}
              markerWidth={30}
            />
          )
        }
        {!!trafficLightPath.length && renderTrafficLights()}
      </MapView>
      <PersonDetail
        name={personName}
        age={personAge}
        medicalCondition={medicalCondition}
        location={personLocation}
      />
      {!journeyPath.length && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#3aa8c1" />
        </View>
      )}
    </>
  );
};

export default RequestScreen;

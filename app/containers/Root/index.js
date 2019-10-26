import React from 'react';
import {Text} from 'react-native';
import MapView from 'react-native-maps';
import {styles} from './styles';

const Root = () => {
  return (
    <MapView
      provider={'google'}
      style={styles.map}
    />
  )
};

export default Root;

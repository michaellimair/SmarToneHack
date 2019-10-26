import React, { useEffect } from 'react';
import {Text,View, Button, Dimensions, Image, TouchableNativeFeedback, Alert, Linking} from 'react-native';
import MapView from 'react-native-maps';
import {styles} from './styles';

const MainPageButton = ({title, backgroundColor, fontSize, onPress}) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={[styles.mainPageBtn, {borderColor: backgroundColor, backgroundColor}]}>
      <Text style={{fontSize: fontSize}}>{title}</Text>
    </View>
  </TouchableNativeFeedback>
);
const MainPage = props => {
  //const height, width = Dimensions.get('windows')
  const user_name = 'Michael Lim';
  const id = '001235915';
  const car = 'Ambulance';

  // Send emergency request
  useEffect(() => {
    const patientName = 'Aakash Goyal';
    const patientAge = 21;
    const location = 'North Point';
    const timer = setTimeout(
      () =>
        Alert.alert(
          'New emergency request!',
          `Patient Name: ${patientName}\nAge: ${patientAge}\nLocation: ${location}`,
          [{text: 'OK', onPress: () => props.navigation.navigate('Request',{ header: null })}],
        ),
      3000,
    );
    return () => clearTimeout(timer);
  }, []);

  return (
  <View style = {{flex:1, backgroundColor: 'black'}}>
    <View style = {{ flexDirection: 'row',textAlign: 'center',justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'}}>
      <Image
        source = {require('../../assets/img/logo.png')}
        style = {{width: 100, height: 100}}
      />
      <View style ={{flexDirection:'column', flex: 1}}>
        <Text style={styles.welcomeText}>Welcome, {user_name}!</Text>
        <Text style={styles.welcomeText}>User ID: {id}</Text>
        <Text style={styles.welcomeText}>Type: {car}</Text>
      </View>
    </View>
    {
      /*
      <View style = {{flex: 1, backgroundColor: 'red'}}>
        <View style = {{flex:1, flexDirection: "row"}}>
          <View style = {{flex: 1, height: 30}}>
            <Image
              source={{uri: 'http://facebook.github.io/react-native/img/tiny_logo.png'}}
              style={{width: 30, height: 30}}
            />

          </View>
        </View>
      </View>
      */

    /*<MainPageButton
      title="Emergency Request"
      backgroundColor="#ff0000"
      fontSize={40}
      onPress={() => props.navigation.navigate('Request')}
    />*/
    }
    <View style = {{flex:1, flexDirection:'row'}}>

      <View style = {{flex:1}}>

      </View>
      <View style = {{flex:3,flexDirection: 'column'}}>
          <MainPageButton  title="Details" backgroundColor="#00AA00" />
        {/*<Separator />*/}
          <MainPageButton title="Past Records" backgroundColor="orange" />
          <MainPageButton title="Exit/Logout" backgroundColor="#CF0000" onPress={() => props.navigation.navigate('Login')}/>
      </View>
        <View style = {{flex:1,flexDirection: 'row', width: 100}}>
      </View>
    </View>
    <View style = {{flex:0.2  , flexDirection:'row',justifyContent: 'space-between'}}>
        <MainPageButton backgroundColor = 'white' title="Help" />
        <MainPageButton backgroundColor = 'white' title="Contact Us" onPress={() => Linking.openURL('mailto:support@esc.com.hk')} />
    </View>
  </View>
  );
};


export default MainPage;

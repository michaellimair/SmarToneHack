import React from 'react';
import {Text,View, Button, Dimensions, Image} from 'react-native';
import MapView from 'react-native-maps';
import {styles} from './styles';

function Separator() {
  return <View style={styles.separator} />;
}
const mainpage = () => {
  //const height, width = Dimensions.get('windows')
  const user_name = "Micheal Lim";

  return(

  <View style = {{flex:2}}>
  //Header
    <View style = {{flex:1, flexDirection: "row"}}>
      <View style = {{flex: 1}}>
        <Image
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
      </View>
      <View style = {{flex: 2}}>
        <Text> Welcome {user_name}</Text>
      </View>
    </View>
  </View>

  <View style = {{flex : 5}}>
    <Button
        style = {{flex : 1}}
        title="Details"
        onPress={() => Alert.alert('Simple Button pressed')}
    />
    <Button style = {{flex : 1}}
        title="Emergency Request"
        onPress={() => Alert.alert('Simple Button pressed')}
    />
    <Button style = {{flex : 1}}
        title="Past Records"
        onPress={() => Alert.alert('Simple Button pressed')}
    />
    <Button style = {{flex : 1}}
        title="Exit/Logout"
        onPress={() => Alert.alert('Simple Button pressed')}
    />
  </View>
  <View style = {{flex : 2, flexDiection: "row"}}>
    <Button style = {{position:left}}
      title = "HELP"
    \>
  </View>
);
}

const

export default mainpage;

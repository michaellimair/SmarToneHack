import React from 'react';
import {Text,View, Button, Dimensions, Image, TouchableNativeFeedback, Alert} from 'react-native';
import MapView from 'react-native-maps';

function Separator() {
  return <View style={styles.separator} />;
}
const MainPageButton = ({title,backgroundColor,fontSize}) => (

  <TouchableNativeFeedback
    onPress={() => Alert.alert('Simple Button pressed')}
  >
  <View style={{margin: 5, flex: 1, justifyContent: 'center', alignItems: 'center', borderColor:backgroundColor, borderWidth:1, borderRadius: 5,backgroundColor: backgroundColor}}>
  <Text style ={{fontSize: fontSize}}>{title}</Text>

  </View>

  </TouchableNativeFeedback>
)


const MainPage = () => {
  //const height, width = Dimensions.get('windows')
  const user_name = "Michael Lim";
  const id = "001235915"
  return(
  <View style = {{flex:1, backgroundColor: 'lightblue'}}>
    <View style = {{ flexDirection: 'row',textAlign: 'center',justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'}}>
      <Image
        source = {require('../../assets/img/logo.png')}
        style = {{width: 100, height: 100}}
      />
      <View style ={{flexDirection:'column', flex: 1}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>Welcome, {user_name}!</Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>USER ID: {id}</Text>
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
    }
    <MainPageButton
      title="Emergency Request"
      backgroundColor = "#ff0000"
      fontSize = {40}
    />
    <View style = {{flex:1, flexDirection:'row'}}>

      <View style = {{flex:1}}>

      </View>
      <View style = {{flex:3,flexDirection: 'column'}}>

        <MainPageButton
          title="Details"
          backgroundColor = "lightgreen"
        />
        {/*<Separator />*/}
        <MainPageButton
          title="Past Records"
          backgroundColor = "grey"
        />
        <MainPageButton
          title="Exit/Logout"
          backgroundColor = "orange"
        />
      </View>
        <View style = {{flex:1,flexDirection: 'row', width: 100}}>
      </View>
    </View>
    <View style = {{flex:0.2  , flexDirection:'row',justifyContent: 'space-between'}}>
      <MainPageButton
        title = "Help"
      />
      <MainPageButton
        title = "Contact Us"
      />
    </View>
  </View>
  );
};


export default MainPage;
